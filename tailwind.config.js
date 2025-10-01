/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ticker: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" }, // shifts half of the width (because we repeat text twice)
        },
      },
      animation: {
        ticker: "ticker 24s linear infinite",      // mobile speed
        "ticker-md": "ticker 20s linear infinite", // desktop speed
      },
    },
  },
  plugins: [],
}
