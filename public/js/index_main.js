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

	User.onInit(function(){ Newsfeed.showcase("Welcome"); });

	$(document).ready(function(){

		$("#templates").hide();

	    $("#btn-social").click(function(){
	        Mainframe.saturate("#social-template");
	    });


		if(SSV.has("req_login")){
		    Prompts.login();
		}else{

			User.init();

			SSE.onInit(function(){
				console.log("sten");

				SSE.listen("login", function(e){
					document.write("<script>alert('"+e.data+"')</script>");
				});
			});

		}

	});
});