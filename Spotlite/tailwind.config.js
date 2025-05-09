/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "eef2ff",
          dark: "#1a1a1a",
        },
        button: {
          primary: "#00a2e4",
          secondary: "#1E1E2D",
        },
      },
      // fontFamily: {
      //   rItalic: ["Roboto-Italic", "sans-serif"],
      //   rRegular: ["Roboto-Regular", "sans-serif"],
      //   mRegular: ["Montserrat-Regular", "sans-serif"],
      //   lRegular: ["Lato-Regular", "sans-serif"],
      //   // rlight: ["Roboto_300Light", "sans-serif"],
      //   // rregular: ["Roboto_400Regular", "sans-serif"],
      //   // rmedium: ["Roboto_500Medium", "sans-serif"],
      //   // rbold: ["Roboto_700Bold", "sans-serif"],
      //   // rblack: ["Roboto_900Black", "sans-serif"],
      // },
    },
  },
  plugins: [],
};
