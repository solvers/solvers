Projects = new Meteor.Collection('projects');

Tags.TagsMixin(Projects);
Projects.allowTags(function (userId, doc) {
	return roles.isAdmin() || userId === doc.owner;
});

Comments = new Meteor.Collection('comments');

Notifications = new Meteor.Collection('notifications');

Settings = new Meteor.Collection('settings');

Tasks = new Meteor.Collection('tasks');