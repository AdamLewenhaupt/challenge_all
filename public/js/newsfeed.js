/*
Author: Simon Ciesluk
Keywords: Newsfeed
Description:
Newsfeed function
*/
$(document).ready(function(){
	var $newsfeed 	= $("#newsfeed");
	function showcase(text){
		$new = $("<div style='position: relative; display: inline-block' />");
		$newsfeed.append($new.html(text));
		var width = $new.width();
		$new.css({
				left: -width,
				font: '80px"Lucida Grande"',
				"line-height": '150px'
			});
		$new.animate({
			left: '+='+($newsfeed.width() +width)
		}, 5000, function() {
	    // Animation complete.
	  });
}

showcase("hello");

});