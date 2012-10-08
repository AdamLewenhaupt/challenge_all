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

require(["jquery", "./popup", "./mainframe", "./ssv", "./persistent", "./newsfeed"], function($, popup, Mainframe, SSV, Persistent, newsfeed){

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
	    popup({
	        title: "Login",
	        canCancel: false,

	        inputs: [
	            { name: "email", type: "text", value: "Username" },
	            { name: "pass", type: "password", value: "Password"}
	        ],

	        submit: "Login",
	        success: function(e){
	            Persistent.login(e.email, e.pass);
	        }

	    });
	}

	});
});