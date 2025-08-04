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
        // Premium Coffee-inspired color palette
        coffee: {
          dark: "#1a0f0a",
          medium: "#2d1810", 
          warm: "#4a2c2a",
          light: "#6f4e37",
        },
        cream: {
          DEFAULT: "#f5f5dc",
          light: "#fefae0",
          dark: "#faedcd",
        },
        beige: {
          warm: "#deb887",
          light: "#f5deb3",
        },
        // Existing colors for backward compatibility
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
          DEFAULT: "#1a0f0a", // Coffee dark background
          dark: "#0a0a0a", // Dark mode background
        },
        foreground: {
          DEFAULT: "#f5f5dc", // Cream text
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
