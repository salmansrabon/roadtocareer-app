module.exports = {
  darkMode: "class",
  important: true,
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        body: ["HindSiliguri", "SFProDisplay", "sans-serif"],
      },
      colors: {
        primary: {
          200: "#F4F4F2",
          400: "#E8E8E8",
          600: "#BBBFCA",
          800: "#495464",
        },
        dark: {
          200: "#222831",
          400: "#393E46",
          600: "#050505",
          800: "#EEEEEE",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
