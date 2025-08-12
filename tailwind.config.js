/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: ['selector', '[class="dark-mode"]'],
  theme: {
    extend: {},
  },
  plugins: [
    // require("daisyui")
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar')
  ],
};
