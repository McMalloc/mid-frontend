let ProjectPage = require("projectpage").ProjectPage;
let portfolio = require("portfolio").instance;

let projectpage;

let init = function() {
	projectpage = new ProjectPage();
};

let dispatch = function(slug) {
	if (!slug) projectpage.hide();
	let model = portfolio.findWhere({slug: slug});
	projectpage.render(model);
};

module.exports = {
	init: init,
	dispatch: dispatch
};