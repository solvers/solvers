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
});