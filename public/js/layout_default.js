/*
Author: Adam Lewenhaupt
Keywords: Layout, Jquery
Description:
Std functions on load of every webpage.
*/

function form2JSON(form){
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

function hasSSV(query){
    if(!_ssv){
        var _ssv = $("#ssv").html().split('|');
    }
	return _ssv.indexOf(query) != -1;
}

function popup(options){
    var width = 400,
        height = 600,
        bounds = { width: $(document).width(), height: $(document).height() },
        $focuser = $("<div/>").addClass("focuser"),
        $popup = $("<div/>").addClass("popup"),
        $form = $("<form/>"),
        $submit = $("<button/>").addClass("submit"),
        $cancel = $("<button/>").addClass("cancel"),
        template = _.template("<%= value %>: <input name='<%= name %>' type='<%= type %>'/>");

    $form.html(_.map(options.inputs, function(input){
        return template(input);
    }).join('<br/>')).css({
        margin: 10
    });

    $submit.html(options.submit).click(function(){
        options.success(form2JSON($form));
        $popup.remove();
        $focuser.remove();
    });

    $cancel.click(false, function(){
        $popup.remove();
        $focuser.remove();
    })

    $focuser.css({
        position: "fixed",
        width: bounds.width,
        height: bounds.height, 
        opacity: 0,
        "background-color": "black"
    })

    $popup.css({
        position: "fixed",
        opacity: 0,
        width: 0,
        height: height,
        "background-color": "gray",
        "text-align": "center",
        left: bounds.width / 2,
        top: (bounds.height - height) / 2
    });

    if(options.canCancel){
        $popup.append($cancel);
    }

    $(document.body).append($focuser, $popup);

    $popup.animate({
        opacity: 1,
        width: width,
        left: "-="+(width/2)
    }, 500, function(){
        $popup.append($form, $submit);
    });

    $focuser.animate({ 
        opacity: 0.7
    }, {
        queue: false,
        duration: 500
    })
}

function login(email, password){
    $.ajax({
        type: "get",
        url: "/ajax/login",
        data: {
            email: email,
            password: password
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

	 if(hasSSV("req_login")){
        popup({
            title: "Login",
            canCancel: false,

            inputs: [
                { name: "email", type: "text", value: "Username" },
                { name: "pass", type: "password", value: "Password"}
            ],

            submit: "Login",
            success: function(e){
                login(e.email, e.pass);
            }

        });
	}
});