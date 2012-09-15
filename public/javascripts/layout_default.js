/*
Author: Adam Lewenhaupt
Keywords: Layout, Jquery
Description:
Std functions on load of every webpage.
*/

var signedIn = false,
	source,
	id;

function getFormFields(form){
 	var retval = {},
 		vals = form.children("input")
 		.map(function(){ 
 			return [$(this).attr("name"), $(this).val()];
 			 });

 	for(i = 0; i < vals.length; i+=2){
 		retval[vals[i]] = vals[i+1];
 	}
 	return retval;
}

function sseConnect(){
	if(signedIn){
		$("#main-frame").html("");
		source = new EventSource('/event-stream/' + id);
		source.addEventListener("newsfeed", function(e){
			$("#newsfeed-frame").html(e.data);
		});
	}else{
		$("#main-frame").html("<form id='login-fields'>Name: <input type='text' name='id'/></form><br/>")
						.append($("<button/>").click(function(){
							id = getFormFields($("#login-fields")).id;
							if(id){
								signedIn = true;
								sseConnect();
							}
						}).html("Sign in"));
	}
}

$(document).ready(function(){

	var $window 	= $(window),
		$sidebar 	= $("#side-bar"),
		width 		= $window.width() - ($sidebar.width() + 40);

	$("#main-frame").width(width).css("left", $sidebar.width() + 15);

	$("#newsfeed-frame").css("top", $sidebar.height() + $sidebar.position().top + 10)
					.width($window.width() - 35 );

	$("#footer").css("top", $("#newsfeed-frame").position().top
			+ $("#newsfeed-frame").height() + 10)
					.width($("#newsfeed-frame").width());

	sseConnect();
});