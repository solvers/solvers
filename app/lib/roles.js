// Role checking is used on server and client side
roles = (function() {
	var admins = {
		"richardsmith404@gmail.com": true, /* Richard Smith */
		"davedx@gmail.com": true /* Dave Clayton */
	};

	var getEmail = function(verify) {
		var user = Meteor.user();
		// first try email from regular signup
		if(user && user.emails && (verify && user.emails[0].verified))
			return user.emails[0].address;
		// then try 3rd party service email(s)
		if(user && user.services) {
			if (user.services.github)
				return user.services.github.email;
			if (user.services.google)
				return user.services.google.email;
		}
		return '';
	};

	return {
		isAdmin: function() {
			var email = getEmail(true);
			return admins[email] === true;
		},
		username: function (user) {
			if (user) {
				if (user.profile && user.profile.name) {
					return user.profile.name;
				}
				if(user.profile && user.profile.firstName) {
		      return (user.profile.firstName || '') + " " + (user.profile.lastName || '');
				}
				if (user.username) {
					return user.username;
				}
			}
			return "Unknown";
		},
		getEmail: function() {
			return getEmail(false);
		}
	}
})();
