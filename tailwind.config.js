/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			borderRadius: {
				'xl': '1rem',
			},
			width: {
				'55': 55,
			},
			colors: {
				'primary-dark': '#323031',
				'primary-dark-hover': '#323031',
				'primary': '#ca402b',
				'primary-hover': '#ca402b',
				'primary-light': '#ca402b',
				'primary-light-hover': '#ca402b',
				'extra-light': '#ca402b',
				'extra-light-hover': '#ca402b',
				gray: {
    		 	50:  '#fafafa',
          100: '#f2f2f2',
          200: '#e0e0e0',
          300: '#c6c6c6',
          400: '#a1a1a1',
          500: '#7c7c7c',
          600: '#5a595a',
          700: '#444344',
          800: '#323031',
          900: '#1f1e1f',
          950: '#0f0e0f',
        },
			},
			screens: {
				'2xs': '360px',
				'xm': { 'max': '479px' },
			},
			keyframes: {
				'slide-in-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'slide-in-down': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'quick-blur': {
					'0%': { filter: 'blur(2px)' },
					'100%': { filter: 'blur(0)' },
				},
			},
			animation: {
				'slide-in-up': 'slide-in-up 0.5s ease-out forwards',
				'slide-in-down': 'slide-in-down 0.5s ease-out forwards',
				'quick-blur': 'quick-blur 0.3s ease-in'
			},
		},
	},
	plugins: [],
};
