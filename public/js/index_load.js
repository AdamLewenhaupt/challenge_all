/*
Author: Adam Lewenhaupt
Keywords: Load
Description:
This module will be executed on page load.

§1:
Rolls the side-bar into the screen if the user is 
logged in and the profile image is loaded.

§2:
Fade in the mainframe.
*/

define(["jquery", "./ssv", "jquery-plugins/imagesloaded", "underscore", "./persistent", "jquery-ui"], function($, SSV, il, _, Persistent, $ui){

	SSV.onInit(function(){
		if(!SSV.has("req_login")){

			// §1
			$("#side-bar").imagesLoaded(function(){
				$(this).animate({left: "+="+300}, { duration: 500, queue: false,
				complete: function(){
						// §2
						$('#main-frame').animate({opacity: 1}, { duration: 500, queue: false });
				} });
			});
			
		}

		var events = SSV.get("events");

		_.map(events, function(event){

			if(event.name === "friend-request"){
				var result = prompt("Accept friend request from " + event.user + " ? (y/n)");
				if(result){
					Persistent.makeFriends(event.user, event.data[0]);
				}
			}
		});

		$(".decision").button().children("span").css({
			"line-height": "170px"
		});

	});
});