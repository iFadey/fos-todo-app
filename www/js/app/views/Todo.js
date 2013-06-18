define(['underscore', 'backbone', 'text!templates/todo.htm'],
function (_, Backbone, todoTempl) {
  var TodoView = Backbone.View.extend({
      tagName: 'li',

      template: _.template(todoTempl),

      events: {
        //'tap input[type=checkbox]'   : 'markCompleted',
        'click input[type=checkbox]' : 'markCompleted',

        //'tap label'                : 'editTodo',
        'click .btn.edit'                : 'editTodo',

        'keypress input[type=text]'      : 'saveTodo'
      },

      markCompleted: function (e) {
        var isCompleted = !this.model.get('completed');
        console.log('markCompleted');

        this.model
            .set({
              completed: isCompleted
            })
            .save();
      },

      editTodo: function () {
        var self = this;
        console.log('editTodo');

        self.$taskEdit.val(self.$taskView.find('span').text());

        self.$btnEdit.attr('aria-hidden', 'true');

        self.$taskEdit
            .removeAttr('aria-hidden')
            .removeClass('slide-left-out')
            .addClass('slide-right-in')
            .focus();

        self.$taskView.attr('aria-hidden', 'true');

        return false;
      },

      saveTodo: function (e) {
        var self = this;

        //save in case of enter/return
        if (e.keyCode === 13) {
          console.log('enter');
          self.$taskView.find('span').text(self.$taskEdit.val());

          self.model
              .set({
                task: self.$taskEdit.val()
              })
              .save();
        }

        //27 is for escape key
        if (e.keyCode === 13 || e.keyCode === 27) {
          self.$taskEdit
              .removeClass('slide-right-in')
              .addClass('slide-left-out');

          self.$btnEdit.removeAttr('aria-hidden');
        }
      },

      destroy: function () {
        this.$el.remove();
        this.model.destroy();
      },

      initialize: function () {
        this.listenTo(this.model, 'remove', this.destroy);
        this.$el.attr('role', 'listitem');
      },

      render: function () {
        var self = this;

        //--- render template ---//
        self.$el.html(self.template( self.model.toJSON() ));

        //--- cache DOM elements ---//
        self.$taskEdit = self.$('input[type=text]');
        self.$taskView = self.$('label');
        self.$btnEdit = self.$('.btn.edit');

        self.$taskEdit
            .on('animationend', function (e) {
              if (e.animationName === 'slide-left-out') {
                self.$taskEdit.attr('aria-hidden', 'true');
                self.$taskView.removeAttr('aria-hidden');
              }
            });

        return self;
      }
  });

  return TodoView;
});