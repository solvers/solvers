Meteor.startup(function () {
  if(Meteor.settings.test) {
    console.log("Test mode. Clearing database");
    Comments.remove({});
    Projects.remove({});
    Meteor.users.remove({});

    // create fake project to test navigation
    Projects.insert({
      name: "Bob's project",
      role: "Documentation slave",
      description: "For this project you need to be a very fast writer",
      postedDate: new Date(),
      owner: "bobsuseridhash",
      user: "Bob Jones",
      contact: "bob@example.com"
    });
  }

  //Fix for orphaned users with no profile
  var noProfileCount = Meteor.users.find({profile: { $exists: false}}).fetch().length;
  //console.log("Counted "+noProfileCount+" users with no profile.");
  if(noProfileCount > 0) {
    console.log("Fixing users with no profile...");
    Meteor.users.update(
      { profile: { $exists: false } }, { $set: { profile: {} } }, { multi: true }
      );
    var noProfileCount2 = Meteor.users.find({profile: { $exists: false}}).fetch().length;
    console.log("Now: counted "+noProfileCount2+" users with no profile.");
  }

  //Migrate projects
  Projects.update({status: {$exists: false}}, {$set: {status: "ready"}}, {multi: true});

  //Migrate usernames
  //TODO: make new users always set username on their profile
  var users = Meteor.users.find().fetch();
  _.each(users, function(user) {
    var username = user.profile.username;
    if(!username) {
      if(user.services && user.services.github && user.services.github.username) {
        username = user.services.github.username;
      } else if(user.services && user.services.google && user.services.google.name) {
        username = user.services.google.name;
      } else if(user.username) {
        username = user.username;
      }
      if(username) {
        Meteor.users.update(user._id, {$set: {"profile.username": username }});

        console.log(JSON.stringify(Meteor.users.find().fetch()));
      }
    }
    var name = user.profile.name;
    if(!name) {
      if(user.profile.firstName && user.profile.lastName) {
        name = user.profile.firstName + ' ' + user.profile.lastName;
      } else if (user.profile.username) {
        name = user.profile.username;
      }
      if(name) {
        Meteor.users.update(user._id, {$set: {"profile.name": name}});
      }
    }
  });

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