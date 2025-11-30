/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#020817",
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#f9fafb",
        },
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#6b7280",
        },
        border: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
