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