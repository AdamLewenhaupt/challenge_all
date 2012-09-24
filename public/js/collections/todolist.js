var TodoList = Backbone.Collection.extend({
	//Ref the model
	model: app.Todo,

	//Save all the todos here.
	localStorage: new Store('todos-backbone'),

	//Get all finished
	completed: function(){
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},

	//Get all remaining
	remaining: function(){
		return this.without.apply(this, this.completed());
	},

	//We keep the todos in sequential order, despite being saved unordered
	//GUID in the database. This generates the next order number for new items.
	nextOrder: function(){
		if(!this.length){
			return 1;
		}

		return this.last().get('order') + 1;
	},

	//Sorted by their original insertion order.
	comperator: function(todo){
		return todo.get('order');
	}
});

app.Todos = new TodoList();