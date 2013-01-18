/*
Author: Adam Lewenhaupt
Keywords: Mainframe, DOM
Description:
This is the #main-frame DOM wrapper which provides a api to the dom element.

§1:
Setup the css so that the mainframe gets the right bounds.

§2:
Make sure that if the window is resized the mainframe is aswell.

§3:
saturate(id); -- (id: mainframe content id)
Provide the saturate function which is the recommended interface when setting the mainframes content.
*/

define(["require", "jquery", "./templates", "sat"], function(require, $, Templates, sat){

    $(document).ready(function(){
        var $window     = $(window),
            $sidebar    = $("#side-bar"),
            width       = $window.width() - $sidebar.width();

        // §1
        $("#main-frame").css({
            width: $window.width() - $sidebar.width(),
            height: $window.height() - 100,
            left: $sidebar.width()
        });

        // §2
        $window.resize(function(){
            $("#main-frame").css({
            width: $window.width() - $sidebar.width(),
            height: $window.height() - 100,
            left: $sidebar.width()
        });
        });
    });

	return {
		$el: $("#main-frame"),


        // §3
		saturate: function(id){
            try{
    		    this.$el.html(Templates.clone(id));
                sat[id]();
            }catch(e){
                console.log("Error when saturating mainframe: " + e);
            }
		}
	};
});