import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				// prependData: '@use "src/variables.scss" as *;'
			}
		}),
		mdsvex({ extensions: ['.md', '.svx'] })
	],

	kit: {
		adapter: adapter(),

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						// additionalData: '@use "src/variables.scss" as *;'
					}
				}
			}
		}
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
