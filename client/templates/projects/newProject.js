Template.newProject.events({
	'click .back': function(e) {
		Session.set('page', 'home');
	},
	'click #addNewProject': function(e) {
		Meteor.call('addProject', {
			name: $('#name').val(),
			role: $('#role').val(),
			description: $('#description').val()
		});
		Session.set('page', 'home');
	}
});