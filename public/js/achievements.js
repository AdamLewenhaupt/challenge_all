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

define(["jquery", "./popup", "jquery-plugins/colorpicker"], function($, popup, cp){

	var options = [{ name: "proto", image: "/images/achivproto.png"}],
		index = 0;

	function setImage($display){
		var val = options[index];
		$("#popup-field-image").val(val.name);
		$display.attr("src", val.image);
	}

	function createAchievementStep1(fn){
		popup({
				width: 350,
				submit: "Next",
				title: "Achivement Creator, Step 1",
				inputs: [
					{ name: "name", type: "text", label: "Name", tooltip: "The name of the achivement" },
					{ name: "description", type: "textarea", label: "Description", height: 100 }
				],
				success: createAchievementStep2(fn),

				canCancel: true,
				cancel: "Cancel"
		});
	}

	function createAchievementStep2(fn){

		var $display = $("<img />"),
			$left = $("<div/>"),
			$right = $("<div/>"),
			$colorSelector = $("<div/>");

		index = 0;

		$right.html(">").click(function(){
			index = index+1 < options.length ? index + 1 : 0;
			setImage($display);
		});

		$left.html("<").click(function(){
			index = index-1 >= 0 ? index - 1 : options.length - 1;
			setImage($display);
		});

		$display.css({
			"background-color": "blue",
			width: 120,
			height: 120
		});

		$colorSelector.html("Select color").button().ColorPicker({
			color: '#0000ff',

			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},

			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},

			onChange: function (hsb, hex, rgb) {
				$display.css('background-color', '#' + hex);
				$("#popup-field-color").val('#' + hex);
			}
		});

		var $imagePicker = $("<div/>").append($display, $colorSelector, $left.button(), $right.button());

		setImage($display);

		return function(data){
			if(!data) {
				fn(false);
				return;
			}

			popup({
				width: 350,
				morph: true,
				submit: "Create Achievement",
				title: "Achievement Creator, Step 2",
				inputs: [
					{name: "image", type: "hidden", label:"", def: options[index].image },
					{name: "color", type: "hidden", label:"", def: "blue" }
				],
				success: function(e){
					if(!e) data = false;
					else for (var attrname in e) { data[attrname] = e[attrname]; }
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
		createAchievement: function(fn){
			createAchievementStep1(fn);
		}
 
	}

	return achievements;
});