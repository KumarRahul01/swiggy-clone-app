/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        blackOverlay: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(255,255,255,0.3))"
      },
      aspectRatio: {
        '3/2': '3/2',
      },
    },
  },
  plugins: [],
}