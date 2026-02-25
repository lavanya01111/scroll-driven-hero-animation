import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#00f5a0",
          dark: "#00c37a",
        },
      },
      boxShadow: {
        "soft-glow": "0 0 60px rgba(0, 245, 160, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;