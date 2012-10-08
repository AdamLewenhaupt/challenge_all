define(["jquery"], function($){
    return {
    	init: function(){ 
    		window._ssv = $("#ssv").html().split('|'); 
    },
    	has: function(query){ return _ssv.indexOf(query) != -1; }
    };
});