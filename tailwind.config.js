/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "3xl": "  6px 6px 42px #8d8d8d,-6px -6px 42px #ffffff",
      },
    },
  },
  plugins: [],
};
