describe('A user should be able to signup and sign into the site', function() {
	it('Can open and close the login dropdown', function(done) {
		var loginDropdown = $('#login-dropdown-list .dropdown-toggle');
		assert('Login dropdown is present', loginDropdown.length === 1);

		var dropDownMenu = $('.dropdown-menu');
		var display = dropDownMenu.css('display');
		assert('Login dropdown is hidden by default', display === 'none');

		click(loginDropdown[0]);
		display = dropDownMenu.css('display');
		assert('Login dropdown is shown after clicking on login button', display === 'block');

		click(loginDropdown[0]);
		display = dropDownMenu.css('display');
		assert('Login dropdown is hidden after clicking on login button', display === 'none');

		done();
	});

	it('Can sign up to make a new account', function(done) {
		var loginDropdown = $('#login-dropdown-list .dropdown-toggle');
		var dropDownMenu = $('.dropdown-menu');
		click(loginDropdown[0]);
		var signupLink = $('#signup-link');
		assert('Signup link is present', signupLink.length === 1);
		
		click(signupLink[0]);
		var usernameField = $('#login-username');
		assert('Username field is present', usernameField.length === 1);
		var emailField = $('#login-email');
		assert('Email field is present', emailField.length === 1);
		var passwordField = $('#login-password');
		assert('Password field is present', passwordField.length === 1);
		var signupButton = $('#login-buttons-password');
		assert('Signup button is present', signupButton.length === 1);

		usernameField.val('testuser');
		emailField.val('testuser@example.com');
		passwordField.val('testpassword123');
		click(signupButton[0]);

		setTimeout(function() {
			var loginDropdown = $('#login-dropdown-list .dropdown-toggle');
			var content = loginDropdown.html().trim();
			assert('Successfully created and authenticated as new user testuser', content === 'testuser');
			done();
		}, 500);
	});
});