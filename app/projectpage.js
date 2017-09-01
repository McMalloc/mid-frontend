var Backbone = require("backbone");

var ProjectPage = Backbone.View.extend({
	el: $("#projectpage-view-container"),
	events: {
		"click":          "hide"
	},

	initialize: function() {
		_.bindAll(this, 'render');
	},

	template: _.template($("#project-page-template").text()),

	hide: function() {
		this.$el.addClass("hide");
		location.hash = "";
	},

	render: function(model) {
		if (model === undefined) return;
		this.$el.html(this.template({
			title: model.get("title").rendered,
			imageURL: model.get("featuredImgURL"),
			content: model.get("content").rendered
		}));
		this.$el.removeClass("hide");
		return this;
	}
});

module.exports = {
	ProjectPage: ProjectPage
};