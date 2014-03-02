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
    statusIsReady: function() {
        return this.status === 'ready';
    },
    statusIsTasks: function() {
        return this.status === 'tasks';
    },
    statusIsSolved: function() {
        return this.status === 'solved';
    }
});