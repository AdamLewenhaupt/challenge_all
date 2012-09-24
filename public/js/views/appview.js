app.AppView = Backbone.View.extend({
	el: '#todoapp',

	statsTemplate: _.template($("#stats-template").html()),

	// At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function(){
    	this.input = this.$('#new-todo');
    	this.allCheckBox = this.$('#toggle-all')[0];
    	this.$footer = this.$("#footer");
    	this.$main = this.$("#main");

    	window.app.Todos.on('add', this.addOne, this);
    	window.app.Todos.on('reset', this.addAll, this);
    	window.app.Todos.on('all', this.render, this);

    	app.Todos.fetch();
    },

    render: function(){
    	var completed = app.Todos.completed().length;
    	var remaining = app.Todos.remaining().length;

    	if(app.Todos.length){
    		this.$main.show();
    		this.$footer.show();

    		this.$footer.html(this.statsTemplate({
    			completed: completed,
    			remaining: remaining
    		}));
    	} else {
    		this.$main.hide();
        	this.$footer.hide();
    	}

    	this.allCheckBox.checked = !remaining;
    },

    addOne: function(todo){
    	var view = new app.TodoView({ model: todo });
    	$("#todo-list").append(view.render().el);
    },

    addAll: function(){
    	this.$("#todo-list").html('');
    	app.Todos.each(this.addOne, this);
    }
});