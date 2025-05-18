/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'jet-black': '#140005',
        'ebony': '#464033',
        'gray': '#7e7c73',
        'pewter': '#bbc4c2',
      },
    },
  },
  plugins: [],
}

