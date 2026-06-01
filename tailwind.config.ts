import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0c0814",
          deep: "#08050f",
          card: "#160f24",
          raised: "#1f1633",
          line: "#2c2342",
          linebright: "#3a2f55",
        },
        bone: {
          DEFAULT: "#f3eef7",
          dim: "#a99fc0",
          faint: "#6f6688",
        },
        neon: {
          DEFAULT: "#4dffc3",
          cyan: "#3ad4ff",
          deep: "#0fae8a",
        },
        amber: {
          DEFAULT: "#ff9d3c",
          bright: "#ffb35e",
          deep: "#e07a17",
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
