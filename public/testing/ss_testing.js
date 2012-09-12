function getFormFields(form){
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

$(document).ready(function(){
	$("#add-user").click(function(){
		$("#output").load("/ss_testing/profiles",
			getFormFields($("#add-form")));
	});

	$("#del-user").click(function(){
		tag = getFormFields($("#del-form")).tag;
		$.ajax({
			type: "DELETE",
			url: "/ss_testing/profiles/" + tag,
			context: $("#output")
		}).done(function(msg){
			this.html(msg);
		});
	})
    
    var source = new EventSource('/event-stream/adam');
    source.addEventListener('hello', function(e){
        $("#sse").append(e.data);
    }, false);
});