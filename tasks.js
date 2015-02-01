Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // Return tasks from DB
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });
  
  // Set up entry form
  Template.body.events({
    "submit .task-entry": function (event) {

      var text = event.target.text.value;

      Tasks.insert({
        name: text,
        time: 0
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  }); 

  // Timer
  var timer = $('#timer'),
    clock, offset;

  function start() {
    offset   = Date.now();
    interval = setInterval(update, options.delay);
  }

  function update() {
    clock += delta();
    render();
  }
  
  function render() {
    timer.innerHTML = clock/1000; 
  }

  // Attach click events
  Template.task_list.events({
    "click .task-icon": function(event) {
      console.log($(this._id));
      $('.task-icon').removeClass('selected');
      $('#' + this._id).addClass('selected');
    },
    "click .remove-btn": function() {
      Tasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
