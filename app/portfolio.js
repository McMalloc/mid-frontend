var Backbone = require("backbone");

var Project = Backbone.Model.extend({});
var Portfolio = Backbone.Collection.extend({
	model: Project
});
var portfolio = new Portfolio();

module.exports = {
	instance: portfolio
};