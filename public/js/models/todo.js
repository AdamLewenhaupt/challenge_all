var app = app || {};

app.Todo = Backbone.Model.extend({

	//Default attributes for the todo
	//and ensure that each todo created has `title` and `completed` keys.
	defaults: {
		title: '',
		completed: false
	},

	toggle: function(){
		this.save({
			completed: !this.get('completed');
		})
	}
});