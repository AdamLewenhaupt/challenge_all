/*
Author: Simon Ciesluk
Keywords: Newsfeed
Description:
Newsfeed function
*/
define(["jquery"], function($){
<<<<<<< HEAD
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
=======
	var $newsfeed 	  = $("#newsfeed");
		newsfeedQueue = new Array();
		spawnNews     = true;
>>>>>>> newsfeedqueue

	function showcase(text){
		newsfeedQueue.push(text);
		if(spawnNews){
			spawnNews = false;
			$new = $("<div style='position: absolute; display: inline-block' />");
			$newsfeed.append($new.html(text).addClass("novelty"));
			$new.css({right: -$new.width()});
			$new.animate({
				right: '+='+($newsfeed.width() +$new.width())
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