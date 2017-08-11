// var base = location.host + "/mid/";
var base = "http://localhost/mid/";


var init = function() {
	var initialized = $.Deferred();
	var semesters = [];

	$.when( $.ajax( base + "wp-json/wp/v2/categories" ) ).then(function( data ) {

		_.each(data, function(category) {
			var semester = {};
			if (category.slug.indexOf("sose") !== -1) {
				semester.term = "sommer";
			} else if (category.slug.indexOf("wise") !== -1) {
				semester.term = "winter";
			}

			if (!_.isUndefined(semester.term)) {
				semester.id = category.id;
				semester.year = parseInt(category.slug.substring(5,9));
				semesters.push(semester);
			}
		});

		initialized.resolve(semesters);
	});

	return initialized;
};

var retrievePostsByYear = function(year) {
	var prepared = $.Deferred();

	init().then(function(semesters) {
		var ids = _.chain(semesters)
			.filter(function(semester) {
				return semester.year === year;
			})
			.pluck("id")
			.reduce(function(memo, id) {
				if (memo.length === 0) return id;
				return memo + "," + id
			}, "").value();

		$.when(
			$.ajax(base + "wp-json/wp/v2/posts?categories=" + ids + "&_embed=1")
		).done(function(result) {
			var preparedDataset = [];
			_(result).each(function(project) {
				if (project._embedded["wp:featuredmedia"]) project.featuredImgURL = project._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
				preparedDataset.push(project);
			});
			prepared.resolve(preparedDataset);
		});
	});

	return $.when(prepared);
};

module.exports = {
	retrievePostsByYear: retrievePostsByYear
};