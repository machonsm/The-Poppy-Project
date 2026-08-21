import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "var(--bone)",
        linen: "var(--linen)",
        pitch: "var(--pitch)",
        poppy: "var(--poppy)",
        forest: "var(--forest)",
        ochre: "var(--ochre)"
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"]
      }
    }
  },
  plugins: []
};

export default config;
