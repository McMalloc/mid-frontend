let WordpressAdapter = function($http, $q) {
	const base = "http://localhost/mid/";

	class Semester {
		constructor (year, term, id) {
			this.year = year;
			this.term = term;
			this.id = id;
		}
	}

	class Collection {
		constructor (type, idField) {
			this.type = type;
			this.idField = idField;
			this.data = [];
		}

		add(obj) {
			let isInstance = obj.constructor && obj.constructor.name === this.type;
			let isNew = angular.isUndefined(this.get(obj[this.idField]));
			if (isInstance && isNew) {
				this.data.push(obj);
			}
		}

		get(id) {
			return _.findWhere(this.data, {id: id});
		}

		getAll() {
			return this.data;
		}
	}

	// instanceof for collection
	class Post {
		constructor (title, content, year, imageUrl, id) {
			let $content = $(content);
			let imageElements = $content.find("img").detach();
			this.title = title;
			this.content = _.reduce($content, (memo, el) => {
				if (angular.isUndefined(el.outerHTML)) return memo;
				return memo + el.outerHTML;
			}, "");
			this.imageUrl = imageUrl;
			this.year = year;
			this.id = id;
			this.images = _.map(imageElements, function(img) {
				return img.src
			});
		}
	}

	let posts = new Collection("Post", "id");
	let semesters = new Collection("Semester", "id");

	let semesterDefer = $q.defer();

	let defersForYears = {};

	const retrieve = function(year) {
		semesterDefer.promise.then(() => {
			let ids =
				_.chain(semesters.getAll())
					.filter(semester => {
						return semester.year === year;
					})
					.pluck("id").uniq()
					.reduce((memo, id) => {
						if (memo.length === 0) return id;
						return memo + "," + id
					}, "").value();

			if (ids.length === 0) return;
			$http.get(base + "wp-json/wp/v2/posts?categories=" + ids + "&_embed=1").then(data => {
				_(data.data).each(function(project) {
					let imageUrl = "";
					if (project._embedded["wp:featuredmedia"]) imageUrl = project._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;

					posts.add(new Post(
						project.title.rendered,
						project.content.rendered,
						year,
						imageUrl,
						project.id
					));
				});
				defersForYears[year].resolve();
			});
		});
	};

	const init = function() {
		$http.get(base + "wp-json/wp/v2/categories").then(data => {
			_.each(data.data, function (category) {
				let term = null;
				if (category.slug.indexOf("sose") !== -1) {
					term = "sommer";
				} else if (category.slug.indexOf("wise") !== -1) {
					term = "winter";
				}

				if (term !== null) {
					semesters.add(
						new Semester(
							parseInt(category.slug.substring(5, 9)),
							term,
							parseInt(category.id)
						)
					);
				}
			});

			_.each(_.uniq(_.pluck(semesters.getAll(), "year")), year => {
				defersForYears[year] = $q.defer();
			});
			semesterDefer.resolve();
		});
	};

	init();

	const getSemesters = function() {
		let deferred = $q.defer();
		semesterDefer.promise.then(() => {
			deferred.resolve(semesters);
		});
		return deferred.promise;
	};

	return {
		retrieve: retrieve,
		posts: posts,
		getSemesters: getSemesters,
		defersForYears: defersForYears
	};
};

angular
	.module("mid")
	.factory('wordpress', [
		"$http",
		"$q",
		WordpressAdapter
	]);