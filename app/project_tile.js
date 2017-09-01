let Backbone = require("backbone");

let ProjectTile = Backbone.View.extend({
	tagName: "div",
	className: "project-tile col-xl-3 col-md-4 col-sm-6 col-xs-12",
	events: {
		"click .content":          "open"
	},

	open: function() {
		location.hash = "project/" + this.model.get("slug");
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	template: _.template($("#project-tile-template").text()),

	render: function () {
		this.$el.html(this.template({
			title: this.model.get("title").rendered,
			year: this.model.get("year"),
			imageURL: this.model.get("featuredImgURL")
		}));
		return this;
	}
});

module.exports = {
	cls: ProjectTile
};