/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**'],
  theme: {
    extend: {
      colors: {
        'blue': '#1d4ede',
        'black': '#000',
        'lightGrey': '#d0d5dd',
        'teal': '#4fa0cc',
        'grey': '#494949',
        'green': "#7ACA7D",
        'lightestGrey': '#828282',
        'white':'#fffff',
        'lightDashedBorder':'#68759120',
        'lightBottomBorder':"#6875910d",
        'textDescription':'#687591',
        'bgDescription':"#68759143",
        'lightSky':'#D0DAF8',
        'lightLabel':'#667085',
        'darkTextTitle' : '#101217',
        'lightGreen':"#7ACA7D"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}

