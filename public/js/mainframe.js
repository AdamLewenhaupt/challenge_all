define(["jquery"], function($){
	return {
		$el: $("#main-frame"),

		saturate: function(id){
		    this.$el.html($(id).clone());
		}
	};
});