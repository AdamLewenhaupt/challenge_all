define(["jquery"], function($){

	return {
		login: function(email, password){
		    $.ajax({
		        type: "get",
		        url: "/ajax/login",
		        data: {
		            email: email,
		            password: password
		        },

		        success: function(data){
		        	window._user = data;
		        }
		    });
		},

		createUser: function(fname, tag, lname, age, email, password){
		    $.ajax({
		       type: "post",
		       url: "/ajax/create",
		       data: {
		           fname: fname,
		           lname: lname,
		           tag: tag,
		           age: age,
		           email: email,
		           password: password,
		           friends: []
		       },

		       success: function(data){
		    		
		       }
		    });
		},

		makeFriends: function(tag1, tag2){
			$.ajax({
				type: "post",
				url: "/ajax/make-friends",
				data: {
					tag1: tag1,
					tag2: tag2 
				}
			});
		}
	};

});