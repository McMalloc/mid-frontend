let PortfolioCtrl = function($scope, $location, wordpress) {

	wordpress.retrieve(2017);
	$scope.posts = wordpress.posts.getAll();

	$scope.$on("$locationChangeSuccess", () => {
		wordpress.retrieve($location.search().year);
	});

	$scope.show = function(id) {
		$location.path("project/" + id);
	}
};

angular.module("mid").controller("portfolioCtrl", [
	"$scope",
	"$location",
	"wordpress",
	PortfolioCtrl
]);