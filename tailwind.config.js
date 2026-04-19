export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0f172a',
          900: '#0f172a'
        }
      },
      fontFamily: {
        'sans': ['IBM Plex Sans Arabic', 'Manrope', 'system-ui', 'sans-serif']
      },
      spacing: {
        '128': '32rem'
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '20px'
      }
    }
  },
  plugins: []
}
