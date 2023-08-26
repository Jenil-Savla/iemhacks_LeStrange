/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#274C5B",
        secondary: "#7EB693",
        yellow: "#EFD372",
        "primary-gray": "#D4D4D4",
        "light-gray": "#EFF6F1",
        "dark-gray": "#525C60",
      },
      fontFamily: {
        ourfont: ["Poppins", "serif"],
      },
      boxShadow: {
        "main-sd": "1px 1px 7px 2px rgba(0, 0, 0, 0.25)",
        "primary-sd": "1px 1px 20px rgba(0, 0, 0, 0.2)",
        "secondary-sd": "0 5px 15px rgb(0, 0, 0, 0.07)",
        card: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
