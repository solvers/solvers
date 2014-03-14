Meteor.publish('settings', function() {
  return Settings.find({ userId: this.userId });
});

Meteor.methods({
  setEmailNotification: function(value) {
    console.log('setting email notifs: ' + value);
    setSetting('sendEmail', value);
  }
});

var setSetting = function(setting, value) {
  var exists = !!Settings.findOne({userId: Meteor.userId(), setting:setting});
  console.log(exists);
  if (exists) {
    Settings.update(
      { userId: Meteor.userId(),
        setting: setting },
      { $set: { value: value } }
    );
  } else {
    var s = { userId: Meteor.userId(),
        setting: setting,
        value: value };
    Settings.insert(s);
  }
  console.log('setting ' + setting + ' to ' + value);
}
