/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafaf8",
        foreground: "#1a1a1a",
        primary: {
          DEFAULT: "#1a1a1a",
          foreground: "#fafaf8",
        },
        accent: {
          DEFAULT: "#b8965a",
          light: "#d4b07a",
          dark: "#9a7a42",
        },
        muted: {
          DEFAULT: "#f5f4f0",
          foreground: "#71706b",
        },
        border: "#e8e6e1",
        warm: {
          50: "#fafaf8",
          100: "#f5f4f0",
          200: "#e8e6e1",
          300: "#d4d1ca",
          400: "#a8a49c",
          500: "#71706b",
          600: "#545350",
          700: "#3a3937",
          800: "#262524",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'DM Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
