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
    progressBars: function() {
    	switch(this.status) {
    		case 'ready': return [1];
    		case 'tasks': return [1,2];
    		//For variable tasks, return the number of tasks
    		//in the 'tasks' case
    		case 'solved': return [1,2,3];
    	}
    }
});