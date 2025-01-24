/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        first:"#0d1b2a",
        second:"#1b263b",
        third:"#415a77",
        forth:"#778da9",
        fifth:"#e0e1dd"
      }
    },
  },
  plugins: [],
}

