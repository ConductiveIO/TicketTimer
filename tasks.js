Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.hello.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
