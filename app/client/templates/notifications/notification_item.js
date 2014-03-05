Template.notification_item.helpers({
  nice_time: function(){
    return moment(this.timestamp).fromNow();
  },
  properties: function(){
    return this.properties;
  },
  notificationHTML: function(){
    return getNotificationContents(this).html;
  },
  notificationId: function() {
    return this._id;
  }
});

Template.notification_item.events({
  'click .mark-read': function(event, instance){
    var notificationId=instance.data._id;
    console.log(notificationId);
    Meteor.call('markNotificationAsRead', notificationId);
  }
});