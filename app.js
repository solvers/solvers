Projects = new Meteor.Collection('projects');
Tags.TagsMixin(Projects);
Projects.allowTags(function (userId) {
    // only allow if user is logged in
    return !!userId;
});
Comments = new Meteor.Collection('comments');
