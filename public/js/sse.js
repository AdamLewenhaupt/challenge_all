define(["jquery"], function($){
	return {
		init: function(cb){
			console.log(window._user);
			window._esource = new EventSource("/event-stream/" + window._user._id);
			this.send("login", window._user.tag + " has logged in!", window._user.friends);

			cb();
		},

		listen: function(event, delegate){
			window._esource.addEventListener(event, delegate, false);
		},

		send: function(event, data, subscribers){
			if(!subscribers){
				subscribers = [];
			}

			$.ajax({
				type: "post",
				url: "/ajax/sse-send",
				data: {
					event: event,
					data: data,
					subscribers: JSON.stringify(subscribers)
				}
			});
		}
	};
});