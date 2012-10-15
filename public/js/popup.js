/*
Author: Adam Lewenhaupt
Keywords: Popup, IO
Description:
popup(options) -- options: {
    submit: string -- The name of the submit button,
    success: func(e) -- A function that takes a parameter for form data,
    title: string -- Popup title,
    canCancel: bool -- Should there be a cancel button?,
    inputs: [{name: str, type: str, value: str}] -- The input fields, name and type is DOM and value is the intro text
}

The popup function provides a way to get input from the user.
*/

define(["jquery", "jquery-ui", "underscore", "./form2json"], function($, $ui, _, form2JSON){
	return function popup(options){

    var width = 200,
        height = 105 + options.inputs.length * 30,
        bounds = { width: $(document).width(), height: $(document).height() },
        $focuser = $("<div/>").addClass("focuser"),
        $popup = $("<div/>").addClass("popup"),
        $header = $("<div/>").addClass("header"),
        $form = $("<form/>"),
        $submit = $("<button/>").addClass("submit"),
        $cancel = $("<button/>").addClass("cancel"),
        template = _.template("<%= value %><br/> <input name='<%= name %>' type='<%= type %>'/>");

    $form.html(_.map(options.inputs, function(input){
        return template(input);
    }).join('<br/>')).css({
        margin: 10,
        "text-align": "center"
    });

    $header.html("<h4>"+options.title+"</h4>").css({
        width: width,
        height: 30,
        "line-height": "30px",
        "background-color": "white",
        "text-align": "center"
    });

    $submit.html(options.submit).click(function(){
        if(options.success) options.success(form2JSON($form));
        $popup.remove();
        $focuser.remove();
    }).button().css({
        "margin-left": 10
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
        $popup.append($header, $form, $submit);
    });

    $focuser.animate({ 
        opacity: 0.7
    }, {
        queue: false,
        duration: 500
    })
}
});