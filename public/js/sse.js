/*
Author: Adam Lewenhaupt
Keywords: SSE, Server-Side Events, API, Server->Client
Description:
This is the SSE Interface that provides a way to recieve information
from the server after page load and communicate between clients.

§1:
send(event, data, subscribers); -- (event: the event name, data: the event data, subscribers, the [uid] that should recieve the event. )
The send message is used to send events to clients.

§2:
This setup tells the user module that the Server-side events api should be set up as soon as a user is verified.

§3:
listen(event, delegate); -- (event: The event name, delegate: A function that takes a argument for eventData).
The listen event adds a subscriber to the event-stream and if there is some new data recieved the delegate is triggered.

§4:
onInit(func); -- (func: The event that should be fired when the sse is up and running).
This should mainly be used for setting up listeners and sending messanges safely.
*/

define(["jquery", "./user"], function($, User){

	window._sseInits = [];

	// §1
	window.send = function send(event, data, subscribers){

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

	// §2
	User.onInit(function(){

		window._esource = new EventSource("/event-stream/" + User.get().tag);

		window._sseInits.forEach(function(func){
			func();
		});
	});

	return {

		// §3
		listen: function(event, delegate){
			window._esource.addEventListener(event, delegate, false);
		},

		send: window.send,

		// §4
		onInit: function(func){
            window._sseInits.push(func);
		}
	}
});