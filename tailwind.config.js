/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderColor: "#D6D6D6",
        orange: "#FF6600",
      },
      boxShadow: {
        custom: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      },
    },
  },
  plugins: [],
};
