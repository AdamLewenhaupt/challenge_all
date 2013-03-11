define(["jquery"], function($){
	return function(){
		var $mainframe = $("#main-frame");
		$mainframe.find(".challenge-display li div").button();
	};
});