var usersHandle = Meteor.subscribe("userData");

Template.userCard.helpers({
  fullname: function() {
    if (this.profile) {
      return (this.profile.firstName || '') + " " + (this.profile.lastName || '');
    }
  },
  loading: function() {
    return !usersHandle.ready();
  },
  username: function() {
    return this.username;
  },
  photo: function() {
    var photo = Session.get('photo');
    var thisUser = Session.get('profileUser');
    if (photo && Session.equals('photoUser', thisUser))
      return photo;    
    Meteor.call('photoForUser', this, function(e, r) {
      if (!!e) {
        // console.log(e);
      } else {
        Session.set('photoUser', thisUser);
        Session.set('photo', r);
      }
    });
  },
  subhead: function() {
    if (this.profile) {
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
    }
  },
  bio: function() {
    if (this.profile)
      return this.profile.bio;
  },
  url: function() {
    if (this.profile)
      return this.profile.url;
  },
  googlePlusUrl: function() {
    if (this.profile)
      return this.profile.googlePlusUrl;
  },
  twitterHandle: function() {
    if (this.profile)
      return this.profile.twitterHandle;
  },
  projects: function() {
    return Projects.find({owner: this._id}, {limit: 10});
  },
  contributions: function() {
    // collect the different types of contributions
    var contribs = new Array();
    // comments
    var comments = Comments.find({owner: this._id}, {limit: 10});
    comments.forEach(function(element, index, array) {
      element.type = "comment";
      element.snippet = '"' + element.body.substring(0, 25) + '..."';
      element.projectname = Projects.findOne({_id: element.parent}).name;
      contribs[contribs.length] = element;
    });
    contribs.sort(function(a, b){
      a.postedDate - b.postedDate;
    });
    return contribs;
  },
  formatDate: function(date) {
    if(!date)
      return '';
    return moment(date).format('MMM Do YYYY');
  }
});
