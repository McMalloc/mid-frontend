var Backbone = require("backbone");
var wordpress = require("wordpress_adapter");
var portfolio = require("portfolio").instance;
var dispatcher = require("dispatcher");
require("router");

$( document ).ready(function() {
	console.log("Initializing app.");

	var $window = $(window); var $document = $(document);
	var PortfolioView = Backbone.View.extend({
		el: $("#main-content"),
		loadNext: function() {

			if($window.scrollTop() + $window.height() === $document.height()) {
				wordpress.retrievePostsByYear(2016).then(function(projectsFromAjax) {
					portfolio.add(projectsFromAjax);
				});
			}
		},
		initialize: function(){
			_.bindAll(this, 'render', 'appendProject', 'loadNext'); // every function that uses 'this' as the current object should be in here
			// bind to window
			$(window).scroll(this.loadNext);
			this.collection = portfolio;
			this.collection.bind('add', this.appendProject); // collection event binder
		},
		appendProject: function(item){
			var projectTile = new ProjectTile({
				model: item
			});
			$(this.el).append(projectTile.render().el);
		}
	});

	var ProjectTile = Backbone.View.extend({
		tagName: "div",
		className: "project-tile",
		events: {
			"click .title":          "open"
		},

		open: function() {
			location.hash = "project/" + this.model.get("slug");
		},

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},

		template: _.template($("#project-tile-template").text()),

		render: function() {
			this.$el.html(this.template({
				title: this.model.attributes.title.rendered,
				imageURL: this.model.attributes.featuredImgURL
			}));
			return this;
		}
	});

	var portfolioView = new PortfolioView();

	wordpress.retrievePostsByYear(2017).then(function(projectsFromAjax) {
		portfolio.add(projectsFromAjax);
		// portfolioView.render();
		dispatcher.init();
		Backbone.history.start();
	});
});