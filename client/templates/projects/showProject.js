Template.showProject.helpers({
	getProject: function() {
		return Session.get('project');
	},
	formatDate: function(date) {
		if(!date)
			return '';
		return moment(date).format('MMM Do YYYY');
	},
	formatLongDate: function(date) {
		if(!date)
			return '';
		return moment(date).format('MMM Do YYYY HH:mm');
	},
	comments: function() {
		var project = Session.get('project');
		if(!project)
			return [];
		var comments = Comments.find({parent: project._id});
		return comments;
	},
	mayUpdate: function() {
		return roles.isAdmin() || this.owner === Meteor.userId();
	}
});

Template.showProject.events({
	'click #addNewComment': function(e) {
		e.preventDefault();
		Meteor.call('addComment',
			Session.get('project')._id,	{
				body: $('#comment_body').val()
			});
		$('#comment_body').val('');
	},
	'click .editComment': function(e) {
		e.preventDefault();
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
		var body = $('#comment_body_' + this._id).val();
		Meteor.call('updateComment', 
			this._id, body, function(err) {
				if(err) alert(err.reason);
			});
		$('#comment_' + this._id).show();
		$('#edit_comment_' + this._id).hide();
	}
});