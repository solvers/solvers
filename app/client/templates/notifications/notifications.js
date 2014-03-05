Template.notifications.helpers({
  loggedin: function() {
    return !!Meteor.user();
  },
  notifications: function(){
    return Notifications.find({userId: Meteor.userId()}, {sort: {timestamp: -1, read: -1}}).fetch();
  },
  notification_count: function(){
    var count = Session.get('notifications').length;
    if(count==0){
		  return 'No unread notifications';
	  } else if(count==1){
		  return '1 unread notification';
	  } else{
		  return count + ' unread notifications';
	  }
  }
});

Template.notifications.events({
	'click .notifications-toggle': function(e){
    e.preventDefault();
		$('body').toggleClass('notifications-open');
	},
	'click .mark-as-read': function(){
    Meteor.call('markAllNotificationsAsRead', 
      function(error, result){
        error && console.log(error);
      }
    );
	}
})
