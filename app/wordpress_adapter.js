// let base = location.host + "/mid/";
const base = "http://localhost/mid/";
let semesters = [];
let initialized = $.Deferred();

let init = function() {
	$.when( $.ajax( base + "wp-json/wp/v2/categories" ) ).then(function( data ) {

		_.each(data, function(category) {
			let semester = {};
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
};

let getSemesters = function() {
	let prepared = $.Deferred();
	initialized.then(semesters => {
		prepared.resolve(semesters);
	});
	return $.when(prepared);
};

let retrievePostsByYear = function(year) {
	let prepared = $.Deferred();

	initialized.then(semesters => {
		let ids =
			_.chain(semesters)
			.filter(semester => {
				return semester.year === year;
			})
			.pluck("id")
			.reduce((memo, id) => {
				if (memo.length === 0) return id;
				return memo + "," + id
			}, "").value();

		$.when(
			$.ajax(base + "wp-json/wp/v2/posts?categories=" + ids + "&_embed=1")
		).done(function(result) {
			let preparedDataset = [];
			_(result).each(function(project) {
				if (project._embedded["wp:featuredmedia"]) project.featuredImgURL = project._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
				project.year = year;
				preparedDataset.push(project);
			});
			prepared.resolve(preparedDataset);
		});
	});

	return $.when(prepared);
};

module.exports = {
	retrievePostsByYear: retrievePostsByYear,
	getSemesters: getSemesters,
	init: init
};