Router.configure({
  layoutTemplate: 'app'
});

Router.map(function () {
  // Projects
  this.route('home', {
    path: '/',
    controller: HomeController,
    after: function() { GAnalytics.pageview('/'); },
    before: function() {
      this.subscribe('notifications').wait();
    }
  });

  // Notifications
  this.route('notifications', {
    path: '/notifications',
    after: function() { GAnalytics.pageview('/notifications'); }
  });

  // Projects by tag
  this.route('tagged', {
    path: '/projects/tag/:_tag',
    controller: HomeController,
    after: function() { GAnalytics.pageview('/projects/tag/' + this.params._tag); }
  });

  // New project
  this.route('newProject', {
    path: '/projects/new',
    after: function() { GAnalytics.pageview('/projects/new'); }
  });

  // Show project
  this.route('showProject', {
    path: '/projects/:_id',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    before:
      function() {
        this.subscribe('projects').wait();
        this.subscribe('comments').wait();
        this.subscribe('tasks').wait();
        this.subscribe('offers').wait();
      },
    data:
      function() {
        return Projects.findOne({_id: this.params._id});
      },
    waitOn: function() {
      return Meteor.subscribe('projects');
    },
    after: function() {
      GAnalytics.pageview('/projects/' + this.params._id);
      if (!Session.get(this.params._id)) {
        Meteor.call('addView', this.params._id, function(err) {
          if(err) {
            console.log(err.reason);
          }
        });
        Session.set(this.params._id, true);
      }
    }
  });

  // Edit profile
  this.route('profile', {
    path: '/profile',
    before: [
    function() {
      this.subscribe('projects').wait();
      this.subscribe('comments').wait();
      this.subscribe('settings').wait();
      this.subscribe('tasks').wait();
      this.subscribe('offers').wait();
      Session.set('profileUser', Meteor.userId());
    }
    ],
    data: function() {
      return Meteor.user();
    },
    after: function() { GAnalytics.pageview('/profile'); }
  });

  // Show profile
  this.route('userCard', {
    path:'/profile/:_id',
    before: [
    function() {
      this.subscribe('projects').wait();
      this.subscribe('comments').wait();
      this.subscribe('tasks').wait();
      this.subscribe('offers').wait();
      Session.set('profileUser', this.params._id);
    }
    ],
    data: function() {
      return Meteor.users.findOne({ _id: this.params._id });
    },
    after: function() { GAnalytics.pageview('/profile/' + this.params._id); }
  });

  // Admin stats
  this.route('stats', {
    path:'/stats',
    waitOn: function() {
      return [
      this.subscribe('projects'),
      this.subscribe('comments'),
      this.subscribe('tasks'),
      this.subscribe('offers')];
    },
    after: function() { GAnalytics.pageview('/stats'); }
  });

  // About
  this.route('about', {
    path: '/about',
    after: function() { GAnalytics.pageview('/about'); }
  });

  // Contact
  this.route('contact', {
    path: '/contact',
    after: function() { GAnalytics.pageview('/contact'); }
  });

  // 404
  this.route('notFound', {
    path: '*',
    after: function() { GAnalytics.pageview('/404'); }
  });

});
