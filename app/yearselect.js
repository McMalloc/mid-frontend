let Backbone = require("backbone");
let wordpress = require("wordpress_adapter");
let portfolio = require("portfolio").instance;

let YearSelect = Backbone.View.extend({
	el: $("#year-select"),
	events: {
		"click .year": "retrieve",
	},

	initialize: function () {
		_.bindAll(this, 'render', 'retrieve');
		this.render();
		this.years = [];
		this.activeYear = 2017;
	},

	retrieve: function (event) {
		let year = $(event.currentTarget).data('year');
		wordpress.retrievePostsByYear(2016).then(projectsFromAjax => {
			portfolio.add(projectsFromAjax);

			$('html, body').animate({
				scrollTop: $(`[data-fromyear='${year}']`).first().offset().top - parseInt($("#main-content").css("margin-top"))
			}, 500);
		});
		this.activeYear = year;
		this.render();
	},

	template: _.template($("#year-select-template").text()),

	render: function () {
		wordpress.getSemesters().then(semesters => {
			this.years = _.uniq(_.pluck(semesters, "year"));
			console.log(this.years);
			this.$el.html(this.template({
				years: this.years,
				activeYear: this.activeYear
			}));
		});
	}
});

module.exports = {
	cls: YearSelect
};