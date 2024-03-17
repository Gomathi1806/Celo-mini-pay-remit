/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          primary: "#00955f",
          primaryComp: "#00c77f",
          disableCard: "#C8D0CB",
          primaryLight: "#CFF2E5",
          secondary: "#EA3C58",
        },
      },
    },
  },
  plugins: [nextui(),
    require("flowbite/plugin")
  ],
};
