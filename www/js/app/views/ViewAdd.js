define(['backbone', 'views/Todos', 'collections/todos'],
function (Backbone, TodosView, todos) {
  var ViewAdd = Backbone.View.extend({
    el: '#view-add',

    //--- Replace click with tap before creating final build ---//
    events: {
      //we assigned id to .btn.done so why not select it using that
      'click #btn-add-done' : 'addTodo',
      //'tap #btn-add-done' : 'addTodo',

      'click .btn.del'      : 'cancel',
      //'tap .btn.del' : 'cancel',

      'keyup #task'         : 'setAddBtnDisabled',
      'keypress #task'      : 'addTodo',

      'click #activities .add-contact' : 'addContact'
    },

    setAddBtnDisabled: function () {
      var taskLen = this.$task.val().length;

      taskLen ? this.$btnAdd.removeAttr('disabled')
              : this.$btnAdd.attr('disabled', 'disabled');
    },

    addTodo: function (e) {
      var task = this.$task.val();

      console.log('ViewAdd:addTodo');

      //if Done button is clicked or Enter key is pressed and
      //task must have length greater than 0
      if ((e.type === 'click' || e.keyCode === 13) && task.length) {
        todos.create({task: task, created_on: new Date()});
        this.cancel();
        return false;
      }

    },

    cancel: function () {
      this.$el.removeClass('slide-up-in').addClass('slide-down-out');
    },

    hideView: function (e) {
      var $target = $(e.target);

      if (e.animationName === 'slide-down-out') {
        $target.attr('aria-hidden', 'true');
      }
    },

    addContact: function () {
      var self = this,
          pick = new MozActivity({
            name: 'pick',
            data: {
              type: 'webcontacts/contact'
             }
          });

      pick.onsuccess = function () { 
        var res = this.result;
        self.$task.val(self.$task.val() + res.name[0] + '(' + res.number + ')');
      };

      pick.onerror = function () { 
        alert('ERROR: Unable to add contact!');
      };

      return false;
    },

    initialize: function () {
      this.$task = this.$('#task');
      this.$btnAdd = this.$('#btn-add-done');
      this.$el.on('animationend', this.hideView);
    },

    render: function () {
      this.$el.removeAttr('aria-hidden').removeClass('slide-down-out').addClass('slide-up-in');
      this.$task.val('');
      this.$btnAdd.attr('disabled', 'disabled');
      return this;
    }
  });

  return ViewAdd;
});