/*
Author: Adam Lewenhaupt
Keywords: Layout, Jquery
Description:
Std functions on load of every webpage.
*/

function getSSV(){
	return $("#ssv").html();
}

function login(email, password){
    $.ajax({
        type: "get",
        url: "/ajax/login",
        data: {
            name: name,
            password: password
        },
        
        success: function(data){
            alert(data);
        }
    })
}

function create(fname, tag, lname, age, email, password){
    $.ajax({
       type: "post",
       url: "/ajax/create",
       data: {
           fname: fname,
           lname: lname,
           tag: tag,
           age: age,
           email: email,
           password: password
       },
       
       success: function(data){
           alert(data);
       }
    });
}

$(document).ready(function(){

	var $window 	= $(window),
		$sidebar 	= $("#side-bar"),
		width 		= $window.width() - ($sidebar.width() + 40);

 	$("#ssv").hide();

	$("#main-frame").width(width).css("left", $sidebar.width() + 15);

	$("#sub-frame").css("top", $sidebar.height() + $sidebar.position().top + 10)
					.width($window.width() - 35 );

	$("#footer").css("top", $("#sub-frame").position().top
			+ $("#sub-frame").height() + 10)
					.width($("#sub-frame").width());

	if(getSSV().indexOf("req_login") != -1){
		alert("Require login!");
	}
});