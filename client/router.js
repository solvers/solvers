Router.configure({
  layoutTemplate: 'app'
});

Router.map(function () {
  // Landing/lead capture page
  // this.route('landing', {
  //   path: '/',
  //   layoutTemplate: 'landing_layout'
  // });

  // Projects
  this.route('home', {
    path: '/',
    before: 
      function() {
        Session.set('projects_tag', '');
        this.subscribe('projects').wait();
      }
  });

  // Projects by tag
  this.route('tagged', {
    path: '/projects/tag/:_tag',
    before: [
      function() {
        Session.set('projects_tag', this.params._tag);
      }
    ]
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