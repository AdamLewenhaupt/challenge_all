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

function saturateMainframe(id){
    $("#main-frame").html($(id).clone());
}

function popup(options){
    var width = 200,
        height = 60 + options.inputs.length * 30,
        bounds = { width: $(document).width(), height: $(document).height() },
        $focuser = $("<div/>").addClass("focuser"),
        $popup = $("<div/>").addClass("popup"),
        $form = $("<form/>"),
        $submit = $("<button/>").addClass("submit"),
        $cancel = $("<button/>").addClass("cancel"),
        template = _.template("<%= value %><br/> <input name='<%= name %>' type='<%= type %>'/>");

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

 	$("#ssv").hide();

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