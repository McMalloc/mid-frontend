var Backbone = require("backbone");
var dispatcher = require("dispatcher");

var Router = Backbone.Router.extend({
	routes: {
		"project/:slug": "showProject",    // #help
		"": "hideProject"
	},

	showProject: function(slug) {
		dispatcher.dispatch(slug);
	},

	hideProject: function() {
		dispatcher.dispatch(false);
	}
});

var router = new Router();

module.exports = {
	router: router
};