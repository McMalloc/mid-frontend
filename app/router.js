var Backbone = require("backbone");
var dispatcher = require("dispatcher");

var Router = Backbone.Router.extend({
	routes: {
		"project/:slug": "showProject"    // #help
	},

	showProject: function(slug) {
		dispatcher.dispatch(slug);
	}
});

var router = new Router();

module.exports = {
	router: router
};