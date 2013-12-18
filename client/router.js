Meteor.Router.add({
  "/": "home",
  "/projects/new": "newProject",
  "/projects/:_id": {
    to: "showProject",
    and: function(id) {
      var project = Projects.findOne({_id: this.params._id});
      Session.set('project', project);
    }
  }
});