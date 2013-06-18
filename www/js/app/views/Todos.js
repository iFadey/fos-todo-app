define(['backbone', 'views/Todo', 'collections/todos'],
function (Backbone, TodoView, todos) {
  var TodosView = Backbone.View.extend({
    tagName: 'ul',
    id: 'todo-list',
    className: 'todo-list reset-list',

    initialize: function () {
      this.collection = todos;

      this.listenTo(this.collection, 'add', this.addTodo);
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'sort', this.render);
    },

    delAll: function () {
      /**
       * We can remove all models using reset
       * this.collection.reset([]);
       * 
       * But I used remove method because I want remove
       * event to get fired for each model
       */

      this.collection.remove(this.collection.models);
    },

    delCompleted: function () {
      this.collection.remove(
        this.collection.where({completed: true})
      );
    },

    addTodo: function (todo) {
      var todoView = new TodoView({model: todo}).render();
      this.$el.append(todoView.el);
    },

    render: function () {
      this.$el.html('');
      this.collection.each(this.addTodo, this);
      return this;
    }
  });

  return TodosView;
});