Meteor.publish('tasks', function() {
	return Tasks.find();
});

Meteor.methods({
	addOrUpdateTask: function(projectId, task) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new comment.");
		
		check(task.name, String);
		check(task.description, String);
		check(task.assigned, String);

		var username = roles.username(Meteor.user());
		var assigned_user = Meteor.users.findOne({username: task.assigned});
		if(!assigned_user)
			throw new Meteor.Error(403, "Assigned user not found.");

		var attrs = {
			parent: projectId,
			owner: this.userId,
			name: task.name,
			description: task.description,
			assigned: assigned_user._id,
			assigned_username: task.assigned,
			status: 'open'
		};

		if(task.id) {
			Tasks.update(task.id, attrs);
		} else {
			Tasks.insert(attrs);
		}
		return true;
	},
	closeTask: function(id) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in.");

		var task = Tasks.findOne({_id: id});
		if(!roles.isAdmin() && this.userId !== task.owner)
			throw new Meteor.Error(403, "You are not the owner of this task.");

		Tasks.update({_id: id}, {$set: {status: 'closed'}});
		return true;
	}
});
