define(["require", "jquery", "./templates", "sat"], function(require, $, Templates, sat){

    $(document).ready(function(){
        var $window     = $(window),
            $sidebar    = $("#side-bar"),
            width       = $window.width() - $sidebar.width();

        $("#main-frame").css({
            width: $window.width() - $sidebar.width(),
            height: $window.height() - 100,
            left: $sidebar.width()
        });

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

		saturate: function(id){
		    this.$el.html(Templates.clone(id));
            sat[id]();
		}
	};
});