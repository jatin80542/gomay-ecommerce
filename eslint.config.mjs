import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "next-env.d.ts"],
  },
  {
    rules: {
      // Fonts are loaded with <link> in app/layout.tsx rather than next/font so the
      // project builds in environments without network access to Google Fonts.
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default config;
