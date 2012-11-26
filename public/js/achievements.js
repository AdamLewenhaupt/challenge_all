/*
Author: Adam Lewenhaupt
Keywords: API, Achivements
Description:
This module provides an api for achivements
on the client side.

§1:
createChallenge()
This function provides a popup where the user
can create an achivement.

*/

define(["jquery", "./popup"], function($, popup){

	var options = ["pimp", "cow", "chicken"],
		index = 0;

	function setImage($display){
		var val = options[index];
		$("#popup-field-image").val(val);
		$display.html(val);
	}

	function createChallengeStep1(fn){
		popup({
				width: 350,
				submit: "Next",
				title: "Achivement Creator, Step 1",
				inputs: [
					{ name: "name", type: "text", label: "Name", tooltip: "The name of the achivement" },
					{ name: "description", type: "textarea", label: "Description", height: 100 }
				],
				success: createChallengeStep2(fn),

				canCancel: true,
				cancel: "Cancel"
		});
	}

	function createChallengeStep2(fn){

		var $display = $("<div/>"),
			$left = $("<div/>"),
			$right = $("<div/>");

		index = 0;

		$right.html(">").click(function(){
			index = index+1 < options.length ? index + 1 : 0;
			setImage($display);
		});

		$left.html("<").click(function(){
			index = index-1 >= 0 ? index - 1 : options.length - 1;
			setImage($display);
		});

		var $imagePicker = $("<div/>").append($display, $left.button(), $right.button());

		setImage($display);

		return function(data){
			popup({
				width: 350,
				morph: true,
				submit: "Create Achievement",
				title: "Achievement Creator, Step 2",
				inputs: [
					{name: "image", type: "hidden", label:""}
				],
				success: function(e){
					if(!e) data = false;
					for (var attrname in e) { data[attrname] = e[attrname]; }
					fn(data);
				},

				canCancel: true,
				cancel: "Close",

				custom: $imagePicker,
				customAbove: true
			});
		};
	}

	var achievements = {

		// §1
		createChallenge: function(fn){
			createChallengeStep1(fn);
		}
 
	}

	return achievements;
});