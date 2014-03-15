Template.comments.helpers({
  comments: function() {
    var comments = Comments.find({
      parent: this._id
    });
    return comments;
  },
  mayUpdate: function() {
    return roles.isAdmin() || this.owner === Meteor.userId();
  },
  formatLongDate: function(date) {
    if(!date)
        return '';
    return moment(date).format('MMM Do YYYY HH:mm');
  },
});

Template.comments.events({
  'mouseenter .comment': function(e) {
    $(e.currentTarget).find('.commentButtons').show();
  },
  'mouseleave .comment': function(e) {
    $(e.currentTarget).find('.commentButtons').hide();
  },
  'click #addNewComment': function(e) {
    e.preventDefault();
    if ($('#comment_body').val().length === 0) {
      $('#comment_error').show().text("Please enter a comment.");
      return;
    }
    Meteor.call('addComment',
      this._id, {
        body: $('#comment_body').val(),
        projectUser: this.owner
      }, function(err) {
        if (err) {
          $('#comment_error').show().text(err.reason);
        } else {
          $('#comment_error').hide();
          $('#comment_body').val('');
        }
      });
  },
  'click .editComment': function(e) {
    e.preventDefault();
    $('#comment_' + this._id).hide();
    $('#edit_comment_' + this._id).show();
  },
  'click .deleteComment': function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this comment?")) {
      Meteor.call('deleteComment',
        this._id, function(err) {
          if (err) alert(err.reason);
        });
    }
  },
  'click .cancelEditComment': function(e) {
    e.preventDefault();
    $('#comment_' + this._id).show();
    $('#edit_comment_' + this._id).hide();
  },
  'click .saveComment': function(e) {
    e.preventDefault();
    var body = $('#comment_body_' + this._id).val();
    Meteor.call('updateComment',
      this._id, body, function(err) {
        if (err) alert(err.reason);
      });
    $('#comment_' + this._id).show();
    $('#edit_comment_' + this._id).hide();
  }
});