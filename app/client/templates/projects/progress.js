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
        // var tasks = Tasks.find({parent: this._id}).fetch();
        // var open = _.filter(tasks, function(task) { return task.status === 'open'}).length;
        // var closed = _.filter(tasks, function(task) { return task.status === 'closed'}).length;
        //var numTasks = if(open + closed === 0)
        return this.status === 'ready';
    },
    statusIsTasks: function() {
        return this.status === 'tasks';
    },
    statusIsSolved: function() {
        return this.status === 'solved';
    }
});