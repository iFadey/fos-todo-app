define(['backbone', 'views/Todos', 'views/ViewAdd', 'collections/todos'],
function (Backbone, TodosView, ViewAdd, todos) {
  var ViewTodos = Backbone.View.extend({
    el: '#view-todos',

    events: {
      //'tap footer .btn.add' : 'showAddView'
      'click footer .btn.add' : 'showAddView'
    },

    showAddView: function () {
      console.log('showAddView');

      this.viewAdd = new ViewAdd().render();

      //Redefine showAddView
      this.showAddView = function () {
        this.viewAdd.render();
      };

      //Remove existing events and reattach then
      //using this.events hash
      this.delegateEvents();
    },

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