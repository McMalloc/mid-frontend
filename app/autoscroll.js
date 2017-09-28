let AutoScrollFn = function() {
	return {
		restrict: 'A',
		scope: {
			year: "=autoScroll"
		},
		link: function(scope, $element) {
			function checkVisible(elm) {
				let rect = elm.getBoundingClientRect();
				let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
				return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
			}

			$(window).scroll(() => {
				//TODO debounce

				let visibles = _.groupBy($(".project-tile"), function(tile) {
					return checkVisible(tile);
				}).true;

				let byYear = _.groupBy(visibles, function(tile) {
					return tile.dataset.year;
				});

				let highestKey = 0,
					highestValue = 0;
				_.each(_.keys(byYear), function(key) {
					if (byYear[key].length > highestValue) {
						highestValue = byYear[key].length;
						highestKey = key;
					}
				});

				if (parseInt(scope.year) === parseInt(highestKey)) {
					$element.addClass("active");
				} else {
					$element.removeClass("active");
				}
			});
		}
	}
};

angular.module("mid").directive("autoScroll", [
	AutoScrollFn
]);