/*
Author: Adam Lewenhaupt
Keywords: API, Templates.
Description:
The templates api provides a interface to the templates DOM element.

§1:
clone(query); -- (query: the mainframe content id).
This function is used to get a clone of the template that is linked to said id.
*/

define(["jquery"], function(){

    var $el = $("#templates");

    $(document).ready(function(){
        $el.hide();
    });

    return {
        $el: $el,

        // §1
        clone: function(query){
            return $el.children("#"+query+"-template:first").clone();
        }
    };
});