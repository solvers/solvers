Template.showProject.events({
  'click #offer-send': function(e) {
    // always follow links
    e.stopPropagation();
    if (this.owner === Meteor.userId()) {
      $('#owner-alert').show();
      return;
    }
    var username = roles.findFullName(Meteor.user());
    var properties = {
      message: $('#offer-help-textarea').val(),
      offeringUser: Meteor.userId(),
      offeringUserName: username,
      projectId: this._id,
      projectName: this.name
    }
    var options = {
      event: 'newOffer',
      userToNotify: this.owner,
      userDoingAction: Meteor.userId(),
      properties: properties,
      sendEmail: true
    }
    Meteor.call('sendOfferOfHelp', options);
    $('#offer-help-modal').modal('hide');
  }
});