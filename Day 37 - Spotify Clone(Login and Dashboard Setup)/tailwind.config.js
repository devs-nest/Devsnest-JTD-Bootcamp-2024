/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1ed760",
        "base": "#121212",
        "secondary": "#1f1f1f",
        "subdued": "#b3b3b3",
        "gray": "#393939",
      }
    },
  },
  plugins: [],
}