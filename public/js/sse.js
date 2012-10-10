define(function(){
	return {
		init: function(user){
			if(window.EventSource && !window._esource){
				window._esource = new EventSource("/event-stream/" + user.tag);
			}
		},

		listen: function(event, delegate){
			window._esource.addEventListener(event, delegate, false);
		}
	}
});