/*
Author: Adam Lewenhaupt
Keywords: Index, Jquery
Description:
Std functions on load of webpage "/"
*/
$(document).ready(function(){
    var $window     = $(window),
    $sidebar    = $("#side-bar"),
    width       = $window.width() - $sidebar.width();

	$("#templates").hide();

    $("#main-frame").css({
        width: width,
        height: $window.height() - 150,
        left: $sidebar.width()
    });

    $("#btn-social").click(function(){
        saturateMainframe("#profile-template");
    });

});