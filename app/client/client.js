Template.header.events({
	'click #logout': function(e) {
		Meteor.logout();
	}
});

Accounts.ui.config({
  requestPermissions: {
    github: ['user:email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  extraSignupFields: []
});

Deps.autorun(function () {
	if (Meteor.users) {
		Session.set('usercount', Meteor.users.find().count());
	}
});