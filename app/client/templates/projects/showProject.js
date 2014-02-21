Template.showProject.rendered = function() {
    $('table').addClass('table table-striped table-bordered table-hover');
}

Template.showProject.destroyed = function() {
    Session.set('project', null);
}

Template.showProject.helpers({
    formatDate: function(date) {
        if(!date)
            return '';
        return moment(date).format('MMM Do YYYY');
    },
    formatLongDate: function(date) {
        if(!date)
            return '';
        return moment(date).format('MMM Do YYYY HH:mm');
    },
    comments: function() {
        var comments = Comments.find({parent: this._id});
        return comments;
    },
    mayUpdate: function() {
        return roles.isAdmin() || this.owner === Meteor.userId();
    },
    mayUpdateProject: function() {
        return roles.isAdmin() || this.owner === Meteor.userId();
    },
    editing: function() {
        return Session.get('editing');
    }
});

Template.showProject.events({
    'click a': function(e) {
        // always follow links
        e.stopPropagation();
        return;
    },
    'click .project-edit-btn': function(e) {
        Session.set('editing', true);
    },
    'click .tags .btn-group .btn': function(e) {
        e.preventDefault();
        Router.go('/projects/tag/' + $(e.target).text());
    },
    'click #addNewComment': function(e) {
        e.preventDefault();
        Meteor.call('addComment',
            this._id, {
                body: $('#comment_body').val()
            }, function(err) {
                if(err) {
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
        if(confirm("Are you sure you want to delete this comment?")) {
            Meteor.call('deleteComment',
                this._id, function(err) {
                    if(err) alert(err.reason);
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
                if(err) alert(err.reason);
            });
        $('#comment_' + this._id).show();
        $('#edit_comment_' + this._id).hide();
    }
});