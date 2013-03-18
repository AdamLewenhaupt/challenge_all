define(["jquery"], function($){
	function retrieve(challengeID){
			return({
				name: "Test name",
				description: "Best shit ever",
				rules: ["brinn"],
				users: ["simpelito"],
				isPublic: true,
				date: "",
				achievements: { 
					name: "",
					image: "",
					color: "",
					description: ""
				},
				hosts: hosts
			});
		}

	function displayChallenge(challengeID){
		$("#challenges-name").animate({opacity: 0}, { duration: 500, queue: false, complete: function(){
                var result = retrieve(challengeID.name);

                $("#challenges-name").html(result).animate({opacity: 1}, { duration: 500, queue: false });
            } });
	}
	return function(){
		var $mainframe = $("#main-frame");
		$mainframe.find(".challenge-display li div").button();

		$(".challenge-display li").click(function(){
			var found= new object();
            displayChallenge(found);
            });
	};
});