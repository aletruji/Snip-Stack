module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // wichtig!
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar'),],
}
