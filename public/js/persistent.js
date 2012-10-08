define(["jquery"], function($){

	return {
		login: function(email, password){
		    $.ajax({
		        type: "get",
		        url: "/ajax/login",
		        data: {
		            email: email,
		            password: password
		        }
		    });
		},

		create: function(fname, tag, lname, age, email, password){
		    $.ajax({
		       type: "post",
		       url: "/ajax/create",
		       data: {
		           fname: fname,
		           lname: lname,
		           tag: tag,
		           age: age,
		           email: email,
		           password: password
		       }
		    });
		}
	};

});