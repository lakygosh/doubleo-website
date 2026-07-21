import type { ReactNode } from "react";

// Applies to /admin/login too, so it must NOT redirect unauthenticated visitors —
// the actual auth guard lives in app/admin/(protected)/layout.tsx.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div style={{ fontFamily: "system-ui, sans-serif" }}>{children}</div>;
}
