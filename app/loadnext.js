let LoadNextFn = function(wordpress) {
	return {
		restrict: 'A',
		link: function(scope, $elm) {
			console.log("bind!");
			$(window).scroll(() => {
		 		// wordpress.retrieveNext();
			});
		}
	}
};

angular.module("mid").directive("loadNext", [
	"wordpress",
	LoadNextFn
]);

// loadNext: function() {
// 	if($window.scrollTop() + $window.height() === $document.height()) {
// 		wordpress.retrievePostsByYear(2016).then(projectsFromAjax => {
// 			portfolio.add(projectsFromAjax);
// 		});
// 	}
// },
// initialize: function() {
// 	_.bindAll(this, 'render', 'appendProject', 'loadNext'); // every function that uses 'this' as the current object should be in here
// 	// bind to window
// 	$(window).scroll(this.loadNext);
// 	this.collection = portfolio;
// 	this.collection.bind('add', this.appendProject); // collection event binder
// },
// appendProject: function(item) {
// 	let projectTile = new ProjectTile({
// 		model: item
// 	});
// 	$(this.el).append(projectTile.render().el);
// }