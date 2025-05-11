/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}","!./node_modules/**/*"],
	theme: {
		extend: {
			colors: {
				customOrange: "#F28627",
			},
		},
	},
	plugins: [],
}

