import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Colours are driven by CSS variables (channel triplets) so the look
      // switcher can re-theme at runtime by toggling [data-look] on <html>
      // without a Tailwind rebuild. Values live in globals.css.
      colors: {
        base: {
          DEFAULT: "rgb(var(--c-base) / <alpha-value>)",
          deep: "rgb(var(--c-base-deep) / <alpha-value>)",
          card: "rgb(var(--c-base-card) / <alpha-value>)",
          raised: "rgb(var(--c-base-raised) / <alpha-value>)",
          line: "rgb(var(--c-base-line) / <alpha-value>)",
          linebright: "rgb(var(--c-base-linebright) / <alpha-value>)",
        },
        bone: {
          DEFAULT: "rgb(var(--c-bone) / <alpha-value>)",
          dim: "rgb(var(--c-bone-dim) / <alpha-value>)",
          faint: "rgb(var(--c-bone-faint) / <alpha-value>)",
        },
        neon: {
          DEFAULT: "rgb(var(--c-neon) / <alpha-value>)",
          cyan: "rgb(var(--c-neon-cyan) / <alpha-value>)",
          deep: "rgb(var(--c-neon-deep) / <alpha-value>)",
        },
        amber: {
          DEFAULT: "rgb(var(--c-amber) / <alpha-value>)",
          bright: "rgb(var(--c-amber-bright) / <alpha-value>)",
          deep: "rgb(var(--c-amber-deep) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "neon-fade":
          "linear-gradient(135deg, rgba(77,255,195,0.12), rgba(58,212,255,0.06) 40%, transparent 70%)",
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-5%,5%)" },
          "40%": { transform: "translate(3%,-8%)" },
          "60%": { transform: "translate(-8%,3%)" },
          "80%": { transform: "translate(6%,6%)" },
        },
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.55" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        grain: "grain-shift 8s steps(10) infinite",
        flicker: "flicker 7s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
