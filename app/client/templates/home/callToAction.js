Template.callToAction.helpers({
  usercount: function() {
  	count = Session.get('usercount');
  	if (count) {
  		return count
  	} else {
  		return ""
  	}
  }
});