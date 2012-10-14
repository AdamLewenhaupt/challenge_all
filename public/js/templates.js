define(["jquery"], function(){

    var $el = $("#templates");

    $(document).ready(function(){
        $el.hide();
    });

    return {
        $el: $el,

        clone: function(query){
            return $el.children("#"+query+"-template:first").clone();
        }
    };
});