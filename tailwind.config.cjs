const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  extend: {
    fontFamily: {
      sans: ["Karla", ...defaultTheme.fontFamily.sans],
    },
  },
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F8E9ED",
          100: "#F1D4DB",
          200: "#DD93A4",
          300: "#C9516D",
          400: "#AF3854",
          500: "#BB2649 ",
          600: "#961E3A",
          700: "#5E1325",
          800: "#25080F",
          900: "#130407",
        },
        ui: {
          50: "#E9F8F5",
          100: "#D4F1EA",
          200: "#93DDCC",
          300: "#51C9AD",
          400: "#38AF93",
          500: "#26BB98",
          600: "#1E967A",
          700: "#135E4C",
          800: "#08251E",
          900: "#04130F",
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
