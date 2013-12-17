var projectsHandle = Meteor.subscribe('projects', function() {
});
Meteor.subscribe('comments', function() {
});

Session.set('page', 'home');

// really want to make this better, but we don't seem to have stored email addresses in the user document
var admins = [
	"Y7Mpvx8CKHk987mov", /* Dave Clayton: solvers.meteor.com */
	"soR3Bmi3knaLFpB2a", /* Dave Clayton: Dave localhost */
];

var isAdmin = function() {
	//console.log("user: ", Meteor.user());
	return _.find(admins, function(id) { return Meteor.userId() === id });
};

Template.home.projects = function () {
	return Projects.find({});
};

Template.home.mayRemove = function() {
	return isAdmin() || this.owner === Meteor.userId();
};

Template.home.loading = function () {
  return !projectsHandle.ready();
};

Template.showProject.getProject = function() {
	return Session.get('project');
};

Template.showProject.formatDate = function(date) {
	return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
};

Template.home.events({
	'click #newProject': function(e) {
		Session.set('page', 'newProject');
	},
	'click .deleteProject': function(e) {
		Meteor.call('deleteProject', this._id);
	},
	'click .showProject': function(e) {
		var id = e.target.getAttribute('data-id');
		Session.set('page', 'showProject');
		var project = Projects.findOne({_id: id});
		Session.set('project', project);
	}
});

Template.showProject.comments = function() {
	var project = Session.get('project');
	var comments = Comments.find({parent: project._id});
	return comments;
};

Template.showProject.isOwner = function() {
	return this.owner === Meteor.userId();
};

Template.showProject.events({
	'click .back': function(e) {
		Session.set('page', 'home');
	},
	'click #addNewComment': function(e) {
		e.preventDefault();
		Meteor.call('addComment',
			Session.get('project')._id,	{
				body: $('#comment_body').val()
			});
	},
	'click .editComment': function(e) {
		e.preventDefault();
		console.log("editing "+this._id);
		$('#comment_' + this._id).hide();
		$('#edit_comment_' + this._id).show();
	},
	'click .cancelEditComment': function(e) {
		e.preventDefault();
		$('#comment_' + this._id).show();
		$('#edit_comment_' + this._id).hide();
	},
	'click .saveComment': function(e) {
		e.preventDefault();
		this.body = $('#comment_body_' + this._id).val();
		Meteor.call('updateComment', 
			this);
	}
});

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

Template.router.pageIs = function (page) {
  return Session.get('page') === page;
};

Accounts.ui.config({
  requestPermissions: {
    github: ['user:email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

