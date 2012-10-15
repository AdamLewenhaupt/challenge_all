/*
Author: Simon Ciesluk
Keywords: Newsfeed
Description:
Newsfeed function
*/
define(["jquery"], function($){
	
	var $newsfeed 	  = $("#newsfeed");
		newsfeedQueue = new Array();
		spawnNews     = true;


	function showcase(text){
		newsfeedQueue.push(text);
		if(spawnNews){
			spawnNews = false;
			$new = $("<div style='position: absolute; display: inline-block' />");
			$newsfeed.append($new.html(text).addClass("novelty"));
			$new.css({right: -$new.width()});
			$new.animate({
				right: '+='+($newsfeed.width() + $new.width())
			}, 5000, function() {
		    // Animation complete.
		   		spawnNews = true;
				newsfeedQueue.push(newsfeedQueue.shift());
				showcase(newsfeedQueue[0]);
		  });
		}
	}

	return {
		$el: $newsfeed,

		showcase: showcase
	}
});