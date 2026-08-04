import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
};

function cls({ variant = "primary", size = "md", className }: Omit<Common, "children">) {
  return ["btn", `btn--${variant}`, size === "lg" ? "btn--lg" : "", className]
    .filter(Boolean)
    .join(" ");
}

/** Internal link — always goes through next-intl's locale-aware Link. */
export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  icon,
}: Common & { href: string }) {
  return (
    <Link href={href} className={cls({ variant, size, className })}>
      {children}
      {icon}
    </Link>
  );
}

/** External / absolute URL — Cal.com, socials, mailto. */
export function ButtonAnchor({
  href,
  children,
  variant,
  size,
  className,
  icon,
  newTab = true,
}: Common & { href: string; newTab?: boolean }) {
  return (
    <a
      href={href}
      className={cls({ variant, size, className })}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon}
    </a>
  );
}

export function ArrowIcon() {
  return (
    <svg
      className="btn__arrow"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
