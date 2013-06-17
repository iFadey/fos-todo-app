// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: 'js/lib',

  // Map jquery to zepto
  map: { '*': { 'jquery': 'zepto' } },

  paths: {
    app: '../app',
    models: '../app/models',
    collections: '../app/collections',
    views: '../app/views',
    templates: '../app/templates',
    db: '../app/db',
  }
});


requirejs(['views/ViewTodos', 'collections/todos', 'zepto'], function (ViewTodos, todos, $) {
  new ViewTodos().render();

  //--- for testing only ---//
  window.todos = todos; //todos collection
  window.$ = $;         //zepto
});