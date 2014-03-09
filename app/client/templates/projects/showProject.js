Template.showProject.rendered = function() {
    $('table').addClass('table table-striped table-bordered table-hover');
    $('#project_tabs').tab();
    $('#project_tabs a').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        $('#project_tabs li').removeClass('active');
        $(this).parent().addClass('active');
        $('.tab-pane').hide();
        $(id).show();
    });
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
    },
    hasOffered: function() {
        if (Meteor.user()) {
            var o = Offers.findOne({ userId: Meteor.userId() });
            return !!o;
        }
    }
});

Template.showProject.events({
    'click .open-signup': function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#login-dropdown-list .dropdown-toggle').dropdown('toggle');
    },
    'click a': function(e) {
        // always follow links
        e.stopPropagation();
    },
    'click .offer-help-btn': function(e) {
        e.preventDefault();
        $('#offer-help-modal').modal('show');
    },
    'click .project-status a': function(e) {
        Meteor.call('updateProjectStatus',
            {id: this._id, status: e.target.className},
            function(err) {
                if(err) console.error(err);
            });
        e.preventDefault();
    },
    'click .project-edit-btn': function(e) {
        Session.set('editing', true);
    },
    'click .tags .btn-group .btn': function(e) {
        e.preventDefault();
        Router.go('/projects/tag/' + $(e.target).text());
    }
});