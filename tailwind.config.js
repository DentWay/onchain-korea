/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#0C0D11',
          1: '#14151A',
          2: '#1C1D23',
          3: '#24252B',
        },
        accent: '#3B82F6',
        'accent-soft': '#60A5FA',
        success: '#4ADE80',
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', '"Pretendard"', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
