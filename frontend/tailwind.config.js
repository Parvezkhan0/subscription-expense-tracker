/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./subtrack-frontend/index.html",
    "./subtrack-frontend/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        accent: "#4f46e5",
        background: "#f9fafb",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} 