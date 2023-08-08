/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}", "./pages/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
};
