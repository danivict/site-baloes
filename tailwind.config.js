/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');


export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'xs': '420px',
      'xxl': '1400px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

