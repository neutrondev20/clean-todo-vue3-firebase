/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff2353",
        offwhite: "#f5f5f5",
        gray: colors.gray,
        red: colors.red,
        blue: colors.blue,
        yellow: colors.yellow,
        green: colors.green,
        pink: colors.pink,
        purple: colors.purple,
        teal: colors.teal,
        cyan: colors.cyan,
        white: colors.white,
        black: colors.black,
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
