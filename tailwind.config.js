/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#16213E', 800: '#1A2744', 700: '#0F3460' },
        accent: '#4A90D9',
        hot: '#D4537E',
      },
      fontFamily: {
        sans: ['"Pretendard"', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
