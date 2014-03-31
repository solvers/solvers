var status = function() {
    switch(this.status) {
    	case 'ready': return 'Ready for Solvers';
        case 'tasks': return 'In Progress';
        case 'solved': return 'Project Solved!';
    }
};

Template.progress.helpers({
	projectStatus: status
});

Template.progress_editable.helpers({
	projectStatus: status
});

Template.progress_bar.helpers({
    statusCompletion: function() {
        switch (this.status) {
            case 'ready':
                return 33;
                break;
            case 'tasks':
                return 66;
                break;
            case 'solved':
                return 100;
                break;
        }
    }
});