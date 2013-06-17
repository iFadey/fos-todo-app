define(['backbone', 'backbone-indexeddb'], function (Backbone, idxdb) {
  Backbone.sync = idxdb.sync;

  return {
    id: 'todos-db',
    migrations: [{
      version: 1,
      migrate: function (transaction, next) {
        var store = transaction.db.createObjectStore('todos');
        next();
      }
    }]
  };
});