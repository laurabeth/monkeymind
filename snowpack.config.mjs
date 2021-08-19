/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: "/",
		src: "/dist",
	},
	plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-webpack"],
	routes: [
		/* Enable an SPA Fallback in development: */
		{
			match: "routes",
			src: ".*",
			dest: "/index.html",
		},
	],
	optimize: {
		/* Example: Bundle your final build: */
		// "bundle": true,
	},
	packageOptions: {
		types: "true",
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		sourceMap: true,
	},
};
