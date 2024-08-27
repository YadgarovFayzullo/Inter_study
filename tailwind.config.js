/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "769px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      Header: ["Oswald", "sans-serif"],
      Arimo: ["Arimo", "serif"],
      Sans: ["Noto Sans", "sans-serif"],
      Roboto: ["Roboto Slab", "serif"],
      Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "light-white": "#f5f5f5",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
};
