Template.projectEditor.created = function() {
	Session.set('description', "");
	this.editor = false;
};

Template.projectEditor.rendered = function() {
	if (!this.editor) {
		var converter = new Markdown.getSanitizingConverter();
		var editor = new Markdown.Editor(converter);
		editor.run();
		this.editor = true;
	    console.log('editor created');
	}
}

Template.projectEditor.helpers({
	description: function() {
		return Session.get('description');
	}
});

Template.projectEditor.events({
	'click a': function(e) {
		// always follow links
		e.stopPropagation();
	},
	'click #preview-btn': function(e, t) {
		e.preventDefault();
		var description = $('#innerEditor').text();
		Session.set('description', description);
		$('#editor').hide();
		$('#preview-btn').hide();
		$('#preview').show();
		$('#edit-btn').show();
	},
	'click #edit-btn': function(e) {
		e.preventDefault();
		$('#preview').hide();
		$('#edit-btn').hide();
		$('#editor').show();
		$('#preview-btn').show();
	},
});