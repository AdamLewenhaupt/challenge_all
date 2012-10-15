/*
Author: Adam Lewenhaupt
Keywords: SSV, API, Server-Sent-Variables
Description:
The SSV API provides a interface to the server-sent-variables
which is a way to provide information from the server without
using ajax or get.

§1:
has(query); -- (query: the name of the ssv).
Used to check if a SSV exists.

§2:
get(query); -- (query: the name of the ssv).
Used to get the value of a SSV.
*/

define(["jquery", "underscore"], function($, _){

    $(document).ready(function(){
        window._ssv = [];

            $(".ssv").each(function(){
                if($(this).is(".json")){
                    window._ssv.push({
                        name: $(this).attr("name"),
                        value: $.parseJSON($(this).html())
                    });
                }else{
                    window._ssv.push({
                        name: $(this).attr("name"),
                        value: $(this).html()
                    });
                }
            });
    });

    return {
    	has: function(query){ 
    		return _.any(window._ssv, function(e){ return e.name == query });
    	},

    	get: function(query){
    		if(this.has(query)){
    			return _.find(window._ssv, function(e){ return e.name == query }).value;
    		}else{
    			return undefined;
    		}
    	}
    };
});