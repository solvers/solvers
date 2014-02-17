Template.editProject.helpers({
  project: function() {
    return Session.get('project');
  },
  tags: function() {
    tags = Session.get('project').tags;
    if (tags) return tags.join();
    else return "";
  }
});

Template.editProject.events({
    'click .back': function(e) {
        Session.set('page', 'home');
    },
    'click #project-save-btn': function(e) {
        console.log($('#innerEditor').val());
        e.preventDefault();
        var tags = $('#tags').val().length > 0 ? $('#tags').val().split(',') : null;
        updateProject({
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
    tuple['_id'] = Session.get('project')._id;
    Meteor.call('updateProject', tuple, function(err) {
        if(err) {
            $('#project_error').show().text(err.reason);
        } else {
            $('#project_error').hide();
        }
    });
};
