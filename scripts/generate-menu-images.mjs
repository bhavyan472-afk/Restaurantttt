#!/usr/bin/env node
/**
 * Generates a photograph for every dish in data/menu.ts with a Gemini image
 * model and saves it to public/images/menu/<id>.webp.
 *
 * Server-side / build-time only. The API key is read from the environment
 * (GEMINI_API_KEY, falling back to GOOGLE_API_KEY) or from .env.local, is sent
 * only in a request header to Google, and is never printed or written to disk.
 * Nothing under app/ or components/ imports this file, so it never reaches the
 * browser bundle. Do NOT give the key a NEXT_PUBLIC_ prefix.
 *
 *   npm run images:menu                      every dish without an image yet
 *   npm run images:menu -- --only truffle-burrata,smoked-negroni
 *   npm run images:menu -- --force           regenerate existing files too
 *   npm run images:menu -- --dry-run         print prompts, call nothing
 *   npm run images:menu -- --list-models     image models on this API key
 *   npm run images:menu -- --model <name>    or set GEMINI_IMAGE_MODEL
 *
 * With no model named, the script asks the API which models this key can use
 * and picks the best Gemini image model from that list.
 */

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "menu");
const API = "https://generativelanguage.googleapis.com/v1beta";

/** Preferred models, best first. Anything else with "image" in its name is a fallback. */
const MODEL_PREFERENCE = [
  "gemini-3-pro-image",
  "gemini-3-flash-image",
  "gemini-2.5-flash-image",
  "gemini-2.0-flash-preview-image-generation",
];

/* --- args & env --------------------------------------------------------- */

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
};

for (const file of [".env.local", ".env"]) {
  const envPath = path.join(ROOT, file);
  if (existsSync(envPath)) process.loadEnvFile(envPath);
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const dryRun = flag("dry-run");

if (!apiKey && !dryRun) {
  console.error(
    "No API key found. Add GEMINI_API_KEY=... to .env.local (git-ignored) or export it in your shell.",
  );
  process.exit(1);
}

/* --- API ---------------------------------------------------------------- */

async function api(pathname, init = {}) {
  const res = await fetch(`${API}/${pathname}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // Header, not ?key= — keeps the key out of URLs, proxies and error text.
      "x-goog-api-key": apiKey,
      ...init.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body?.error?.message || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return body;
}

async function listImageModels() {
  const models = [];
  let pageToken;
  do {
    const query = new URLSearchParams({ pageSize: "1000" });
    if (pageToken) query.set("pageToken", pageToken);
    const page = await api(`models?${query}`);
    models.push(...(page.models ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);

  // Gemini image models generate through generateContent; Imagen uses :predict
  // with a different request shape, so it is not picked automatically.
  return models
    .filter(
      (m) =>
        /image/i.test(m.name) &&
        !/imagen/i.test(m.name) &&
        m.supportedGenerationMethods?.includes("generateContent"),
    )
    .map((m) => m.name.replace(/^models\//, ""));
}

function pickModel(available) {
  for (const preferred of MODEL_PREFERENCE) {
    // Stable release first, then any dated or -preview variant of it.
    const exact = available.find((m) => m === preferred);
    if (exact) return exact;
    const variant = available.find((m) => m.startsWith(preferred));
    if (variant) return variant;
  }
  return available[0];
}

async function generateImage(model, prompt) {
  const body = await api(`models/${model}:generateContent`, {
    method: "POST",
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: "4:3" },
      },
    }),
  });

  const blocked = body.promptFeedback?.blockReason;
  if (blocked) throw new Error(`prompt blocked (${blocked})`);

  const parts = body.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find((p) => p.inlineData?.data);
  if (!image) {
    const reason = body.candidates?.[0]?.finishReason ?? "no image returned";
    throw new Error(`no image in response (${reason})`);
  }
  return {
    buffer: Buffer.from(image.inlineData.data, "base64"),
    mimeType: image.inlineData.mimeType,
  };
}

async function withRetry(fn, label, attempts = 4) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      // "limit: 0" is a plan with no quota for this model (e.g. free tier on
      // image models) — waiting will not help, so fail straight away.
      const noQuota = /limit: 0\b/.test(err.message);
      const retryable = (err.status === 429 && !noQuota) || err.status >= 500;
      if (!retryable || attempt >= attempts) throw err;
      const wait = 2 ** attempt * 5_000;
      console.warn(`  ${label}: ${err.message} — retrying in ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

/* --- prompt & output ---------------------------------------------------- */

// Art direction from public/images/menu/README.md: the cards crop to 4:3 on a
// near-black background with a warm wash, so bright studio shots fight it.
function buildPrompt(item, categoryLabel) {
  return [
    `Professional editorial food photograph of "${item.name}", from the ${categoryLabel} menu of an upscale wood-fire restaurant.`,
    `The dish: ${item.description}`,
    `Scene: ${item.alt}`,
    "Style: dark, moody environment; warm directional light from one side; shallow depth of field; rich natural texture; dark stone or charred wood surface.",
    "Composition: 4:3 landscape, the plate or glass centred with generous room at every edge so it survives cropping; three-quarter overhead angle.",
    "Photorealistic. No text, no logos, no watermarks, no people or hands, no cutlery clutter.",
  ].join("\n");
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    return null;
  }
}

async function save(sharp, id, { buffer, mimeType }) {
  if (sharp) {
    const file = path.join(OUT_DIR, `${id}.webp`);
    await sharp(buffer)
      .resize(1600, 1200, { fit: "cover" })
      .webp({ quality: 75 })
      .toFile(file);
    return file;
  }
  const ext = mimeType === "image/jpeg" ? "jpg" : (mimeType?.split("/")[1] ?? "png");
  const file = path.join(OUT_DIR, `${id}.${ext}`);
  await writeFile(file, buffer);
  return file;
}

/* --- main --------------------------------------------------------------- */

async function main() {
  if (flag("list-models")) {
    const models = await listImageModels();
    console.log(models.length ? models.join("\n") : "No Gemini image models on this key.");
    return;
  }

  // Node strips the types from data/menu.ts natively (Node 22.18+ / 23.6+).
  const { menuItems, menuCategories } = await import(
    pathToFileURL(path.join(ROOT, "data", "menu.ts")).href
  );
  const categoryLabel = Object.fromEntries(menuCategories.map((c) => [c.id, c.label]));

  const only = option("only")?.split(",").map((s) => s.trim());
  if (only) {
    const unknown = only.filter((id) => !menuItems.some((item) => item.id === id));
    if (unknown.length) throw new Error(`Unknown dish id(s): ${unknown.join(", ")}`);
  }

  const force = flag("force");
  const targets = menuItems
    .filter((item) => !only || only.includes(item.id))
    .filter((item) => force || !existsSync(path.join(OUT_DIR, `${item.id}.webp`)));

  if (!targets.length) {
    console.log("Every dish already has an image. Use --force to regenerate.");
    return;
  }

  if (dryRun) {
    for (const item of targets) {
      console.log(`--- ${item.id}\n${buildPrompt(item, categoryLabel[item.category])}\n`);
    }
    console.log(`${targets.length} prompt(s). Dry run — nothing was sent.`);
    return;
  }

  let model = option("model") || process.env.GEMINI_IMAGE_MODEL;
  if (!model) {
    const available = await listImageModels();
    model = pickModel(available);
    if (!model) {
      throw new Error(
        "This API key has no Gemini image-generation model. Run with --list-models, or set GEMINI_IMAGE_MODEL.",
      );
    }
  }

  const sharp = await loadSharp();
  if (!sharp) console.warn("sharp not found — saving the model's original format instead of .webp.");

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Model: ${model}\nGenerating ${targets.length} image(s) into ${path.relative(ROOT, OUT_DIR)}\n`);

  const failed = [];
  for (const [i, item] of targets.entries()) {
    const label = `[${i + 1}/${targets.length}] ${item.id}`;
    try {
      const prompt = buildPrompt(item, categoryLabel[item.category]);
      const image = await withRetry(() => generateImage(model, prompt), label);
      const file = await save(sharp, item.id, image);
      console.log(`${label} → ${path.relative(ROOT, file)}`);
    } catch (err) {
      failed.push(item.id);
      console.error(`${label} failed: ${err.message}`);
    }
  }

  console.log(`\nDone: ${targets.length - failed.length} saved, ${failed.length} failed.`);
  if (failed.length) {
    console.log(`Retry with: npm run images:menu -- --only ${failed.join(",")}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
