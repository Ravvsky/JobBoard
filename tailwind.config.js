/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["h-[2rem], w-[2rem], h-[1.4rem], w-[1.4rem],line-clamp-3"],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      "main-blue": "#3281A2",
      "dark-blue": "#003F4C",
      "main-gray": "#181818",
      "light-blue": "#9AECFE",
      "light-gray": "#3C3C3C",
      "blueish-gray": "#94C6D1",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addVariant, e }) {
      addVariant("thumb", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`thumb${separator}${className}`)}::-webkit-slider-thumb`;
        });
      });
    }),
  ],
};
