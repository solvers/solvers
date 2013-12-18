Template.showProject.helpers({
	getProject: function() {
		return Session.get('project');
	},
	formatDate: function(date) {
		return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
	},
	comments: function() {
		var project = Session.get('project');
		var comments = Comments.find({parent: project._id});
		return comments;
	},
	isOwner: function() {
		return this.owner === Meteor.userId();
	}
});

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