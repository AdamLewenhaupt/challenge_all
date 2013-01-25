/*
Author: Adam Lewenhaupt
Keywords: Buttons, API
Description:
This api provides predefined commonly used buttons.

§1:
ok([click])
Returns a jquery reference to a new ok button.

§2:
cancel([click])
Returns a jquery reference to a new cancel button.

*/

define(["jquery", "jquery-ui"], function($, $ui){

	var okCounter = 0,
		cancelCounter = 0;

	return {

		// §1
		ok: function(click){
			var button = $("<div class='ok-button' />")
				.attr("id", "ok-button-" + okCounter++)
				.css({
					"background-image": "url(../images/ok.png)",
					width: 32,
					height: 32

				})
				.button();

			if(click){
				button.click(click);
			}

			return button;
		},

		// §2
		cancel: function(click){
			var button = $("<div class='ok-button' />")
				.attr("id", "ok-button-" + cancelCounter++)
				.css({
					"background-image": "url(../images/no.png)",
					width: 32,
					height: 32

				})
				.button();

			if(click){
				button.click(click);
			}

			return button;
		}

	}
});