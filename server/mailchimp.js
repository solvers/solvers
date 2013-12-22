Meteor.methods({
  addToMailList: function (email) {
    var mckey = '841e25e309b9933d79c8c543b458c88e-us7';
    var baseUrl = 'https://us7.api.mailchimp.com/2.0/';
    var listId = '873ea4a4c6';
    var mcResult = HTTP.post(baseUrl + 'lists/subscribe', {data: {
      apikey: mckey,
      id: listId,
      email: {
        email: email
      }
    }});
    if(mcResult.statusCode !== 200) {
      console.error("Error connecting to MailChimp");
      throw new Meteor.Error(500, 'Mailchimp error');
    }
    return true;
  }
});