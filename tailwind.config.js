export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        myntraPink: "#FF3F6C",
        myntraOrange: "#FF6F61",
      },
      backgroundImage: {
        myntraGradient:
          "linear-gradient(90deg, #FF3F6C 0%, #FF6F61 100%)",
      },
    },
  },
  plugins: [],
}