/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        adecor: {
          greige: '#D3D0C9',
          'greige-light': '#E5E3DC',
          'greige-dark': '#B5B1A8',
          taupe: '#8A8782',
          'taupe-dark': '#5E5C57',
          sand: '#ECE9E2',
          cream: '#FAF8F5',
          ivory: '#F4F2EC',
          charcoal: '#1E1D1B',
          'charcoal-light': '#2D2B28',
          dark: '#141312',
          gold: '#C5A880',
          'gold-light': '#DEC8AA',
          'gold-dark': '#9A7A4F',
          blue: '#5C768D',
          'blue-light': '#8FA5B8',
          'blue-dark': '#3F5668',
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        display: ['Syne', '"Cormorant Garamond"', 'Playfair Display', 'serif'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.22em',
        'luxury-wide': '0.35em',
      },
      boxShadow: {
        'soft-luxury': '0 20px 45px -15px rgba(20, 19, 18, 0.08), 0 0 1px 1px rgba(20, 19, 18, 0.04)',
        'elevated': '0 30px 60px -20px rgba(0, 0, 0, 0.15)',
        'glow-gold': '0 0 30px rgba(197, 168, 128, 0.25)',
      },
      transitionTimingFunction: {
        'luxury-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
