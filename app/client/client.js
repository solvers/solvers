Template.header.events({
	'click #logout': function(e) {
		Meteor.logout();
	},
	'click #mailing_btn': function(e) {
		e.preventDefault();
		Meteor.call('addToMailList', $('#mailing_email').val(), function(err) {
			if(err) {
				alert(err.reason);
			} else {
				alert("Thank you for signing up to our mailing list. Please check your email to confirm your subscription.")
				$('#hn_mail').fadeOut('fast', function() {
					Session.set('no_hn_mail', true);
				});
			}
		});
	},
	'click #close_mailing_btn': function(e) {
		e.preventDefault();
		$('#hn_mail').fadeOut('fast', function() {
			Session.set('no_hn_mail', true);
		});
	}
});

Template.header.helpers({
	'no_hn_mail': function() {
		return Session.get('no_hn_mail');
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