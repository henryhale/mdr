import { defineConfig } from "vite"
import tailwindcss from 'tailwindcss'
import autoprefixer from "autoprefixer"

export default defineConfig({
	base: "/mdr/",
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()]
		}
	},
	plugins: [
	  tailwindcss(),
	],
})
