import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageFrameProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Reserves space up front: no layout shift. */
  ratio?: string;
  /**
   * Responsive `sizes` hint. Required in practice — it decides which
   * generated width the browser downloads.
   * e.g. "(min-width: 1024px) 50vw, 100vw"
   */
  sizes: string;
  /** Set true only for the single above-the-fold (LCP) image. */
  priority?: boolean;
  /** Slow zoom on hover. */
  zoom?: boolean;
  className?: string;
};

/**
 * Standard image treatment: fixed aspect ratio, soft corners, warm tonal
 * overlay, lazy-loaded by default and served responsively via next/image.
 */
export function ImageFrame({
  src,
  alt,
  ratio = "4 / 5",
  sizes,
  priority = false,
  zoom = true,
  className,
}: ImageFrameProps) {
  return (
    <div
      className={cn("frame", zoom && "frame--zoom", className)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Default is lazy; next/image switches to eager when `priority` is set.
      />
    </div>
  );
}
