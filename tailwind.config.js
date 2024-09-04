/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				grid: 'radial-gradient(rgb(68 64 60) 1px, transparent 0)'
			},

			fontFamily: {
				sans: ['sometype-mono', 'sans-serif'],
				light: ['helvetica-neue-light', 'sans-serif'],
				ultralight: ['helvetica-neue-ultralight', 'sans-serif'],
				body: ['bahnschrift', 'sans-serif'],
				display: ['vcr-osd-mono', 'sans-serif'],
				terminal: ['terminal-grotesque', 'sans-serif']
			}
		}
	},
	plugins: []
};
