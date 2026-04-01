import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#a89586",
          warm: "#c8a882",
          light: "#d4c4b0",
        },
        navy: {
          DEFAULT: "#0f1929",
          deep: "#080e1a",
          mid: "#132240",
        },
      },
      fontFamily: {
        display: ["Pretendard", "system-ui", "sans-serif"],
        body: ["Pretendard", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
