import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'gray': '#737376',
          'dark': '#171719',
          'bg': '#EDEDED',
          'light-bg': '#F6F6F6',
          'item-bg': '#E0E0E0',
          'count': '#B4B4B5',
          'delivery': '#2A71FA',
          'takeaway': '#FC7501',
          'success': '#0DC74E',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Segoe UI',
          'system-ui',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
}
