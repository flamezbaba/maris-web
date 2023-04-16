/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {
    extend: {},
    screens: {
      'md': {'min': '0px', 'max': '850px'},      
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
