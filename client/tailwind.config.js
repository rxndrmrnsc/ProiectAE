// tailwind.config.js
const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/(button|input|select|slider|ripple|spinner|form|listbox|divider|popover|scroll-shadow).js"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};