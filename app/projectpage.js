var Backbone = require("backbone");

var ProjectPage = Backbone.View.extend({
	el: $("#projectpage-view-container"),
	events: {
		"click .icon":          "open",
		"click .button.edit":   "openEditDialog",
		"click .button.delete": "destroy"
	},

	initialize: function() {
		_.bindAll(this, 'render');
	},

	template: _.template($("#project-page-template").text()),

	render: function(model) {
		this.$el.html(this.template({
			title: model.get("title").rendered,
			imageURL: model.get("featuredImgURL"),
			content: model.get("content").rendered
		}));
		return this;
	}
});

module.exports = {
	ProjectPage: ProjectPage
};