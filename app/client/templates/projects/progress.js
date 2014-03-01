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
        var tasks = Tasks.find({parent: this._id}).fetch();
        var open = _.filter(tasks, function(task) { return task.status === 'open'}).length;
        var closed = _.filter(tasks, function(task) { return task.status === 'closed'}).length;
        //var numTasks = if(open + closed === 0)
        console.log("Open: ", open, closed);
    	switch(this.status) {
    		case 'ready': return [1];
    		case 'tasks': return [1,2];
    		//For variable tasks, return the number of tasks
    		//in the 'tasks' case
    		case 'solved': return [1,2,3];
    	}
    }
});