let ProjectCtrl = function($scope, $location, wordpress) {

	$scope.project = {};
	$scope.visible = false;

	$scope.$on("$locationChangeSuccess", function() {
		let id = parseInt($location.path().match(/\d+/));
		$scope.project = wordpress.posts.get(id);
		$scope.visible = (/project/).test($location.path());
	})
};

angular.module("mid").controller("projectCtrl", [
	"$scope",
	"$location",
	"wordpress",
	ProjectCtrl
]);