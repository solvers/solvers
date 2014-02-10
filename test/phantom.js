var args = require('system').args;

if (args.length != 2) {
		console.log('Please pass webserver URL! - you dummy!');
}

var page = new WebPage();
page.onConsoleMessage = function(msg) {
	console.log(msg);
	if(msg.indexOf('TEST EXIT') !== -1) {
		var fails = msg.substring(msg.indexOf('TEST EXIT')+10);
		phantom.exit(fails);
	}
};

loadScripts = function() {
	page.injectJs('Runner.js');
	page.injectJs('navigation.spec.js');
	page.injectJs('auth.spec.js');
	page.injectJs('posting.spec.js');
	page.injectJs('profile.spec.js');
	page.injectJs('phantom-utils.js');
};

// hijack alert to indicate tests are all finished.
page.onAlert = function (fails) {
	phantom.exit(fails);
};

var killRun = function () {
	console.log("Aborted run due to timeout");
	phantom.exit();
}

var url = args[1] + '';
console.log('[phantomjs] Loading page: '+url);
 
page.open(encodeURI(url), function(status){
	if (status !== 'success') {
		console.log('[phantomjs] could not retrieve!');
		phantom.exit();
	} else {
		loadScripts();
		setTimeout(function() {
			page.evaluate(function() {
				Runner.run('', function(fails) {
					alert(fails);
				});
			});
		}, 10);
		setTimeout(function () {
			killRun();
		}, 5000);
	}
});