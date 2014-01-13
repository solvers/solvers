Meteor.publish("userData", function() {
  return Meteor.users.find({},
      {fields: {'profile': 1,
                'username': 1,
                'services.github.username': 1,
                'services.google.name': 1,
                'firstName': 1,
                'lastName': 1}
      });
});

Meteor.methods({
    photoForUser: function(user) {
        user = Meteor.users.findOne({_id: user._id});
        if (user.emails) {
            var url = Gravatar.imageUrl(user.emails[0].address) + '?s=300';
            if (url)
                return url;
        }
        else {
            throw new Meteor.Error(500, "could not create Gravatar address", "no user email(s) found");   
        }
    }
});

Accounts.config({
  sendVerificationEmail: true, 
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

// Borrowed from: https://gist.github.com/ondrej-kvasnovsky/6048353#file-oauth-js
// Accounts.onCreateUser(function (options, user) {
//     if (user.services) {
//         if (options.profile) {
//             user.profile = options.profile
//         }
//         var service = _.keys(user.services)[0];
//         var email = user.services[service].email;
//         if (!email) {
//             if (user.emails && user.emails.verified) {
//                 email = user.emails.address;
//             }
//         }
//         if (!email) {
//             email = options.email;
//         }
//         if (!email) {
//             // if email is not set, there is no way to link it with other accounts
//             return user;
//         }
//         // see if any existing user has this email address, otherwise create new
//         var existingUser = Meteor.users.findOne({'emails.address': email});
//         if (!existingUser) {
//             // check for email also in other services
//             var existingGitHubUser = Meteor.users.findOne({'services.github.email': email});
//             var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
//             var doesntExist = !existingGitHubUser && !existingGoogleUser;
//             if (doesntExist) {
//                 // add the email to profile and return the user
//                 // because there he doesn't exist in the DB yet
//                 user.emails = [];
//                 user.emails[0] = {
// 					address: email,
// 					verified: true
//                 };
//                 return user;
//             } else {
//                 existingUser = existingGitHubUser || existingGoogleUser;
//                 if (existingUser) {
//                     if (user.emails) {
//                         // user is signing in by email, we need to set it to the existing user
//                         existingUser.emails = user.emails;
//                     }
//                 }
//             }
//         }
//         // precaution, these will exist from accounts-password if used
//         if (!existingUser.services) {
//             existingUser.services = { resume: { loginTokens: [] }};
//         }
//         // copy accross new service info
//         existingUser.services[service] = user.services[service];
//         existingUser.services.resume.loginTokens.push(
//             user.services.resume.loginTokens[0]
//         );
//         // even worse hackery
//         Meteor.users.remove({_id: existingUser._id}); // remove existing record
//         return existingUser;    		      // record is re-inserted
//     }
// });

