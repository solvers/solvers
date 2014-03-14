Meteor.publish("userData", function() {
  return Meteor.users.find({},
      {fields: {'profile': 1,
                'username': 1,
                'services.github.username': 1,
                'services.google.name': 1,
                'firstName': 1,
                'lastName': 1,
                'createdAt': 1}
      });
});

Meteor.methods({
    photoForUser: function(user, size) {
        size = size ? size : 300;
        user = Meteor.users.findOne({_id: user._id});
        var email = roles.getEmail(user);
        if (email) {
            var url = Gravatar.imageUrl(email) + '?s=300';
            if (url)
                return url;
        }
        else {
            throw new Meteor.Error(500, "could not create Gravatar address", "no user email(s) found");   
        }
    }
});

Accounts.config({
  sendVerificationEmail: !config.test, 
  forbidClientAccountCreation: false
});

Accounts.emailTemplates.siteName = 'Solvers.IO';
Accounts.emailTemplates.from = 'Solvers.IO Team <team@solvers.io>';
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return "Welcome to Solvers.IO";
};
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return "Please verify your email by clicking the following link:\n\n"
        + url;
};

//Fixes: https://github.com/solvers/solvers/issues/66
//See: https://github.com/meteor/meteor/issues/1369
Accounts.onCreateUser(function (options, user) {
  user.profile = options.profile ? options.profile : {};
  return user;
});
