Meteor.publish('comments', function() {
	return Comments.find({}, {sort: [["postedDate", "asc"]]});
});

Meteor.methods({
	addComment: function(projectId, comment) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		check(comment.body, String);
		var username = Meteor.user().profile.name;
		Comments.insert({
			postedDate: new Date(),
			body: comment.body,
			parent: projectId,
			owner: this.userId,
			user: username
		});
		return true;
	},
	updateComment: function(id, body) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		var comment = Comments.findOne({_id: id});
		if(!roles.isAdmin() && this.userId !== comment.owner)
			throw new Meteor.Error(403, "You are not the owner of this comment.");
		check(body, String);
		Comments.update(id,
			{ $set: {
				body: body
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
