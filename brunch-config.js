// See http://brunch.io for documentation.
exports.files = {
	javascripts: {
		joinTo: {
			'vendor.js': [
				"node_modules/jquery/dist/jquery.js",
				"node_modules/angular/angular.js",
				"node_modules/angular-route/angular-route.js",
				"node_modules/angular-sanitize/angular-sanitize.js",
				"node_modules/underscore/underscore.js"
			],
			'app.js': [
				"app/*.js"
			]
		}
	},
	stylesheets: {
		joinTo: {
			'app.css': [
				"node_modules/bootstrap/dist/css/bootstrap-reboot.css",
				"node_modules/bootstrap/dist/css/bootstrap-grid.css",
				"app/styles/main.scss"
			]
		}
	}
};

exports.paths = {
	watched: [
		"node_modules/jquery/dist/jquery.js",
		"node_modules/angular/angular.js",
		"node_modules/angular-route/angular-route.js",
		"node_modules/angular-sanitize/angular-sanitize.js",
		"node_modules/underscore/underscore.js",

		"node_modules/bootstrap/dist/css/bootstrap-reboot.css",
		"node_modules/bootstrap/dist/css/bootstrap-grid.css",

		"app/styles/",
		"app/assets/",
		"app/"
	]
};

exports.plugins = {
	autoReload: {
		enabled: {
			css: true,
			js: true,
			assets: true
		}
	}
};

exports.npm = {
	enabled: false,
	globals: {
		$: 'jquery',
		_: 'underscore',
		angular: 'angular'
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
exports.plugins = {
	sass: {
		options: {
			includePaths: [
				'node_modules/bootstrap/dist/css/bootstrap-grid.css'
			]
		}
	}
};
