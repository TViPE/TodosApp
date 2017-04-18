var app = app || {};

// Todo Collection
// The collection of todos is backed by localStorage instead of a remote server

var TodoList = Backbone.Collection.extend({
	model: app.Todo,

	// Save all of todo items under the "todos-backbone" namespace
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// Filter down the list of all todo items that are finished
	completed: function() {
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},

	//Filter down the list to only todo items that are still no finished
	remaining: function() {
		return this.without.apply(this, this.completed());
	},

	// We keep the Todos in sequential order, despeite being saved by unordered
	// GUID in teh database. This generates the next order number for new items.
	nextOrder: function(){
		if(!this.length){
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// Todos are sorted by their original insertion order
	comparator: function(todo){
		return togo.get('order');
	}
});

// Create our global collection of **Todos**
app.Todos = new TodoList();
