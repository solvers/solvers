Meteor.publish('comments', function() {
	return Comments.find({});
});

Meteor.methods({
	addComment: function(jobId, comment) {
		//TODO: validate comment
		//check(job.name, String);
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		var username = Meteor.user().profile.name;
		Comments.insert({
			body: comment.body,
			parent: jobId,
			owner: this.userId,
			user: username
		});
		return true;
	},
	updateComment: function(comment) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		Comments.update({_id: comment._id},
			{ $set: {
				body: comment.body
			}
		});
		return true;
	},
	deleteComment: function(id) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		//TODO: check is owner!!!
		Comments.remove({_id: id});
		return true;
	}
});
