$(document).ready(function(){
	var $window 	= $(window),
		$sidebar 	= $("#side-bar"),
		width 		= $window.width() - ($sidebar.width() + 40);

	$("#main-frame").width(width).css("left", $sidebar.width() + 15);
	$("#sub-frame").css("top", $sidebar.height() + $sidebar.position().top + 10)
					.width($window.width() - 35 );
	$("#footer").css("top", $("#sub-frame").position().top
			+ $("#sub-frame").height() + 10)
					.width($("#sub-frame").width());
});