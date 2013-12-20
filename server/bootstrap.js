Meteor.startup(function () {

	if(false) {
		Accounts.loginServiceConfiguration.remove({
		  service: "github"
		});
	}
  if(false) {
    Projects.remove({});
    Comments.remove({});
  }
  if (Projects.find().count() === 0) {
    var user = Meteor.users.findOne({id: this.userId});
    if(user) {
      Projects.insert({
        name: "Bob's project",
        role: "Documentation slave",
        description: "For this project you need to be a very fast writer",
        postedDate: new Date(),
        owner: "bobsuseridhash",
        user: "Bob Jones",
        contact: "bob@example.com"
      });
      var projectId = Projects.insert({
        name: "Data project",
        role: "Software programmer",
        description: "A very long project",
        postedDate: new Date(),
        owner: user._id,
        user: user.profile.name,
        contact: "davedx@gmail.com"
      });
      Comments.insert({
        body: "What does this project involve? I don't have a lot of time, and I *really* hate long projects.",
        owner: user._id,
        user: user.profile.name,
        postedDate: new Date(),
        parent: projectId
      });
      Comments.insert({
        body: "Am I talking to myself here? Just trying to help out and nobody will reply.",
        owner: user._id,
        user: user.profile.name,
        postedDate: new Date(),
        parent: projectId
      });
      Comments.insert({
        body: "Screw this, I'm gonna go contribute to Meteor instead.",
        owner: user._id,
        user: user.profile.name,
        postedDate: new Date(),
        parent: projectId
      });
      Comments.insert({
        body: "OK, that's your choice. It's a fun project, though!",
        owner: 'deadcow',
        user: 'Dead Cow',
        postedDate: new Date(),
        parent: projectId
      });
    }
  }
});