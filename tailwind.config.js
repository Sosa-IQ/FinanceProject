/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
            "./app/**/**/*.{js,jsx,ts,tsx}", 
            "./components/*.{js,jsx,ts,tsx}", 
            "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        greenBase: '#163832', // for background
        greenSecondary: '#DAF1DE', // for other components
      },
      fontFamily: {
        bsregular: ['BreeSerif-Regular', 'serif'],
      },
    },
  },
  plugins: [],
}

