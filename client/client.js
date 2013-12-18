var projectsHandle = Meteor.subscribe('projects', function() {
});
Meteor.subscribe('comments', function() {
});

var admins = [
	"richardsmith404@gmail.com", /* Richard Smith */
	"davedx@gmail.com", /* Dave Clayton */
];

var isAdmin = function() {
	if(Meteor.user() && Meteor.user().emails) {
		return Meteor.user().emails[0].verified && _.find(admins, function(email) { return Meteor.user().emails[0].address === email });
	}
	return false;
};

Template.header.rendered = function() {
   $('a[rel=tooltip]').tooltip() //initialize all tooltips in this template
};

Template.header.events({
	'click #logout': function(e) {
		Meteor.logout();
	}
})

Template.home.helpers({
	projects: function() {
		return Projects.find({});
	},
	mayRemove: function() {
		return isAdmin() || this.owner === Meteor.userId();
	},
	loading: function() {
		return !projectsHandle.ready();
	},
	noUser: function() {
		return !Meteor.user();
	},
	formatDate: function(date) {
		if(!date)
			return '';
		return moment(date).format('MMM Do YYYY');
	}
});

Template.home.events({
	'click .deleteProject': function(e) {
		Meteor.call('deleteProject', this._id);
	}
});

Accounts.ui.config({
  requestPermissions: {
    github: ['user:email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

// Animated scrollto
$("#nav ul li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(this.hash).offset().top
     }, 300, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});
