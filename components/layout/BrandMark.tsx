/**
 * The Double O mark: two rings ("OO") in a rounded aurora tile, matching the
 * logo lockup on the reference (gradient tile + wordmark). The `plain`
 * variant drops the tile for places that need the rings on their own.
 */
export function BrandMark({ size = 34, plain = false }: { size?: number; plain?: boolean }) {
  if (plain) {
    return (
      <svg
        className="brand__mark"
        viewBox="0 0 44 24"
        width={(size / 24) * 44}
        height={size}
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="30" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }

  return (
    <span className="brand__tile" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 44 24" width={size * 0.66} height={size * 0.36} focusable="false">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="#fff" strokeWidth="3" />
        <circle cx="30" cy="12" r="8.5" fill="none" stroke="#fff" strokeWidth="3" />
      </svg>
    </span>
  );
}

export function Wordmark({ size = 34 }: { size?: number }) {
  return (
    <span className="brand">
      <BrandMark size={size} />
      <span className="brand__text">Double O</span>
    </span>
  );
}
