module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 12px 40px rgba(15, 23, 42, 0.06)",
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
