Template.header.rendered = function() {
  $("[rel=tooltip]").tooltip({ placement: 'bottom'});
}

Template.header.helpers({
  notificationCount: function() {
	  if (Meteor.user && Notifications) {
		  var notifs = Notifications.find({userId: Meteor.userId(), read: false}, 
                                      {sort: {timestamp: -1}}).fetch();
      Session.set('notifications', notifs);
      return notifs.length;
    }
  }
});

Template.header.events({
	'click #gotoNotifications': function(e) {
		e.preventDefault();
		Router.go('notifications');
	}
})