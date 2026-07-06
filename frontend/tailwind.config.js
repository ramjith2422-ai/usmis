/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#EAF0EF',
          100: '#C9D8D6',
          400: '#3C6B68',
          600: '#1B3C3B',
          700: '#142B2A',
          800: '#0F2422',
          900: '#0A1918',
        },
        paper: {
          DEFAULT: '#FAF7EF',
          dim: '#F0EAD9',
        },
        ochre: {
          DEFAULT: '#D9A21B',
          dark: '#B5820F',
          light: '#F0C24D',
        },
        rust: {
          DEFAULT: '#B0432C',
        },
        moss: {
          DEFAULT: '#3E7A57',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(15,36,34,0.06), 0 8px 24px -8px rgba(15,36,34,0.25)',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
}
