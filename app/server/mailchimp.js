Meteor.methods({
  addToMailList: function (email) {
    var mckey = '41026970ad057466c39f65786ab3f4ff-us3';
    var baseUrl = 'https://us3.api.mailchimp.com/2.0/';
    var listId = '853a638394';
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