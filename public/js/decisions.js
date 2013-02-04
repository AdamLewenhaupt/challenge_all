/*
Author: Adam Lewenhaupt
Keywords: DOM, Decisions
description:

*/

define(["jquery", "./ssv", "jquery-ui", "./persistent", "./buttons"], 
	function($, SSV, $ui, Persistent, Buttons){

	var decisionable = ["friend-request"],
		$el = $("#decisions");

	function add($el, event){
		$new = $("<div class='decision'/>");

		switch(event.name){
			case "friend-request":
				$new.attr("title", "Friend request from: " + event.data[0]);
				$new.append("Friend", 

				Buttons.cancel(function(){
						$new.remove();
					}).css({
						float: "right",
						margin: "2px"
					}), 

				Buttons.ok(function(){
						$new.remove();
						Persistent.makeFriends(event.user, event.data[0]);
					}).css({
						float: "right",
						margin: "2px"
				}));
				break;
		}

		$el.append($new);
	}

	SSV.onInit(function(){

		SSV.get("events").forEach(function(e){
			if(decisionable.indexOf(e.name) !== -1){
				add($el, e);
			}
		});
	});

	return {
		$el: $el
	}
});