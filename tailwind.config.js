/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'box': '0 0 5px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}

