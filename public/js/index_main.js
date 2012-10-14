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

require(["jquery", "./mainframe", "./ssv", "./newsfeed", "./prompts", "./sse", "./user", "underscore"], 
	function($, Mainframe, SSV, Newsfeed, Prompts, SSE, User, _){

	User.onInit(function(){ Newsfeed.showcase("Welcome"); });

	$(document).ready(function(){

		$(".friend-display li").click(function(){

			var $this = $(this);

			$("#mainframe-profile").animate({opacity: 0}, function(){
				var compiled = _.template('<h1><%= fname %> "<%= tag %>" <%= lname %></h1><h2><%= email %></h2><h3>Age: <%= age %></h3>'),
					found = _.find(User.friends(), function(user){
					return user.tag === $this.attr("tag").toLowerCase();
				});

			var result = compiled(found);

			$("#mainframe-profile").html(result).animate({opacity: 1});
			});
		});

		

		$("#side-profile-frame-image").click(function(){

			$("#mainframe-profile").animate({opacity: 0}, function(){
				var compiled = _.template('<h1><%= fname %> "<%= tag %>" <%= lname %></h1><h2><%= email %></h2><h3>Age: <%= age %></h3>'),
					result = compiled(User.get());
			
				$("#mainframe-profile").html(result).animate({opacity: 1});
			});
		});

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