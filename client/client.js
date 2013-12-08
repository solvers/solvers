Meteor.subscribe('jobs', function() {
});

Session.set('page', 'home');

Template.home.jobs = function () {
	return Jobs.find({});
};

Template.home.isMine = function() {
	return this.owner === Meteor.userId();
};

Template.showJob.getJob = function() {
	return Session.get('job');
};

Template.showJob.formatDate = function(date) {
	return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
};

Template.home.events({
	'click #newJob': function(e) {
		Session.set('page', 'newJob');
	},
	'click .deleteJob': function(e) {
		Meteor.call('deleteJob', this._id);
	},
	'click .showJob': function(e) {
		var id = e.target.getAttribute('data-id');
		Session.set('page', 'showJob');
		Session.set('job', Jobs.findOne({_id: id}));
	}
});
Template.showJob.events({
	'click .back': function(e) {
		Session.set('page', 'home');
	}
});

Template.newJob.events({
	'click .back': function(e) {
		Session.set('page', 'home');
	},
	'click #addNewJob': function(e) {
		Meteor.call('addJob', {
			name: $('#name').val(),
			role: $('#role').val(),
			description: $('#description').val()
		});
		Session.set('page', 'home');
	}
});

Template.router.pageIs = function (page) {
  return Session.get('page') === page;
};


