/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'Helvetica'],
        serif: ['Helvetica', ...defaultTheme.fontFamily.serif]
      },
      width: {
        1600: '1600px',
        400: '400px',
        450: '450px',
        210: '210px',
        550: '550px',
        260: '260px',
        650: '650px'
      },
      height: {
        600: '600px',
        280: '280px',
        900: '900px',
        458: '458px'
      },
      top: {
        ' 50%': '50%'
      },
      backgroundColor: {
        primary: '#000',
        blur: '#030303'
      },
      colors: {
        primary: 'rgb(22, 24, 35)'
      },
      backgroundImage: {
        'blurred-img':
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')"
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss'),require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')]
};
