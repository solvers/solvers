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
	},
	mayUpdateProject: function() {
		return roles.isAdmin() || Session.get('project').owner === Meteor.userId();
	}
});

var updateProject = function(tuple) {
	tuple['_id'] = Session.get('project')._id;
	Meteor.call('updateProject', tuple, function(err) {
		if(err) alert(err.reason);
	});
};

Template.showProject.events({
	'click #project_description_p': function(e) {
		e.preventDefault();
		if($('#project_description_p').hasClass('editable_false')) return;
		$('#project_description').show();
		$('#project_description_p').hide();
	},
	'blur #project_description': function(e) {
		e.preventDefault();
		updateProject({description: $('#project_description').val()});
		$('#project_description_p').show();
		$('#project_description').hide();
	},
	'blur #project_name': function(e) {
		e.preventDefault();
		updateProject({name: $('#project_name').html()});
	},
	'blur #project_role': function(e) {
		e.preventDefault();
		updateProject({role: $('#project_role').html()});
	},
	'blur #project_contact_name': function(e) {
		e.preventDefault();
		updateProject({contact_name: $('#project_contact_name').html()});
	},
	'blur #project_contact_email': function(e) {
		e.preventDefault();
		updateProject({contact_email: $('#project_contact_email').html()});
	},
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
	'click .deleteComment': function(e) {
		e.preventDefault();
		if(confirm("Are you sure you want to delete this comment?")) {
			Meteor.call('deleteComment',
				this._id, function(err) {
					if(err) alert(err.reason);
				});
		}
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