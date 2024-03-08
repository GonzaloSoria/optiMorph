/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
			'sm': '',
			'md': '',
			'lg': '',
			'xl': '60px'
		},
		fontWeight: {
			'bold': '800'
		},
		letterSpacing: {
			'title': '-4px'
		},
		colors: {
			'white': '#f1f1f1',
			'grey': '#a1a1aa',
			'black': '#09090b'
		},
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }
	  
			'md': '768px',
			// => @media (min-width: 768px) { ... }
	  
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
	  
			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }
	  
			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		  }
	},
	plugins: [],
}
