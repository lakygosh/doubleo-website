import Image from "next/image";

/**
 * The Double O mark — the interlocking rings from public/logos, cropped tight
 * (see scripts/make-icons.mjs). Its natural ratio is ~1.6:1, so `size` is the
 * height and the width follows.
 */
const RATIO = 738 / 457;

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <Image
      className="brand__mark"
      src="/logo-mark.png"
      alt=""
      width={Math.round(size * RATIO)}
      height={size}
      priority
    />
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
