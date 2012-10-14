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

		$("li").click(function(){
			var template = _.template('#{fname} "#{tag}" #{lname}');

			console.log(User.get());

			var result = template(_.find(User.get().c_friends, function(user){
				console.log(user);
				return user.tag === $(this).attr("tag").toLowerCase();
			}));

			$("#mainframe-profile").html(result);
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