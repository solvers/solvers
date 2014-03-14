Meteor.publish("offers", function () {
  return Offers.find({ userId: this.userId }); // only this user
});