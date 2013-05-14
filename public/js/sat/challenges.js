define(["jquery"], function($){

	function retrieve(challengeID, fn){

		$.ajax({

			type: "get",
			url: "/ajax/get-challenge/" + challengeID,

			success: function (challenge){
				fn(challenge);
			}
		});
	}

	function displayChallenge(challengeID){
		$("#challenges-info").animate({opacity: 0}, { duration: 500, queue: false, complete: function(){
	            
            retrieve(challengeID, function (result){

            	var showPublic = "";
                if(result.isPublic==true){showPublic = "(Public)"}
                else{showPublic = "(Private)"}

                $("#challenges-info").animate({opacity: 1}, { duration: 500, queue: false });
                $("#challenges-name").html(result.name+showPublic);
                $("#challenges-description").html(result.description);
                $("#challenges-rules").html("Rules: "+result.rules);
                $("#challenges-rules li").html(result.rules);
                $("#challenges-users").html(result.users);
                $("#challenges-date").html(result.date);
                $("#challenges-achievement").html(result.achievements);
                $("#challenges-host").html("Hosts: "+result.hosts);
            }); 
            
            }
        });
	}

	return function(){
		var $mainframe = $("#main-frame");
		$mainframe.find(".challenge-display li div").button();

		$(".challenge-display li").click(function(){
			var $this = $(this);

			var found = $this.attr("challenge-id");

            displayChallenge(found);
            });
	};
});