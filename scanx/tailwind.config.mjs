/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		animation: {
		  'slide-left': 'slideLeft 20s linear infinite',
		  'slide-right': 'slideRight 20s linear infinite',
		},
		keyframes: {
		  slideLeft: {
			'0%': { transform: 'translateX(0%)' },
			'100%': { transform: 'translateX(-50%)' },
		  },
		  slideRight: {
			'0%': { transform: 'translateX(-50%)' },
			'100%': { transform: 'translateX(0%)' },
		  }
		}
	  },
	},
	plugins: [],
  }