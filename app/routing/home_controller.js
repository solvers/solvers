HomeController = RouteController.extend({
	template: 'home',

	layoutTemplate: 'app',

	before: function () {
		Session.set('projects_tag', '');
	},

	after: function () {
		var tags = this.getData().tags;
		if(tags.length > 0) {
			$('#input-search').typeahead({
				source: tags,
				updater: function(item) {
					Router.go('/projects/tag/' + item);
				}
			});
		}
		$('#gotoProjects').click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $('.projects').offset().top
			}, 300);
		});
	},

	waitOn: function () {
		return [Meteor.subscribe('projects'), Meteor.subscribe('tags'), Meteor.subscribe('notifications')];
	},

	data: function () {
		var data = {tags: Meteor.tags.find().map(function (tag) {return tag.name})};
		var tag = this.params._tag;
		Session.set('projects_tag', tag);
		if(tag) {
			data['projects'] = Projects.find({tags: {$in: [tag]}}, {sort: [["postedDate", "desc"]]});
		} else {
			data['projects'] = Projects.find({}, {sort: [["postedDate", "desc"]]});
		}
		return data;
	}

});