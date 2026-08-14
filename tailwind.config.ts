import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1.25rem" },
    extend: {
      colors: {
        // Earthy Indian palette — see design-tokens in README
        mitti: {
          50: "#F6F1E9",
          100: "#EADFCD",
          200: "#D8C7AC",
          300: "#BFA382",
          400: "#9A7A57",
          500: "#78593C",
          600: "#5C412B",
          700: "#452F1F",
          800: "#301F14",
          900: "#20140C",
        },
        gerua: {
          50: "#FBF0EA",
          100: "#F4DACB",
          200: "#E8B69B",
          300: "#DA8F6B",
          400: "#C86C44",
          500: "#B4552D",
          600: "#994325",
          700: "#78341C",
          800: "#552516",
          900: "#3A1A10",
        },
        forest: {
          50: "#EEF3EF",
          100: "#D5E1D8",
          200: "#A9C0AF",
          300: "#7A9C84",
          400: "#547A61",
          500: "#3B5F47",
          600: "#2F4A3A",
          700: "#24382C",
          800: "#1A281F",
          900: "#111A15",
        },
        saffron: { 100: "#F6E5C4", 300: "#E0BB72", 500: "#C98A2E", 700: "#9A6417" },
        sand: { 50: "#FDFBF7", 100: "#F7F1E6", 200: "#EFE6D5", 300: "#E4D7C0", 400: "#D3C1A4" },
        brass: { 400: "#C6A467", 500: "#A98442", 600: "#8A6A31" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        deva: ["var(--font-deva)", "var(--font-body)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: { xs: "4px", sm: "6px", DEFAULT: "8px", md: "10px", lg: "14px", xl: "16px" },
      boxShadow: {
        card: "0 1px 2px rgba(48,31,20,0.04), 0 8px 24px -18px rgba(48,31,20,0.35)",
        lift: "0 2px 6px rgba(48,31,20,0.06), 0 18px 40px -24px rgba(48,31,20,0.45)",
      },
      maxWidth: { shell: "1280px", prose: "68ch" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "none" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up": "fade-up .5s cubic-bezier(.22,.61,.36,1) both",
        "fade-in": "fade-in .35s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
