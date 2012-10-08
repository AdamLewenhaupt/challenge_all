define(["jquery"], function($){

	return function form2JSON(form){
	    var retval = {},
	        vals = form.children("input")
		        .map(function(){ 
		            	return [$(this).attr("name"), $(this).val()];
		             });

	    for(i = 0; i < vals.length; i+=2){
	        retval[vals[i]] = vals[i+1];
	    }
	    return retval;
	}
});