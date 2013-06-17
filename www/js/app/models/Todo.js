define(['backbone', 'db/TodosDB'],
function (Backbone, TodosDB) {
  var Todo = Backbone.Model.extend({
      database: TodosDB,
      storeName: 'todos',

      defaults: {
        task: 'my task',
        completed: false,
        created_on: new Date()
      },

      validate: function (attrs) {
        if (!attrs.task) {
            return 'Task can\'t be empty';
        }
      }
  });

  return Todo;
});