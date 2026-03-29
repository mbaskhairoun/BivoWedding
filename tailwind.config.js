/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#8faa8c', light: '#b5ccb2', pale: '#dfe9dc' },
        hydrangea: { DEFAULT: '#7ba7c2', light: '#a8cfe0', pale: '#d6eaf5' },
        cream: '#fdf9f0',
        ivory: '#faf6eb',
        gold: { soft: '#d4b96a', pale: '#f0e4bf' },
        txt: { DEFAULT: '#4a5a47', light: '#6d7d6a' },
      },
      fontFamily: {
        cursive: ['Pinyon Script', 'Great Vibes', 'cursive'],
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Josefin Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
