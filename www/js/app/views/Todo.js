define(['underscore', 'backbone', 'text!templates/todo.htm'],
function (_, Backbone, todoTempl) {
  var TodoView = Backbone.View.extend({
      tagName: 'li',

      template: _.template(todoTempl),

      //events: {},

      initialize: function () {
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

        return self;
      }
  });

  return TodoView;
});