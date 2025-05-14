// tailwind.config.js 파일 수정
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // 시니어 친화적 큰 글씨 크기
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      colors: {
        // 시니어 친화적 색상 (고대비)
        'primary': '#0066CC',
        'secondary': '#FF6600',
        'accent': '#009966',
        'light': '#F7F9FA',
        'dark': '#333333',
        'gray': '#757575',
        'light-gray': '#EEEEEE',
        'success': '#00CC66',
        'error': '#FF3333',
        'warning': '#FFCC00',
      },
      spacing: {
        // 시니어 친화적 여백 (더 넓은 영역)
        '7': '1.75rem',
        '9': '2.25rem',
        '11': '2.75rem',
        '13': '3.25rem',
        '15': '3.75rem',
      }
    },
  },
  plugins: [],
}