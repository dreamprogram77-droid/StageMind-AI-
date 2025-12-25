
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-teal': '#64FFDA',
        'amber-gold': '#FFB400',
        'midnight': '#0A192F',
        'navy': '#0F172A',
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'plex': ['IBM Plex Arabic', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
