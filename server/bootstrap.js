Meteor.startup(function () {

	if(false) {
		Accounts.loginServiceConfiguration.remove({
		  service: "github"
		});
	}

  if (Jobs.find().count() === 0) {
    Jobs.insert({
      name: "Data project",
      description: "A very long project",
      contact: "davedx@gmail.com"
    });
  }
});