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

	    $("#btn-social").click(function(){
	        Mainframe.saturate("social");
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

	});
});