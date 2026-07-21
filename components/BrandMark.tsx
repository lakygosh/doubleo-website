export function BrandMark({ size = 44 }: { size?: number }) {
  const height = Math.round((size / 44) * 24);
  return (
    <svg className="brand__mark" viewBox="0 0 44 24" width={size} height={height} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="30" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle className="brand__pulse" cx="30" cy="12" r="3.4" />
    </svg>
  );
}
