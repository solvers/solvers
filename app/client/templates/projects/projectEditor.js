Template.projectEditor.created = function() {
    Session.set('description', "");
    this.editor = false;
};

Template.projectEditor.rendered = function() {
    if (!this.editor) {
        var converter = {
            makeHtml: function(text) { return marked(text); }
        };

        var editor = new Markdown.Editor(converter);
        editor.run();
        this.editor = true;
    }
    var project = Session.get('project');
    var description;
    if (project) {
	    description = project.description;
    } else {
    	description = description_template;
    }
    $('#wmd-input').text(description);
    $('#edit-btn').tooltip({placement: 'bottom'})
    $('#preview-btn').tooltip({placement: 'bottom'})
    $('table').addClass('table table-striped table-bordered table-hover');
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
        $('#wmd-input').hide();
        $('#preview-btn').hide();
        $('#wmd-preview').show();
        $('#edit-btn').show();
        $('table').addClass('table table-striped table-bordered table-hover');
    },
    'click #edit-btn': function(e) {
        e.preventDefault();
        $('#wmd-preview').hide();
        $('#edit-btn').hide();
        $('#wmd-input').show();
        $('#preview-btn').show();
    },
});

description_template = [
"![this is an example image][1]",
"",
"## This is your main **heading** ##",
"",
" 1. List *item*",
" 2. List **item**",
" 3. List item",
"",
"> Sometimes I quote people - *Anon*",
"",
"    for i in range(10):",
"        print('we've got code blocks too')",
"",
"Normal text gets rendered like this.",
"URLs are automatically rendered as links: http://google.com",
"",
" [1]: http://placekitten.com/700/200"
].join('\n');