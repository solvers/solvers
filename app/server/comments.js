Meteor.publish('comments', function() {
	return Comments.find({}, {sort: [["postedDate", "asc"]]});
});

Meteor.methods({
	addComment: function(projectId, comment) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		check(comment.body, String);
		var username = roles.username(Meteor.user());
		var p = {
			postedDate: new Date(),
			body: comment.body,
			parent: projectId,
			owner: this.userId,
			user: username
		}
		var commentId = Comments.insert(p);
    createCommentNotification(p, commentId);
		return true;
	},
	updateComment: function(id, body) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		var comment = Comments.findOne({_id: id});
		if(!roles.isAdmin() && this.userId !== comment.owner)
			throw new Meteor.Error(403, "You are not the owner of this comment.");
		check(body, String);
		var username = roles.username(Meteor.user());
		Comments.update(id,
			{ $set: {
				body: body,
				user: username
			}
		});
		return true;
	},
	deleteComment: function(id) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");

		var comment = Comments.findOne({_id: id});
		if(!roles.isAdmin() && this.userId !== comment.owner)
			throw new Meteor.Error(403, "You are not the owner of this comment.");

		Comments.remove({_id: id});
		return true;
	}
});

var createCommentNotification = function(p, commentId) {
	// only notify if they aren't commenting on their own project
	var project = Projects.findOne({ _id: p.parent })
	var projectUser = project.owner;
	if(projectUser != p.owner){
		// populate remaining properties for notification
		p.projectId = p.parent;
		p.projectName = project.name;
		p.commentId = commentId;
		p.commentAuthorName = p.user;
		p.commentAuthorId = p.owner;
		// send
    createNotification({
      event: 'newComment',
      properties: p,
      userToNotify: projectUser,
      userDoingAction: p.owner,
      sendEmail: true
      // sendEmail: getUserSetting('notifications.comments', false, projectUser)
    });
  }
}