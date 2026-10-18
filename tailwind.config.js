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
        night: {
          950: '#07080B',
          900: '#0C0E14',
          850: '#11141D',
          800: '#171B27',
          700: '#212638',
        },
        rosewood: {
          300: '#F5BAC4',
          400: '#E88B9A',
          500: '#D96578',
          600: '#BF485C',
          700: '#993142',
        },
        champagne: {
          200: '#FAF0DE',
          300: '#F3DEC0',
          400: '#E5C48E',
          500: '#D4A860',
          600: '#B88B42',
        },
        velvet: {
          900: '#1C0D17',
          800: '#2D1424',
          700: '#431C35',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
