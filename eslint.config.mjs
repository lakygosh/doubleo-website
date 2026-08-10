import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

/**
 * `next/core-web-vitals` only — the rules that catch things the build won't.
 * Type errors are already `tsc --noEmit`'s job (strict, plus noUnusedLocals
 * and noUnusedParameters), so there is no typescript-eslint layer here.
 */
const config = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
