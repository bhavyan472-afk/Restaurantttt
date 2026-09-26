"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon } from "@/components/Chatbot/ChatIcons";
import { Field, errorId } from "@/components/Reservation/Field";
import formStyles from "@/components/Reservation/reservation.module.css";
import { Button } from "@/components/ui/Button";
import { restaurantData } from "@/data/restaurant";
import { emptyLogin, validateLogin, type LoginValues } from "@/lib/login";
import { signIn } from "@/lib/loginService";
import { CheckIcon, EyeIcon, EyeOffIcon, UserIcon } from "./LoginIcons";
import styles from "./login.module.css";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

type FieldName = keyof LoginValues;

const FIELD_ORDER: FieldName[] = ["email", "password"];

const ids: Record<FieldName, string> = {
  email: "login-email",
  password: "login-password",
};

const TITLE_ID = "login-title";

type Status =
  | { kind: "editing" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "failed"; message: string };

/**
 * Guest login, in a native <dialog> opened with showModal() — the same
 * pattern as the voice assistant: the browser traps focus, makes the page
 * inert, renders it in the top layer and turns Escape into `cancel`.
 *
 * A FRONT-END DEMO (see lib/loginService.ts). Errors follow the reservation
 * and contact forms: derived, shown once a field is left or submit is tried.
 */
export function LoginModal({ open, onClose }: LoginModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<LoginValues>(emptyLogin);
  const [touched, setTouched] = useState<Set<FieldName>>(new Set());
  const [attempted, setAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "editing" });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.getElementById(ids.email)?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
      // Start fresh next time; the password never lingers in state.
      setValues(emptyLogin);
      setTouched(new Set());
      setAttempted(false);
      setShowPassword(false);
      setStatus({ kind: "editing" });
    }
  }, [open]);

  const allErrors = useMemo(() => validateLogin(values), [values]);
  const shown = (field: FieldName) =>
    attempted || touched.has(field) ? allErrors[field] : undefined;

  const set = (field: FieldName, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));
  const touch = (field: FieldName) =>
    setTouched((current) => (current.has(field) ? current : new Set(current).add(field)));

  const busy = status.kind === "sending";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    const errors = validateLogin(values);
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    setAttempted(true);
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await signIn({ ...values, email: values.email.trim() });
      setStatus({ kind: "done" });
    } catch (error) {
      setStatus({
        kind: "failed",
        message:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  }

  const control = (field: FieldName) => ({
    id: ids[field],
    name: field,
    value: values[field],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => set(field, event.target.value),
    onBlur: () => touch(field),
    "aria-invalid": Boolean(shown(field)),
    "aria-describedby": shown(field) ? errorId(ids[field]) : undefined,
    className: formStyles.input,
    disabled: busy,
  });

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={TITLE_ID}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.headerMark} aria-hidden="true">
            <UserIcon size={18} />
          </span>
          <h2 id={TITLE_ID} className={styles.title}>
            {status.kind === "done" ? "Welcome back" : "Guest Login"}
            <span className={styles.subtitle}>{restaurantData.name}</span>
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close login"
            onClick={onClose}
          >
            <CloseIcon size={18} />
          </button>
        </header>

        {status.kind === "done" ? (
          <div className={styles.body} role="status">
            <span className={styles.successMark} aria-hidden="true">
              <CheckIcon size={26} />
            </span>
            <p className={styles.successText}>
              You&rsquo;re signed in as <strong>{values.email.trim()}</strong>.
            </p>
            <Button className={styles.submit} onClick={onClose} data-autofocus>
              Continue
            </Button>
            <p className={styles.demoNote}>
              Demo only — accounts aren&rsquo;t connected yet, so no session was created.
            </p>
          </div>
        ) : (
          <form className={styles.body} onSubmit={handleSubmit} noValidate>
            <p className={styles.intro}>
              Sign in to manage your reservations and saved preferences.
            </p>

            <Field id={ids.email} label="Email" error={shown("email")}>
              <input
                {...control("email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
              />
            </Field>

            <Field id={ids.password} label="Password" error={shown("password")}>
              <div className={styles.passwordWrap}>
                <input
                  {...control("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  className={styles.reveal}
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  aria-controls={ids.password}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </Field>

            {status.kind === "failed" && (
              <p className={formStyles.error} role="alert">
                {status.message}
              </p>
            )}

            <Button type="submit" className={styles.submit} disabled={busy} aria-busy={busy}>
              {busy ? "Signing In…" : "Log In"}
            </Button>

            <p className={styles.demoNote}>
              Demo only — nothing you enter is stored or sent.
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
