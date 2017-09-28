let NavCtrl = function($scope, $location, $timeout, wordpress) {

	$scope.semesters = [];

	wordpress.getSemesters().then(semesters => {
		$scope.years = _.uniq(_.pluck(semesters.getAll(), "year"));
	});

	$scope.retrieve = function(year) {
		$location.search({year: year});
		wordpress.defersForYears[year].promise.then(() => {
			// $('html, body').animate({
			// 	scrollTop: $(`[data-fromyear='${year}']`).first().offset().top - parseInt($("#main-content").css("margin-top"))
			// }, 500);
			$timeout(() => {
				$("html, body").animate({
					scrollTop: $("[data-year='" + year + "']").offset().top - parseInt($("#main-content").css("margin-top"))
				}, "slow");
			});
		});
	}
};

angular.module("mid").controller("navCtrl", [
	"$scope",
	"$location",
	"$timeout",
	"wordpress",
	NavCtrl
]);