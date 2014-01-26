Template.header.events({
	'click #logout': function(e) {
		Meteor.logout();
	}
});

Accounts.ui.config({
  requestPermissions: {
    github: ['user:email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
