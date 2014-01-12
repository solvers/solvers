
Template.profile.rendered = function() {
  return $('#bio').keydown(function(event) {
    if (event.keyCode === 13) {
      return $('#bio').blur();
    }
  });
};

Template.profile.helpers({
  loggedIn: function() {
    return !!Meteor.user();
  },
  email: function() {
    if (Meteor.user().emails != null) {
      return Meteor.user().emails[0].address;
    }
  },
  firstName: function() {
    return Meteor.user().profile.firstName;
  },
  lastName: function() {
    return Meteor.user().profile.lastName;
  },
  username: function() {
    return Meteor.user().username;
  },
  organization: function() {
    return Meteor.user().profile.organization;
  },
  location: function() {
    return Meteor.user().profile.location;
  },
  bio: function() {
    return Meteor.user().profile.bio;
  },
  url: function() {
    return Meteor.user().profile.url;
  },
  googlePlusUrl: function() {
    return Meteor.user().profile.googlePlusUrl;
  },
  twitterHandle: function() {
    return Meteor.user().profile.twitterHandle;
  }
});

Template.profile.events({
  'change #email': function(event) {
    return Meteor.call('changeEmail', Meteor.userId(), $(event.target).val());
  },
  'change #firstName': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.firstName': $(event.target).val()
      }
    });
  },
  'change #lastName': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.lastName': $(event.target).val()
      }
    });
  },
  'change #username': function(event) {
    return Meteor.call('changeUsername', 
      Meteor.userId(),
      $(event.target).val());
  },
  'change #organization': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.organization': $(event.target).val()
      }
    });
  },
  'change #location': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.location': $(event.target).val()
      }
    });
  },
  'change #bio': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.bio': $(event.target).val()
      }
    });
  },
  'change #url': function(event) {
    var url;
    url = $(event.target).val();
    if (!url.match(/^http/) && !url.match(/^https/) && url !== '') {
      url = 'http://' + url;
    }
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.url': url
      }
    });
  },
  'change #googlePlusUrl': function(event) {
    var url;
    url = $(event.target).val();
    if (!url.match(/^http/) && !url.match(/^https/) && url !== '') {
      url = 'http://' + url;
    }
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.googlePlusUrl': url
      }
    });
  },
  'change #twitterHandle': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.twitterHandle': $(event.target).val()
      }
    });
  },
  'click .done': function() {
    if (Meteor.user().profile.firstName) {
      return Router.go('/profile');
    } else {
      return $('.errors').text('First name is required.');
    }
  }
});