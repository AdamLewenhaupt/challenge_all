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

require(["jquery", "./mainframe", "./ssv", "./newsfeed", "./prompts", "./sse"], function($, Mainframe, SSV, newsfeed, Prompts, SSE){

	$(document).ready(function(){

		var user;

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
			var user = SSV.get("user");
			window._user = $.parseJSON(user);

			SSE.init(function(){
				SSE.listen("login", function(e){
					document.write("<script>alert('"+e.data+"')</script>");
				});
			});
		}

	});
});