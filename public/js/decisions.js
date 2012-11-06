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
				$new.click(function(){
					$new.remove();
					Persistent.makeFriends(event.user, event.data[0]);
				}).html("Friend request")
				.attr("title", "Request from: " + event.data[0]);
				break;
		}

		$new.append(Buttons.ok().css({
			"float": "left"
		}));

		$el.append($new.button());
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