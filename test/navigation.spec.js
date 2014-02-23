describe('Test navigation', function() {
	it('Navigates to post project page', function(done) {
		setTimeout(function() {
			var button = $('#postProject');
			assert('Post project button is present', button.length === 1);
			button.click();
			setTimeout(function() {
				// verify we're on post project page
				var description_input = $('#description');

				assert('Description input is present', description_input.length === 1);

				done();
			}, 10);
		}, 10);
	});

	it('Navigates to home page', function(done) {
		setTimeout(function() {
			var home = $('#homeLink');
			assert('Home link is present', home.length === 1);

			click(home[0]);

			setTimeout(function() {
				var button = $('#postProject');
				assert('Post project button is present', button.length === 1);

				done();
			}, 10);
		}, 10);
	});

	it('Shows a not found page for projects that do not exist', function(done) {
		setTimeout(function() {
			// set the first project link on the home page to point to a non-existant project
			var nonExistantProject = 'thisIsNotAMongoHash';
			var project = $('.showProject')[0];
			project.setAttribute('data-id', nonExistantProject);
			project.setAttribute('href', '/projects/'+nonExistantProject);
			click(project);

			setTimeout(function() {
				var notFound = $('div.alert-warning h2');
				assert('Not found page is loaded', notFound.html() === 'Uh-oh! Couldn\'t find that page.');
				done();
			}, 50);
		}, 30);
	});
});