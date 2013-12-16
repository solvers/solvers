Meteor.publish('projects', function() {
	return Projects.find({});
});

Meteor.methods({
	addProject: function(project) {
		check(project.name, String);
		check(project.role, String);
		check(project.description, String);
		if(!this.userId)
			throw new Meteor.Error(403, "Please log in to post a new project.");
		Projects.insert({
			name: project.name,
			postedDate: new Date(),
			role: project.role,
			description: project.description,
			owner: this.userId
		});
		return true;
	},
	deleteProject: function(id) {
		//TODO: check is owner!!!
		Projects.remove({_id: id});
		return true;
	}
});
