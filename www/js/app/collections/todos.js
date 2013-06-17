define(['backbone', 'models/Todo', 'db/TodosDB'],
function (Backbone, Todo, TodosDB) {
    var Todos = Backbone.Collection.extend({
      database: TodosDB,
      storeName: 'todos',
      model: Todo,
      comparator: function (m) {
        return m.get('created_on').getTime();
      }
    });

    var todos = new Todos();

    //fetch all records from IndexedDB
    todos.fetch();

    return todos;
});