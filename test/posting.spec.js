describe('A user should be able to post a project when authenticated', function() {

	var name = 'Killer Bees Mutagen';
	var role = 'Expert DNA Programmer';
	var description = 'This is a breeding program. We hope to code the DNA to create a mutagen strain that we will then inject into normal house bees, to produce incredible killer bees.';
	var contact_name = 'Professor Eindhoven';
	var contact_email = 'prof.eindhoven@mit.edu';
	var tags = 'bees, dna, programming';

	it('A user can post a project', function(done) {
		// navigate to post project page
		var home = $('#homeLink');
		click(home[0]);

		setTimeout(function() {
			var button = $('#postProject');
			button.click();
			setTimeout(function() {

				var description_input = $('#wmd-input');
				assert('Description input is present', description_input.length === 1);

				$('#name').val(name);
				$('#role').val(role);
				$('#wmd-input').val(description);
				$('#contact_name').val(contact_name);
				$('#contact_email').val(contact_email);
				$('#tags').val(tags);
				var addNewProjectBtn = $('#addNewProject');
				click(addNewProjectBtn[0]);

				setTimeout(function() {
					assert('Project role is "Expert DNA Programmer"', $('#project_role').text() === role);
					assert('Project name is "Killer Bees Mutagen"', $('#project_name').text() === name);
					assert('Project description is correct', $('#project_description_p').text() === description + "\n");
					assert('Project contact name is correct', $('#project_contact_name').text() === contact_name);
					assert('Project contact email is correct', $('#project_contact_email').text() === contact_email);
					done();
				}, 100);

			}, 10);

		}, 10);
	});

	it('The latest posted project is on the home page', function(done) {
		var home = $('#homeLink');
		click(home[0]);
		setTimeout(function() {
			var firstProject = $('.showProject')[0];
			assert('Posted project is the first project on the home page', $(firstProject).text() === name + ' - ' + role);
			var userProfileLink = $('.projectOwner')[0];
			assert('Correct name of user is in project profile link', $(userProfileLink).text() === 'testuser');
			done();
		}, 30);

	});
});
