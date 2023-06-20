/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0C0B0B",
        secondary: "#717171",
        accent: "#F9B546",
        neutral: "#fafafa",
        black: "#000000",
        white: "#ffffff",
        error: "red",
        "input-only": "#131212",
      },
      padding: {
        "only-sidebar": "30px",
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
      backgroundImage: {
        "profile-undefined": "url('/user.webp')",
      },
    },
  },
  plugins: [],
};
