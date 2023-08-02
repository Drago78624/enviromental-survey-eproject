/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}", "./pages/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

