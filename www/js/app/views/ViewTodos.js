define(['backbone', 'views/Todos', 'views/ViewAdd', 'collections/todos'],
function (Backbone, TodosView, ViewAdd, todos) {
  var ViewTodos = Backbone.View.extend({
    el: '#view-todos',

    events: {
      //'tap footer .btn.del' : 'delTodos',
      'click footer .btn.del' : 'delTodos',

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

    delTodos: function () {
      /**
       * Other possible solution for following if condition is
       * this.$('#todo-list input[type=checkbox]:checked').length
       * But I didn't used it just to avoid DOM access
       */

      if (todos.where({completed: true}).length) {
        //function as Delete Completed

        if (confirm('Delete Completed Tasks?')) {
          this.todosView.delCompleted();
        }
      } else {
        if (confirm('Delete All Tasks?')) {
          //function as Delete All
          this.todosView.delAll();
        }
      }

      this.setBtnDelDisabled();
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