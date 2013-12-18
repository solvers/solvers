Template.userCard.helpers({
  name: function() {
    return "" + this.profile.firstName + " " + this.profile.lastName;
  },
  photo: function() {
    return Gravatar.imageUrl(Meteor.user().emails[0].address) + '?s=200'
  },
  subhead: function() {
    if (this.profile.organization && this.profile.location) {
      return [this.profile.organization, this.profile.location].join(' - ');
    } else {
      if (this.profile.organization) {
        return this.profile.organization;
      }
      if (this.profile.location) {
        return this.profile.location;
      }
    }
  },
  bio: function() {
    return this.profile.bio;
  },
  url: function() {
    return this.profile.url;
  },
  googlePlusUrl: function() {
    return this.profile.googlePlusUrl;
  },
  twitterHandle: function() {
    return this.profile.twitterHandle;
  }
});
