var ProjectPage = require("projectpage").ProjectPage;
var portfolio = require("portfolio").instance;

var projectpage;

var init = function() {
	projectpage = new ProjectPage();
};

var dispatch = function(slug) {
	var model = portfolio.findWhere({slug: slug});
	projectpage.render(model);
};

module.exports = {
	init: init,
	dispatch: dispatch
};