/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // THIS is important
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dusty: "#edf7f6",
        live: "#68d388",
        darkbg: "#121212",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        // fadeIn: "fadeIn 0.3s ease-out forwards",
        // fadeOut: "fadeOut 0.2s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        
        // fadeIn: {
        //   "0%": { opacity: 0, transform: "translateY(-5px)" },
        //   "100%": { opacity: 1, transform: "translateY(0)" },
        // },
        // fadeOut: {
        //   "0%": { opacity: 1, transform: "translateY(0)" },
        //   "100%": { opacity: 0, transform: "translateY(-5px)" },
        // },
      },
    },
  },
  plugins: [],
};
