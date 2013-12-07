Meteor.subscribe('jobs', function() {
});

Session.set('page', 'home');

Template.home.jobs = function () {
	return Jobs.find({});
};

Template.home.isMine = function() {
	return this.owner === Meteor.userId();
};

Template.home.events({
	'click #newJob': function(e) {
		Session.set('page', 'newJob');
		e.preventDefault();
	},
	'click #deleteJob': function(e) {
		Meteor.call('deleteJob', this._id);
		e.preventDefault();
	}
});

Template.newJob.events({
	'click .back': function(e) {
		Session.set('page', 'home');
		e.preventDefault();
	},
	'click #addNewJob': function(e) {
		Meteor.call('addJob', {
			name: $('#name').val(),
			role: $('#role').val(),
			description: $('description').text()
		});
		Session.set('page', 'home');
		e.preventDefault();
	}
});

Template.router.pageIs = function (page) {
  return Session.get('page') === page;
};


