define(['backbone', 'views/Todos', 'collections/todos'],
function (Backbone, TodosView, todos) {
  var ViewTodos = Backbone.View.extend({
    el: '#view-todos',

    //events: {},

    setBtnDelDisabled: function () {
      if (todos.length) {
        this.$btnDel.removeAttr('disabled');
      } else {
        this.$btnDel.attr('disabled', 'disabled');
      }
    },

    initialize: function () {
      //init todo list
      this.todosView = new TodosView().render();

      this.listenTo(todos, 'add', this.setBtnDelDisabled);
    },

    render: function () {
      this.$('.view-content').append(this.todosView.el);

      this.$btnDel = this.$('footer .btn.del');

      this.setBtnDelDisabled();
    }
  });

  return ViewTodos;
});