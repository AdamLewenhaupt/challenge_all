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

	var achivements = {

		// §1
		createChallenge: function(fn){
			popup({
				width: 400,
				submit: "Create achivement",
				title: "Achivement Creator",
				inputs: [
					{ name: "name", type: "text", label: "Name", tooltip: "The name of the achivement" }
				],
				success: fn
			});
		}

	}

	return achivements;
});