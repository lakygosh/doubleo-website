/**
 * The decorative fluid glass shapes from public/Shapes.
 *
 * A floating, purely decorative accent — the designer's own artwork, which
 * replaced the CSS-built glass cubes. Each file has its own aspect ratio, so
 * `size` sets the width and the height follows.
 *
 * Hidden from assistive tech and from small screens, where they only crowd
 * the layout (see `.shape` in motion.css).
 */

/* Exported at 4x, and the filenames aren't uniform — hence a map rather than
   building the path from `name`. */
const FILES = {
  1: "Shape1_1@4x.png",
  2: "Shape2@4x.png",
  3: "Shape3@4x.png",
  4: "Shape4@4x.png",
} as const;

type ShapeProps = {
  /** Which artwork — Shape1…Shape4. */
  name: keyof typeof FILES;
  /** Rendered width in px at the largest breakpoint. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Shape({ name, size = 160, className, style }: ShapeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative art; next/image adds a request and buys nothing here
    <img
      src={`/Shapes/${FILES[name]}`}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      fetchPriority="low"
      className={["shape", className].filter(Boolean).join(" ")}
      style={{ "--shape-size": `${size}px`, ...style } as React.CSSProperties}
    />
  );
}
