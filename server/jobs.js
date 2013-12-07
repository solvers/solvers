Meteor.publish('jobs', function() {
	return Jobs.find({});
});

Meteor.methods({
	addJob: function(job) {
		check(job.name, String);
		check(job.role, String);
		check(job.description, String);
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new job.");
		Jobs.insert({
			name: job.name,
			description: job.description,
			role: job.role,
			owner: this.userId
		});
		return true;
	},
	deleteJob: function(id) {
		//TODO: check is owner!!!
		Jobs.remove({_id: id});
		return true;
	}
});
