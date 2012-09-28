/*
Author: Adam Lewenhaupt
Keywords: Index, Jquery
Description:
Std functions on load of webpage "/"
*/
$(document).ready(function(){
	$("#templates").hide();

	$("#main-frame").html($("#profile-template").clone());
});