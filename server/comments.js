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
	deleteComment: function(id) {
		//TODO: check is owner!!!
		Comments.remove({_id: id});
		return true;
	}
});
