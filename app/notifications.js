Notifications.allow({
    insert: function() { return false; },
    update: false,
    remove: false,
})

getNotificationContents = function(notification, context){
  // the same notifications can be displayed in multiple contexts: on-site in the sidebar, sent by email, etc. 
  var event = notification.event,
      p = notification.properties,
      context = typeof context === 'undefined' ? 'sidebar' : context,
      userToNotify = Meteor.users.findOne({ _id: notification.userId });
  switch(event){
    case 'newReply':
      var projectURL = Router.routes['showProject'].url({_id: p.projectId});
      var n = {
        subject: 'Someone replied to your comment on "'+p.projectName+'"',
        text: p.commentAuthorName+' has replied to your comment on "'+p.projectName+'": ' + projectURL,
        html: '<p><a href="'+Router.routes['userCard'].url({_id: p.commentAuthorId})+'">'+p.commentAuthorName+'</a> replied to your comment on "<a href="'+ projectURL +'" class="action-link">'+p.projectName+'</a>"</p>'
      }
      break;

    case 'newComment':
      var projectURL = Router.routes['showProject'].url({_id: p.projectId});
      var n = {
        subject: 'A new comment on your project "'+p.projectName+'"',
        text: 'You have a new comment by '+p.commentAuthorName+' on your project "'+p.projectName+'": '+projectURL,
        html: '<p><strong><a href="'+Router.routes['userCard'].url({_id: p.commentAuthorId})+'">'+p.commentAuthorName+'</a> commented on your project "<a href="'+projectURL+'" class="action-link">'+p.projectName+'</a>"</strong></p>'
      }
      n.html = n.html + "<p class='snippet'>" + p.body + "...</p>"
      break;

    case 'newProject':
      var n = {
        subject: p.postAuthorName+' has created a new project: "'+p.postHeadline+'"',
        text: p.postAuthorName+' has created a new project: "'+p.postHeadline+'" '+getPostUrl(p.postId),
        html: '<a href="'+getProfileUrlById(p.postAuthorId)+'">'+p.postAuthorName+'</a> has created a new project: "<a href="'+getPostUrl(p.postId)+'" class="action-link">'+p.postHeadline+'</a>".'  
      }
      break;

    default:
    break;
  }

  // if context is email, append unsubscribe link to all outgoing notifications
  if(context == 'email'){
    n.to = userToNotify.emails[0].address;
    n.text = n.text + '\n\n Unsubscribe from all notifications: '+getUnsubscribeLink(userToNotify);
    n.html = n.html + '<br/><br/><a href="'+getUnsubscribeLink(userToNotify)+'">Unsubscribe from all notifications</a>';
  }

  return n;
}

Meteor.methods({
  markAllNotificationsAsRead: function() {
    Notifications.update(
      {userId: Meteor.userId()},
      {
        $set:{
          read: true
        }
      },
      {multi: true}
    );
  },
  markNotificationAsRead : function(notificationId) {
    var notification = Notifications.findOne({ _id: notificationId });
    if (notification.userId == Meteor.userId()) {
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