/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        'charcoal': '#1a1a1a',
        'navy-dark': '#0a192f',
      }
    },
  },
  plugins: [],
}
