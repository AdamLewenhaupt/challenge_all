/*
Author: Adam Lewenhaupt
Keywords: Index, Main
Description:
This is the main file for the index page, it's basicaly a virtual entry point to
the client side and does the following.

§1:
Initialize the require settings.

§2:
Make the main require call, equivilent to a main() function in c/c++.

§3:
Makes the social button saturate the mainframe with the social content.

§4:
Checks if the 'req_login' SSV (Server-Sent-Variable) is declared, meaning that we need to login.
If it is required we prompt for login. Else we initialize the user [./user.js] and 
starts the SSE (Server-Side Events) Connection.

*/

// §1
require.config({
	baseUrl: "js/",
	paths: {
		"jquery-plugins": "libs/jquery_plugins",
	    "jquery": "libs/jquery",
	    "jquery-ui": "libs/jquery-ui",
	    "underscore": "libs/underscore"
	},
	shim: {
		underscore: {
			exports: '_'
		},

		"jquery-plugins/imagesloaded": ["jquery"],
		"jquery-ui": ["jquery"]


	},
	packages: ["sat"]
});

// §2
require(["jquery", "./mainframe", "./ssv", "./newsfeed", "./prompts", "./sse", "./user", "./index_load"], 
	function($, Mainframe, SSV, Newsfeed, Prompts, SSE, User, load){

	//User.onInit(function(){ Newsfeed.showcase("Welcome"); });

	SSE.onInit(function(){

		SSE.send("login", User.get().tag + " has logged in!", User.get().friends);

		SSE.listen("login", function(e){
			console.log(e.data);
			Newsfeed.showcase(e.data);
		});
	});		

	$(document).ready(function(){

		$(".button").button();

		// §3
	    $("#btn-social").click(function(){
	        Mainframe.saturate("social");
	    });

	    // §4
		if(SSV.has("req_login")){
		    Prompts.login();
		}else{
			User.init();
		}

	});
});