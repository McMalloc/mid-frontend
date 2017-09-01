// See http://brunch.io for documentation.
exports.files = {
	javascripts: {
		joinTo: {
			'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
			'app.js': /^app/
		}
	},
	stylesheets: {joinTo: 'app.css'}
};

exports.conventions = {
	ignored: /^(bower_components\/bootstrap-less(-themes)?|app\/styles\/overrides|(.*?\/)?[_]\w*)/
};

exports.plugins = {
	babel: {presets: ['latest']}
};

exports.npm = {
	enabled: true,
	globals: {
		$: 'jquery',
		_: 'underscore'
	},
	styles: {
		bootstrap: ['dist/css/bootstrap-grid.css'],
		"normalize.css": ['normalize.css']
	}
};

exports.modules = {
	autoRequire: {
		'app.js': ['initialize'],
	},
};
// exports.plugins = {
// 	sass: {
// 		options: {
// 			includePaths: [
// 				'node_modules/bootstrap/dist/css/bootstrap.css'
// 			]
// 		}
// 	}
// };
