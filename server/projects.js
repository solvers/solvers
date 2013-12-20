Meteor.publish('projects', function() {
	return Projects.find({archived: { $nin: [1] }}, {sort: [["postedDate", "desc"]]})
});

Meteor.methods({
	addProject: function(project) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please register and log in to post a new project.");
		check(project.name, String);
		check(project.role, String);
		check(project.description, String);
		return Projects.insert({
			name: project.name,
			postedDate: new Date(),
			role: project.role,
			description: project.description,
			owner: this.userId
		});
	},
	deleteProject: function(id) {
		if(!this.userId)
			throw new Meteor.Error(403, "Please sign in to remove a project.");
		var project = Projects.findOne(id);
		if(!roles.isAdmin() && this.userId !== project.owner)
			throw new Meteor.Error(403, "You are not the owner of this project.");
		Projects.update({_id: id}, {$set: {archived: 1}});
		return true;
	}
});
