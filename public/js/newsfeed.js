/*
Author: Simon Ciesluk
Keywords: Newsfeed
Description:
Newsfeed function
*/
define(["jquery"], function($){
	var $newsfeed 	= $("#newsfeed");
	function showcase(text){
		$new = $("<div style='position: relative; display: inline-block' />");
		$newsfeed.append($new.html(text));
		$new.css({
				font: '80px"Lucida Grande",Helvetica,Arial,sans-serif',
				"line-height": '100px',
				color: 'white'
			});
		$new.css({left: -$new.width()});
		$new.animate({
			left: '+='+($newsfeed.width() +$new.width())
		}, 5000, function() {
	    // Animation complete.
	  });

	function queuePush(name,element){

	}
}

showcase("Hello");

});