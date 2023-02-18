/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#08D9D6",
        secondary: "#252A34",
        pinky: "#FF2E63",
        grayish: "#EAEAEA",
      },
    },
  },
  plugins: [],
};
