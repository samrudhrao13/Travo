/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        travo: {
          orange: '#F97316',
          navy: '#1E3A5F',
          green: '#10B981',
        },
      },
    },
  },
  plugins: [],
};
