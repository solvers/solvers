var projectsHandle = Meteor.subscribe('projects', function() {
});
Meteor.subscribe('comments', function() {
});

var admins = [
	"richardsmith404@gmail.com", /* Richard Smith */
	"davedx@gmail.com", /* Dave Clayton */
];

var isAdmin = function() {
	return Meteor.user() && Meteor.user().emails[0].verified && _.find(admins, function(email) { return Meteor.user().emails[0].address === email });
};

Template.header.rendered = function() {
   $('a[rel=tooltip]').tooltip() //initialize all tooltips in this template
};

Template.header.events({
	'click #logout': function(e) {
		Meteor.logout();
	}
})

Template.home.helpers({
	projects: function() {
		return Projects.find({});
	},
	mayRemove: function() {
		return isAdmin() || this.owner === Meteor.userId();
	},
	loading: function() {
  return !projectsHandle.ready();
	},
	noUser: function() {
		return !Meteor.user();
	}
});

Template.home.events({
	'click .deleteProject': function(e) {
		Meteor.call('deleteProject', this._id);
	}
});


Accounts.ui.config({
  requestPermissions: {
    github: ['user:email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});