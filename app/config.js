angular.module("mid")
	.config([
	'$routeProvider',
	'$locationProvider',
	function($routeProvider, $locationProvider) {

		// use the HTML5 History API
		$locationProvider.html5Mode(true);
		console.log("configured");
	}
]);