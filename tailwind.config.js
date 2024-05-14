/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    fontSize: {
      12: 12,
      14: 14,
      16: 16,
      18: 18,
      20: 20,
      22: 22,
      24: 24,
      28: 28,
      30: 30,
      36: 36,
      48: 48,
      60: 60,
      72: 72
    },
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
