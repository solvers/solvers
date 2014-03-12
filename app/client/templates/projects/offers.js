Template.offers.helpers({
  offers: function() {
    return Offers.find({ projectId: this._id });
  },
  offerCount: function() {
    return Offers.find({ projectId: this._id }).fetch().length;
  }
});

Template.offer_item.helpers({
  formatDate: function(date) {
    if(!date)
        return '';
    return moment(date).format('MMM Do YYYY');
  },
  photoForUser: function(userId) {
    Meteor.call('photoForUser', userId, function(e, r) {
      if (!!e) {
        // console.log(e);
      } else {
        return r;
      }
    });
  }
});

Template.offer_item.events({});