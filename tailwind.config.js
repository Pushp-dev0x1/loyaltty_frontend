/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "iPhone-15-pro-max": "url('/src/assets/iPhone-15-pro-max.png')",
      },
    },
  },
  plugins: [],
};

