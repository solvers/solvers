Router.configure({
  layoutTemplate: 'app'
});

Router.map(function () {
  // Projects
  this.route('home', {
    path: '/',
    controller: HomeController
  });

  // Projects by tag
  this.route('tagged', {
    path: '/projects/tag/:_tag',
    controller: HomeController
  });

  // New project
  this.route('newProject', {
    path: '/projects/new' 
  });

  // Show project
  this.route('showProject', {
    path: '/projects/:_id',
    before:
      function() {
        this.subscribe('projects').wait();
        var project = Projects.findOne({_id: this.params._id});
        Session.set('project', project);
      }
  });

  // Edit profile
  this.route('profile', {
    path: '/profile',
    before: [
      function() {
        Session.set('profileUser', Meteor.userId());
      }
    ],
    data: function() {
      return Meteor.user();
    }
  });

  // Show profile
  this.route('userCard', {
    path:'/profile/:_id',
    before: [
      function() {
        Session.set('profileUser', this.params._id);
      }
    ],
    data: function() {
      return Meteor.users.findOne({ _id: this.params._id });
    }
  });

  // About
  this.route('about', {
    path: '/about'
  });

  // Contact
  this.route('contact', {
    path: '/contact'
  });

  // 404
  this.route('notFound', {
    path: '*'
  });

});