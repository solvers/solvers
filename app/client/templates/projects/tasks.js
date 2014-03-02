Template.tasks.helpers({
  tasks: function() {
    return Tasks.find({parent: this._id, status: 'open'});
  },
  mayUpdateTasks: function() {
    return roles.isAdmin() || this.owner === Meteor.userId();
  }
});

Template.tasks.events({
	'click .close_task': function(e) {
		e.preventDefault();
		Meteor.call('closeTask', this._id, function(err) {
			if(err) alert(err.reason);
		});
	},
    'click .edit_task': function(e) {
        e.preventDefault();
        $('#add_task_modal').modal();
        $('#task_name').val(this.name);
        $('#task_description').val(this.description);
        $('#task_assigned').val(this.assigned_username);
        $('#task_id').val(this._id);
    }
});

Template.task_controls.events({
	'click #add_task': function(e) {
		$('#add_task_modal').modal();
        $('#task_name').val('');
        $('#task_description').val('');
        $('#task_assigned').val('');
        $('#task_id').val('');
	},
	'click #save_task': function(e) {
    e.preventDefault();

    var checkNotEmpty = function(field, failMsg) {
	    if($('#'+field).val().length === 0) {
	        $('#task_error').show().text(failMsg);
	        return false;
	    }
	    return true;
    };
    if(!checkNotEmpty('task_name', "Please enter a name for the task."))
    	return;
    if(!checkNotEmpty('task_description', "Please enter a description for the task."))
    	return;
    //TODO: assign owner of project by default when the page is generated
    if(!checkNotEmpty('task_assigned', "Please assign a user for the task."))
    	return;

    var task = {
        name: $('#task_name').val(),
        description: $('#task_description').val(),
        assigned: $('#task_assigned').val()
    };

    // saving or updating?
    var task_id = $('#task_id').val();
    if(task_id) {
        task['id'] = task_id;
    }

    Meteor.call('addOrUpdateTask',
      this._id, task, function(err) {
        if(err) {
            $('#task_error').show().text(err.reason);
        } else {
            $('#task_error').hide();
            $('#task_name').val('');
            $('#task_description').val('');
            $('#task_assigned').val('');
            $('#add_task_modal').modal('hide');
        }
    	});
	}
});