Meteor.publish("notifications", function () {
  return Notifications.find({ userId: this.userId }); // only this user
});

getUnsubscribeLink = function(user){
  return Meteor.absoluteUrl()+'notifications/'+user._id;
};

createNotification = function(options) {
  var event = options.event,
      properties = options.properties,
      userToNotify = options.userToNotify,
      userDoingAction = options.userDoingAction,
      sendEmail = options.sendEmail;

  var notification = {
    timestamp: new Date().getTime(),
    userId: userToNotify,
    event: event,
    properties: properties,
    read: false
  }
  var newNotificationId = Notifications.insert(notification, function(err, id) {
    if (err)
      console.log('error inserting notification: ' + err);
  });
  // send the notification if notifications are activated,
  // the notificationsFrequency is set to 1, or if it's undefined (legacy compatibility)
  if(sendEmail){
    // get specific notification content for "email" context
    var contents = getNotificationContents(notification, 'email');     
    sendNotification(contents);
  }
}

Meteor.methods({
  unsubscribeUser : function(id){
    // TODO: currently, if you have somebody's email you can unsubscribe them
    // A user-specific salt should be added to the hashing method to prevent this
    var user = Meteor.users.findOne({_id: id});
    if(user){
      var update = Meteor.users.update(user._id, {
        $set: {
          'profile.notifications.users' : 0,
          'profile.notifications.projects' : 0,
          'profile.notifications.comments' : 0,
          'profile.notifications.replies' : 0
        }
      });
      return true;
    }
    return false;
  },
  newProjectNotify : function(properties){
    var currentUser = Meteor.users.findOne(this.userId);
    // send a notification to every user according to their notifications settings
    Meteor.users.find().forEach(function(user) {
      // don't send users notifications for their own projects
      if(user._id !== currentUser._id && getUserSetting('notifications.projects', false, user)){
        properties.userId = user._id;
        var notification = getNotificationContents(properties, 'email');
        sendNotification(notification, user);
      }
    });
  },
  markNotificationAsRead : function(notificationId) {
    console.log('marking as read: ' + notificationId);
    var notification = Notifications.findOne({ _id: notificationId });
    if (notification.owner == this.userId()) {
      Notifications.update(
        {_id: notificationId},
        { $set:{ read: true } },
        function(error, result){
          if(error){
            console.log(error);
          } 
        }
      );
    }
  }
});

sendNotification = function (notification) {
  sendEmail(notification.to, notification.subject, notification.text, notification.html);
}