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

require(["jquery", "./mainframe", "./ssv", "./newsfeed", "./prompts", "./sse", "./user"], 
	function($, Mainframe, SSV, Newsfeed, Prompts, SSE, User){

	$(document).ready(function(){

		SSV.init();

		var $window     = $(window),
		    $sidebar    = $("#side-bar"),
		    width       = $window.width() - $sidebar.width();

		$("#templates").hide();

	    $("#main-frame").css({
	        width: width,
	        height: $window.height() - 100,
	        left: $sidebar.width()
	    });

	    $("#btn-social").click(function(){
	        Mainframe.saturate("#social-template");
	    });


		if(SSV.has("req_login")){
		    Prompts.login();
		}else{
			User.init();

			SSE.onInit(function(){
				SSE.listen("login", function(e){
					document.write("<script>alert('"+e.data+"')</script>");
				});
			});
		}

	Newsfeed.showcase("Welcome");

	});
});