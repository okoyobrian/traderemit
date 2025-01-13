import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AA8B3C",
        "primary-light": "#BBA263",
        "primary-bg": "#EDE7D9",
        "primary-text": "#1f1f1f",
        "semiprimary-text": "#626262",
        "secondary-text": "#848484",
      },
      fontFamily: {
        sans: "var(--font-inter)",
      }
    },
  },
  plugins: [],
} satisfies Config;
