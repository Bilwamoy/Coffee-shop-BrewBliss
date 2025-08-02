import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm earth tones inspired by Roastery Coffee
        primary: {
          light: "#d4a373", // Light tan
          DEFAULT: "#a68a64", // Medium brown/tan
          dark: "#6f4e37", // Deep brown
        },
        secondary: {
          light: "#fefae0", // Cream
          DEFAULT: "#faedcd", // Light cream
          dark: "#d4a017", // Gold accent
        },
        accent: {
          DEFAULT: "#ffd700", // Gold
          light: "#fffacd", // Light gold
          dark: "#b8860b", // Dark gold
        },
        background: {
          DEFAULT: "#fefae0", // Cream background
          dark: "#0a0a0a", // Dark mode background
        },
        foreground: {
          DEFAULT: "#6f4e37", // Deep brown text
          dark: "#ededed", // Dark mode text
        },
      },
      fontFamily: {
        // Modern serif for headings, clean sans-serif for body
        heading: ['"Playfair Display"', "serif"],
        body: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
