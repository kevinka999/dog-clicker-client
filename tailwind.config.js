/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          200: "#ad690866",
          400: "#ad6908b3",
          800: "#ad6908",
        },
      },
    },
  },
  plugins: [],
};
