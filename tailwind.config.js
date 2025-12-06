/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {

    screens: {

      'sm': {'max':"640px"},

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        'blue': '#1d4ede',
        'black': '#000',
        'lightblack':'#687591',
        'gg':'#E4E9EF',
        'semiGrey':'#344054',
        'headerblack': '#0E1218',
        'textgrey':'#4D4D4D',
        'lightwhite':'#F3F5F7',
        'lightGrey': '#d0d5dd',
        'teal': '#4fa0cc',
        'lightblue':'#D9E2FF',
        'grey': '#494949',
        'lightDashedBorder':"#68759120",
        'lightBottomBorder':"#6875910d",
        'textDescription':"#687591",
        'bgDescription':"#68759123",
        'textTitle':'#2E333E',
        'lightSky':"#D0DAF8",
        'lightLabel':"#667085"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      width: {'120':'42rem',
              '100':'400px'
            },
            
    },
  },
  plugins: [],
}