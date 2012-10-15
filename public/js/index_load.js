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

define(["jquery", "./ssv", "jquery-plugins/imagesloaded"], function($, SSV, il){

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

	});
});