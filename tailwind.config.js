const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{hbs,html,js}"],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    colors: {
      primary: {
        DEFAULT: "var(--c-primary-500)",
        100: "var(--c-primary-100)",
        200: "var(--c-primary-200)",
        300: "var(--c-primary-300)",
        400: "var(--c-primary-400)",
        500: "var(--c-primary-500)",
        600: "var(--c-primary-600)",
        700: "var(--c-primary-700)",
        800: "var(--c-primary-800)",
        900: "var(--c-primary-900)",
      },
      secondary: {
        DEFAULT: "var(--c-secondary-500)",
        100: "var(--c-secondary-100)",
        200: "var(--c-secondary-200)",
        300: "var(--c-secondary-300)",
        400: "var(--c-secondary-400)",
        500: "var(--c-secondary-500)",
        600: "var(--c-secondary-600)",
        700: "var(--c-secondary-700)",
        800: "var(--c-secondary-800)",
        900: "var(--c-secondary-900)",
      },
      grey: {
        DEFAULT: "var(--c-grey-500)",
        100: "var(--c-grey-100)",
        200: "var(--c-grey-200)",
        300: "var(--c-grey-300)",
        400: "var(--c-grey-400)",
        500: "var(--c-grey-500)",
        600: "var(--c-grey-600)",
        700: "var(--c-grey-700)",
        800: "var(--c-grey-800)",
        900: "var(--c-grey-900)",
      }
    },
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors()
  ],
}
