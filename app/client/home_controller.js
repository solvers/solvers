Template.home.helpers({
	message: function() {
		var tag = Session.get('projects_tag');
		if(tag)
			return 'Displaying all projects tagged with "' + tag + '"';
		return null;
	},
	mayUpdate: function() {
		return roles.isAdmin() || this.owner === Meteor.userId();
	},
	noUser: function() {
		return !Meteor.user();
	},
	formatDate: function(date) {
		if(!date)
			return '';
		return moment(date).format('MMM Do YYYY');
	},
	username: function(id) {
		var user = Meteor.users.findOne({_id: id});
		if (user) {
			if (user.profile && user.profile.name) {
				return user.profile.name;
			}
			if(user.profile && user.profile.firstName) {
	      return (user.profile.firstName || '') + " " + (user.profile.lastName || '');
			}
			if (user.username) {
				return user.username;
			}
		}
		return 'Unknown';
	}
});

Template.home.events({
	'click .deleteProject': function(e) {
		e.preventDefault();
		if(confirm("Are you sure you want to remove this project?")) {
			Meteor.call('deleteProject', this._id);
		}
	},
	'click #postProject': function(e) {
		e.preventDefault();
		Router.go('newProject');
	}
});

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
		return [Meteor.subscribe('projects'), Meteor.subscribe('tags'), Meteor.subscribe('userData')];
	},

	data: function () {
		var data = {tags: Meteor.tags.find().map(function (tag) {return tag.name})};
		var tag = this.params._tag;
		Session.set('projects_tag', tag);
		if(tag) {
			data['projects'] = Projects.find({tags: {$in: [tag]}});
		} else {
			data['projects'] = Projects.find();
		}
		return data;
	}

});