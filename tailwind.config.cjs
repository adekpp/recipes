/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Playball: ["Playball", "cursive"],
        sans: ['Inter', "sans-serif"],
        Title: ['Playfair Display', 'serif']
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/aspect-ratio')],
};
