/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EDF4F8",
          100: "#DEEBF2",
          200: "#BDD7E5",
          300: "#9CC2D9",
          400: "#77ACCA",
          500: "#5799BE",
          600: "#3D7B9E",
          700: "#2F5E79",
          800: "#1F3F51",
          900: "#101F28",
        },
        mono: {
          50: "#E6E6E6",
          100: "#D9D9D9",
          200: "#BDBDBD",
          300: "#A3A3A3",
          400: "#878787",
          500: "#6E6E6E",
          600: "#5C5C5C",
          700: "#4A4A4A",
          800: "#363636",
          900: "#242424",
        },
        green: {
          50: "#DEF3F0",
          100: "#CFEDE8",
          200: "#B1E2D6",
          300: "#93D7C1",
          400: "#76CCA9",
          500: "#59C18F",
          600: "#40AB80",
          700: "#33896E",
          800: "#276859",
          900: "#1A4740",
        },
        red: {
          50: "#F3E5DD",
          100: "#EDD9CF",
          200: "#E2BDB1",
          300: "#D79E93",
          400: "#CC7C75",
          500: "#C25959",
          600: "#AC483F",
          700: "#8A4133",
          800: "#683726",
          900: "#47291A",
        },
      },
    },
  },
  plugins: [],
};