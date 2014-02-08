Template.newProject.events({
	'click .back': function(e) {
		Session.set('page', 'home');
	},
	'click #addNewProject': function(e) {
		e.preventDefault();
		var tags = $('#tags').val().length > 0 ? $('#tags').val().split(',') : null;
		Meteor.call('addProject', {
			name: $('#name').val(),
			role: $('#role').val(),
			description: $('#description').val(),
			contact_name: $('#contact_name').val(),
			contact_email: $('#contact_email').val(),
			tags: tags
		}, function(err, result) {
			if(err) {
				$('#project_error').show().text(err.reason);
			} else {
				$('#project_error').hide();
				Router.go('/projects/' + result);
			}
		});
	}
});