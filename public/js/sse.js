define(function(){
	return {
		init: function(){
			console.log(window._user);
			window._esource = new EventSource("/event-stream/" + window._user.tag);
		},

		listen: function(event, delegate){
			window._esource.addEventListener(event, delegate, false);
		}
	}
});