var connected = false;
var id = undefined;
var to = undefined;

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
	$("#connecter").click(function(){
		if(!connected){
			if(id = getFormFields($("#info")).id){
				connected = true;
			    var source = new EventSource('/event-stream/' + id);
			    source.addEventListener('hello', function(e){
			        $("#sse-output").append(e.data);
			    }, false);
			}else{
				alert("You need to enter a name!");
			}
		}else{
			alert("You are allready connected!");
		}
	});

	$("#sender").click(function(){
		to = getFormFields($("#info")).to;
		$.ajax({
			type: "get",
			url: ("/hello-world/" + id + "/" + to)
		});
	})
});
