/*
Author: Simon Ciesluk
Keywords: Newsfeed
Description:
Newsfeed function
*/
define(["jquery"], function($){
	var $newsfeed 	  = $("#newsfeed");
		newsfeedQueue = new Array();

	function showcase(text){
		newsfeedQueue.push(text);
		$new = $("<div style='position: relative; display: inline-block' />");
		$newsfeed.append($new.html(newsfeedQueue[0]));
		$new.css({
				font: '80px"Lucida Grande",Helvetica,Arial,sans-serif',
				"line-height": '150px',
				color: 'white'
			});
		$new.css({left: -$new.width()});
		$new.animate({
			left: '+='+($newsfeed.width() +$new.width())
		}, 5000, function() {
	    // Animation complete.
	    if(newsfeedQueue.length < 5){
	    	
	    	}
	    	//check if there is a more news or if repeat
	    }
	  });
}
	showcase("Hello");
	showcase("you");
});