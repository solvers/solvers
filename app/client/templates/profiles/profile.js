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
  },
  sendEmailsChecked: function() {
    var sendEmail = Settings.findOne(
      {userId: Meteor.userId(),
        setting: 'sendEmail'});
    if (sendEmail) {
      return sendEmail.value ? 'checked' : '';
    }
  }
});

Template.profile.events({
  'blur #email': function(event) {
    return Meteor.call('changeEmail', Meteor.userId(), $(event.target).val());
  },
  'blur #firstName': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.firstName': $(event.target).val()
      }
    });
  },
  'blur #lastName': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.lastName': $(event.target).val()
      }
    });
  },
  'blur #username': function(event) {
    return Meteor.call('changeUsername', 
      Meteor.userId(),
      $(event.target).val());
  },
  'blur #organization': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.organization': $(event.target).val()
      }
    });
  },
  'blur #location': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.location': $(event.target).val()
      }
    });
  },
  'blur #bio': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.bio': $(event.target).val()
      }
    });
  },
  'blur #url': function(event) {
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
  'blur #googlePlusUrl': function(event) {
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
  'blur #twitterHandle': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.twitterHandle': $(event.target).val().replace("@","");
      }
    });
  },
  'click .done': function() {
    if (Meteor.user().profile.firstName) {
      return Router.go('/profile');
    } else {
      return $('.errors').text('First name is required.');
    }
  },
  'click #setEmailNotification': function(event) {
    Meteor.call('setEmailNotification', event.target.checked);
  }
});
