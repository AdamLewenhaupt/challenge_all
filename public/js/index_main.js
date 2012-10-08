require.config({
	baseUrl: "js/",
	paths: {
	    "jquery": "libs/jquery",
	    "underscore": "libs/underscore"	
	},
	shim: {
		underscore: {
			exports: '_'
		}
	}
});

<<<<<<< HEAD
require(["jquery", "./popup", "./mainframe", "./ssv", "./persistent", "./newsfeed"], function($, popup, Mainframe, SSV, Persistent, newsfeed){
=======
require(["jquery", "./mainframe", "./ssv", "./prompts"], function($, Mainframe, SSV, Prompts){
>>>>>>> 1e21aaae1b0b5c3404475b8c22eef01233764f46

	$(document).ready(function(){
		SSV.init();

		var $window     = $(window),
		    $sidebar    = $("#side-bar"),
		    width       = $window.width() - $sidebar.width();

		$("#templates").hide();

	    $("#main-frame").css({
	        width: width,
	        height: $window.height() - 150,
	        left: $sidebar.width()
	    });

	    $("#btn-social").click(function(){
	        Mainframe.saturate("#profile-template");
	    });

	$("#ssv").hide();

	if(SSV.has("req_login")){
	    Prompts.login();
	}

	});
});