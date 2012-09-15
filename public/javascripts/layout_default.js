/*
Author: Adam Lewenhaupt
Keywords: Layout, Jquery
Description:
Std functions on load of every webpage.
*/

$(document).ready(function(){

	var $window 	= $(window),
		$sidebar 	= $("#side-bar"),
		width 		= $window.width() - ($sidebar.width() + 40);

	$("#main-frame").width(width).css("left", $sidebar.width() + 15);

	$("#newsfeed-frame").css("top", $sidebar.height() + $sidebar.position().top + 10)
					.width($window.width() - 35 );

	$("#footer").css("top", $("#newsfeed-frame").position().top
			+ $("#newsfeed-frame").height() + 10)
					.width($("#newsfeed-frame").width());
});