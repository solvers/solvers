Template.comments.helpers({
  comments: function() {
      var comments = Comments.find({parent: this._id});
      return comments;
  },
  mayUpdate: function() {
      return roles.isAdmin() || this.owner === Meteor.userId();
  }
});

Template.comments.actions({


});