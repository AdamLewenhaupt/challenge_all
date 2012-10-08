define(["jquery", "underscore", "./form2json"], function($, _, form2JSON){
	return function popup(options){

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
        if(options.success) options.success(form2JSON($form));
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
});