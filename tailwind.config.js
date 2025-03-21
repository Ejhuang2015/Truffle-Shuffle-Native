/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#520c0c',
        primaryDark: '#280202',
        primaryLight: '#700404',
        secondary: '#f0c760',
        secondaryDark: '#e4b130',
        light: {
          100: '#d6c6ff',
          200: '#a8b5db',
          300: '#9ca4ab',
        },
        dark: {
          100: '#221f3d',
          200: '#0f0d23',
        }
      }
    },
  },
  plugins: [],
}