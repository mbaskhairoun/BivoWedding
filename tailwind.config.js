/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbf9f3',
        paper: '#f4f0e4',
        sage: { DEFAULT: '#8a9377', dark: '#5e624e' },
        forest: '#34453a',
        muted: '#7a8474',
        gold: '#c4a875',
      },
      fontFamily: {
        cursive: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
};
