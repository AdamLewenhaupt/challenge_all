define(["../user", "../ssv", "../mainframe", "underscore", "../persistent"], function(User, SSV, Mainframe, _, Persistent){

	var achievementTemplate = _.template("<div class='achievement-display' ><img class='achievement-image' style='background-color: <%= color %>' src='/images/achievements/<%= image %>'></img><h3><%= name %></h3><p><%= description %></p></div>");
	var $mainframe = $("#main-frame");

	function displayAchievement(achievement){
		var $el = $(achievementTemplate(achievement)),
		 	$container = $("<div class='achievement-container' />");

		$el.css({
			height: 200,
			"background-color": "white",
			"white-space": "wrap",
			display: "inline-block",
			"text-align": "center"
		});

		$el.children("h3").css({
			margin: 5
		});

		$el.children("img").css({
			border: "11px solid gray"
		});

		$container.css({
			border: "5px solid #4DB8DB",
			display: "inline-block",
			margin: 5
		})

		$("#mainframe-profile").append($container.html($el));
	}

	return function(){
		$mainframe.css("color", "black");

		$("#mainframe-profile").html("");
		var achievements = User.get().achievements;

		achievements.forEach(function(a){
            	displayAchievement(a);
        });

		$mainframe.find(".friend-display li div").button();

		$(".friend-display li").click(function(){

            var $this = $(this);

           var found = _.find(User.friends(), function(user){
                return user.tag === $this.attr("tag");
            });

           $("#mainframe-profile").html("");
            found.forEach(function(a){
            	displayAchievement(a);
            });
        });

		$mainframe.find(".profile-menu").each(function(){
            var $this = $(this);

            $this.css("font-size", $this.height() * 0.8);

            $this.click(function(){
                if($this.val() === "Find user"){
                    $this.val("");
                }
            });

            $this.keydown(function(e){

                if (e.which == 13) {

                    e.preventDefault();

                    Persistent.getUser($this.val(), function(err, user){
                        if(err) alert("Error, no such user");
                        else {
                        	$("#mainframe-profile").html("");
				            user.achievements.forEach(function(a){
				            	displayAchievement(a);
				            });
                        }

			            $this.val("");
			            return false;

                    });
                }
            });
        });
	}
});