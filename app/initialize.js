let Backbone = require("backbone");
let wordpress = require("wordpress_adapter");
let portfolio = require("portfolio").instance;
let dispatcher = require("dispatcher");
let YearSelect = require("yearselect").cls;
let PortfolioView = require("portfolio_view").cls;
require("router");

$( document ).ready(function() {

	let portfolioView = new PortfolioView();
	let yearselect = new YearSelect();
	wordpress.init();

	wordpress.retrievePostsByYear(2017).then(projectsFromAjax => {
		portfolio.add(projectsFromAjax);
		dispatcher.init();
		Backbone.history.start({pushState: false});
	});
});