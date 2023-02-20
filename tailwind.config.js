/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#06070e",
        primary: "#1b1b1b",
        secondary: "#252A34",
        pinky: "#FF2E63",
        grayish: "#EAEAEA",
      },
      spacing: {
        "95-vh": "95vh",
      },
    },
  },
  plugins: [],
};
