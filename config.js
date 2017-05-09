System.config({
	transpiler: false,

	map: {
		css: 'node_modules/systemjs-plugin-css/css.js'
	},

	packages: {
		'dist/': {
			defaultExtension: 'js'
		}
	}
});
