/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      gridTemplateColumns: {
        '57/40': '57% 40%'
      },
      colors: {
        darkGray: '#111111',
        grayish: '#242424',
        lightGray: '#1E1E1E',
        dividerGray: 'rgba(84, 84, 84, .48)',
        borderGray: 'hsla(0,0%,100%,.14)',
        backgroundGray: 'hsla(0,0%,12%,1)',
        silverGray: '#888888',
        silverLightGray: '#A1A1A1',
        orange: '#FF5700',
        dark: '#0A0A0A',
        light: '#EDEDED'
      },
      backgroundImage: {
        'orangeGradient': 'linear-gradient(to right, #ffaf00, #ff4f00)'
      },
      boxShadow: {
        'focus': '0 0 0 1px hsla(0,0%,100%,.51), 0 0 0 4px hsla(0,0%,100%,.24)',
        'orangeInset': 'rgba(255,40,0,0.05) 0px -23px 25px 0px inset, rgba(255,40,0,0.04) 0px -36px 30px 0px inset, rgba(255,40,0,0.03) 0px -79px 40px 0px inset'
      }
    },
  },
  plugins: [],
};
