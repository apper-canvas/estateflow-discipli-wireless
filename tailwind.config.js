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
        primary: {
          DEFAULT: '#C17D3F',
          light: '#D4925A',
          dark: '#A66B32'
        },
        secondary: {
          DEFAULT: '#3F7DC1',
          light: '#5A92D4',
          dark: '#326BA6'
        },
        accent: '#3FC17D',
        surface: {
          50: '#FEFDFB',
          100: '#FBF9F6',
          200: '#F8F4EF',
          300: '#F5F1EC',
          400: '#F2EDE6',
          500: '#EFE9E0',
          600: '#E8E2D9',
          700: '#DDD5C9',
          800: '#CFC4B3',
          900: '#B8A898'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.06)',
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        'neu-light': '0 8px 24px rgba(0, 0, 0, 0.04)',
        'neu-dark': '0 16px 40px rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #C17D3F 0%, #D4925A 100%)',
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F1EC' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }
    },
  },
  plugins: [],
}