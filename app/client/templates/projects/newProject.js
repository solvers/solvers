Template.newProject.events({
	'click .back': function(e) {
		Session.set('page', 'home');
	},
	'click #addNewProject': function(e) {
		e.preventDefault();
		Meteor.call('addProject', {
			name: $('#name').val(),
			role: $('#role').val(),
			description: $('#description').val(),
			contact_name: $('#contact_name').val(),
			contact_email: $('#contact_email').val(),
			tags: $('#tags').val().split(',')
		}, function(err, result) {
			if(err) {
				alert(err.reason);
			} else {
				Router.go('/projects/' + result);
			}
		});
	}
});