/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tahoe: {
          bg: '#F4F5F7',
          'bg-dark': '#0B0B0C',
          panel: 'rgba(255, 255, 255, 0.8)',
          'panel-dark': 'rgba(22, 22, 24, 0.8)',
          border: 'rgba(0, 0, 0, 0.06)',
          'border-dark': 'rgba(255, 255, 255, 0.12)',
          accent: '#0A84FF',
          'accent-hover': '#0077ED',
          text: '#1D1D1F',
          'text-secondary': '#86868B',
          'text-dark': '#F5F5F7',
          'text-secondary-dark': '#98989D',
        },
      },
      borderRadius: {
        'tahoe': '16px',
        'tahoe-lg': '24px',
      },
      backdropBlur: {
        'tahoe': '20px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        'tahoe': '180ms',
      },
      transitionTimingFunction: {
        'tahoe': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
    },
  },
  plugins: [],
}

