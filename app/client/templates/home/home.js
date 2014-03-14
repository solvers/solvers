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
		return roles.findFullName(user);
	},
	isSolved: function(status) {
		return status === "solved";
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
