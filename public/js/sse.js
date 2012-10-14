define(["jquery", "./user"], function($, User){

	window._sseInits = [];

	function send(event, data, subscribers){

			subscribers = subscribers || [];

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

	User.onInit(function(){

		window._esource = new EventSource("/event-stream/" + User.get()._id);
		send("login", User.get().tag + " has logged in!", User.get().friends);

		window._sseInits.forEach(function(func){
			func();
		});
	});

	return {

		listen: function(event, delegate){
			window._esource.addEventListener(event, delegate, false);
		},

		send: send,

		onInit: function(func){
			window._sseInits.push(func);
		}
	}
});