Meteor.startup(function () {

	if(false) {
		Accounts.loginServiceConfiguration.remove({
		  service: "github"
		});
	}
  if(true) {
    Jobs.remove({});
    Comments.remove({});
  }
  if (Jobs.find().count() === 0) {
    var user = Meteor.users.findOne({id: this.userId});
    var jobId = Jobs.insert({
      name: "Data project",
      role: "Software programmer",
      description: "A very long project",
      postedDate: new Date(),
      owner: this.userId,
      contact: "davedx@gmail.com"
    });
    Comments.insert({
      body: "What does this project involve? I don't have a lot of time, and I *really* hate long projects.",
      owner: this.userId,
      user: user.profile.name,
      parent: jobId
    });
    Comments.insert({
      body: "Am I talking to myself here? Just trying to help out and nobody will reply.",
      owner: this.userId,
      user: user.profile.name,
      parent: jobId
    });
    Comments.insert({
      body: "Screw this, I'm gonna go contribute to Meteor instead.",
      owner: this.userId,
      user: user.profile.name,
      parent: jobId
    });
  }
});