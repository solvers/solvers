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
		// only notify if they aren't commenting on their own project
		var projectUser = Projects.findOne({ _id: projectId }).owner;
		console.log(projectUser);
		if(projectUser != this.userId){
			// populate remaining properties for notification
			p.projectId = projectId;
			p.projectName = Projects.findOne({ _id: projectId }).title;
			p.commentId = commentId;
			p.commentAuthorName = username;
			p.commentAuthorId = this.userId;
			// send
            createNotification({
              event: 'newComment',
              properties: p,
              userToNotify: projectUser,
              userDoingAction: this.userId,
              sendEmail: true
              // sendEmail: getUserSetting('notifications.comments', false, projectUser)
            });
          }
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
