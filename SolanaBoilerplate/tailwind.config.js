/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cab2fb': '#cab2fb',  // Add this line to include the custom color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        Caveat: ['Caveat', 'cursive'],
        Oswald: ["Oswald", 'sans-serif'],
        Tilt: ["Tilt Neon", 'sans-serif'],
      }
    },
  },
  plugins: [],
}
