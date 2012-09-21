/*
Author: Adam Lewenhaupt, Simon Ciesluk
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

function novelcy(data){
	$newsfeed = $("#newsfeed-frame");
	var position = $newsfeed.position(),
		height = $newsfeed.height() - 20;
	$new = $("<div/>")
			.addClass("novelcy spawned")
			.css({
				left: -200,
				top: 10,
				height: height,
				"line-height": height + "px"
			})
			.html($("<p/>").addClass("data").html(data));

	return $new;
}

function sseConnect(){
	if(signedIn){
		$("#main-frame").html("");
		source = new EventSource('/event-stream/' + id);
		source.addEventListener("newsfeed", function(e){
			$("#newsfeed-frame").append(novelcy(e.data));
			$("#newsfeed-frame .spawned").each(function(){
				$(this).animate({left: $(document).width()}, 10000, function(){
				})
			})
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
<<<<<<< HEAD

	$("#footer").css("top", $("#newsfeed-frame").position().top
			+ $("#newsfeed-frame").height() + 10)
					.width($("#newsfeed-frame").width());

	sseConnect();
=======
	$("#footer").css("top", $("#sub-frame").position().top
			+ $("#sub-frame").height() + 10)
					.width($("#sub-frame").width());

	$("#hot").click(function(){
		$.ajax({
			url: "/",
  			cache: false
		}).done(function( html ) {
		  $("#main-frame").html(html);
		});
	});		
	$("#new").click(function(){
		$.ajax({
			url: "/",
  			cache: false
		}).done(function( html ) {
		  $("#main-frame").html(html);
		});
	});		
>>>>>>> 48072913d27c99658468245a2bfc51b276b1eb6f
});