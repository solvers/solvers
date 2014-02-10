describe('A user should be able to edit his information', function() {
	it('A user should be able to edit his profile when signed in', function(done) {
		var editProfile = $('#editProfile');
		assert('Edit profile link is present', editProfile.length === 1);
		click(editProfile[0]);

		setTimeout(function() {
			var editEmail = $('#email');
			assert('Edit email input is present', editEmail.length === 1);

			var editFirstName = $('#firstName');
			assert('Edit first name input is present', editFirstName.length === 1);
			editFirstName.focus().val('Testy').blur();

			var editLastName = $('#lastName');
			assert('Edit last name input is present', editLastName.length === 1);
			editLastName.focus().val('Userman').blur();

			setTimeout(function() {
				var fullName = $('#fullName');
				console.log("Full name: " + fullName.text());
				assert('Full name in user card preview has changed to Testy Userman', fullName.text() === 'Testy Userman');

				done();
			}, 20);
		}, 20);
	});

	it('After changing his name, user should see his username changed next to listed project', function(done) {
		var home = $('#homeLink');
		click(home[0]);
		setTimeout(function() {
			var userProfileLink = $('.projectOwner')[0];
			assert('Correct name of user is in project profile link', $(userProfileLink).text() === 'Testy Userman');
			done();
		}, 20);
	});
});