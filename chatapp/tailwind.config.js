/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: '#32CD32',  // LimeGreen
        secondary: '#7bbb7e', // ForestGreen
        background: '#d3d3d3' // LightGray
      },
    },
  },
  plugins: [],
}