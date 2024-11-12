/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#202124;',
        panelCol:'#6A1E55'
      },
    },
  },
  plugins: [],
};
