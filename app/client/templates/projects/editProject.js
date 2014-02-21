Template.editProject.helpers({
  tags: function() {
    tags = this.tags;
    if (tags) return tags.join();
    else return "";
  }
});

Template.editProject.events({
    'click .back': function(e) {
        Session.set('page', 'home');
    },
    'click #project-save-btn': function(e) {
        e.preventDefault();
        var tags = $('#tags').val().length > 0 ? $('#tags').val().split(',') : null;
        updateProject({
            _id: this._id,
            name: $('#name').val(),
            role: $('#role').val(),
            description: $('#wmd-input').val(),
            contact_name: $('#contact_name').val(),
            contact_email: $('#contact_email').val(),
            tags: tags
        });
        Session.set('editing', false);
    }
});

Template.editProject.rendered = function() {
    Session.set('description', this.description);
}

Template.editProject.destroyed = function() {
    Session.set('description', null);
    Session.set('editing', false);
}

var updateProject = function(tuple) {
    Meteor.call('updateProject', tuple, function(err) {
        if(err) {
            $('#project_error').show().text(err.reason);
        } else {
            $('#project_error').hide();
        }
    });
};
