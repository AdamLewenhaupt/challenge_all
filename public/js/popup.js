/*
Author: Adam Lewenhaupt
Keywords: Popup, IO
Description:
popup(options) -- options: {
    submit: string -- The name of the submit button,
    success: func(e) -- A function that takes a parameter for form data,
    title: string -- Popup title,
    canCancel: bool -- Should there be a cancel button?,
    inputs: [{name: str, type: str, label: str, tooltip: str}] -- Self explanatory,
    custom: $DOM -- Jquery element for custom html.
}

The popup function provides a way to get input from the user.
*/

define(["jquery", "jquery-ui", "underscore", "./form2json"], function($, $ui, _, form2JSON){

    function onMorph(bounds){
        var $pop = window._popup.$popup;
        $pop.animate({
            opacity: 0
        }, { duration: 500, queue: false, complete: function(){
            $pop.remove();
        } });
    }

	return function popup(options){

    var width = 200,
        height = 105 + options.inputs.length * 35,
        bounds = { width: $(document).width(), height: $(document).height() },
        $focuser = options.morph ? window._popup.$focuser : $("<div/>").addClass("focuser"),
        $popup = $("<div/>").addClass("popup"),
        $header = $("<div/>").addClass("header"),
        $form = $("<form/>"),
        $submit = $("<button/>").addClass("submit"),
        $cancel = $("<button/>").addClass("cancel"),
        template = _.template("<label for='<%= name %>' ><%= label %></label><br/> <input name='<%= name %>' type='<%= type %>' title='<%= tooltip %>' />");

    if(options.morph) onMorph(bounds);

    $form.html(_.map(options.inputs, function(input){
        input.tooltip = input.tooltip || "";
        return template(input);
    }).join('<br/>')).css({
        margin: 10,
        "text-align": "center"
    }).find(":input").css({
        border: "2px solid #4DB8DB"
    });

    $(document).tooltip();

    $header.html("<h4>"+options.title+"</h4>").css({
        width: width,
        height: 30,
        "line-height": "30px",
        "background-color": "#4DB8DB",
        "text-align": "center",
        color: "white"
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

    $popup.css({
        position: "fixed",
        opacity: 0,
        width: 0,
        height: height,
        "background-color": "white",
        left: bounds.width / 2,
        top: (bounds.height - height) / 2,
        border: "2px solid black"
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
        if(options.custom){
            $popup.append(options.custom.css({ margin: 10}));
            $popup.height($popup.height() + options.custom.height() + 10);
        }

        console.log($popup);
    });

    if(!options.morph){
        $focuser.css({
            position: "fixed",
            width: bounds.width,
            height: bounds.height, 
            opacity: 0,
            "background-color": "black"
        })
    
        $focuser.animate({ 
            opacity: 0.5
        }, {
            queue: false,
            duration: 500
        });
    }

    window._popup = {
        $popup: $popup,
        $focuser: $focuser
    }
}
});