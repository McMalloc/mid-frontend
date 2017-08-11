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
		normalize: ['dist/css/bootstrap.css'],
		bootstrap: ['dist/css/bootstrap.css']
	}
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
