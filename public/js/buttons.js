/*
Author: Adam Lewenhaupt
Keywords: Buttons, API
Description:
This api provides predefined commonly used buttons.

§1:
ok([click])
Returns a jquery reference to a new ok button.

*/

define(["jquery", "jquery-ui"], function($, $ui){

	var okCounter = 0;

	return {

		// §1
		ok: function(click){
			var button = $("<div class='ok-button' />")
				.attr("id", "ok-button-" + okCounter++)
				.html($("<img src='/images/ok.png' ></img>").css({
					width: 30,
					height: 30
				}))
				.button();

			if(click){
				button.click(click);
			}

			return button;
		}

	}
});