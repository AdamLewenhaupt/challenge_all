/*
Author: Adam Lewenhaupt
Keywords: Persistent, Ajax, Client<->Server
Description:
The persistent module provides a interface from the client to the server.

§1:
login(email, password); -- ...
This function is used to login, sending a verification check to the user
and in case of success reloads with the user logged in.

§2:
createUser(fname, tag, lname, age, email, password); -- ...
This function is used to create a user: returns true if success, else false.

§3:
makeFriends(tag1, tag2); -- (tag1: a user tag, tag2: another user tag)
This function makes two users friends; returns true if successfull.
*/

define(["jquery"], function($){
	
	return {
		// §1
		login: function(tag, password){
		    $.ajax({
		        type: "get",
		        url: "/ajax/login",
		        data: {
		            tag: tag,
		            password: password
		        },

		        success: function(data){
		        	document.location="/";
		        }
		    });
		},

		// §2
		createUser: function(fname, tag, lname, email, password){
		    $.ajax({
		       type: "post",
		       url: "/ajax/create-user",
		       data: {
		           fname: fname,
		           lname: lname,
		           tag: tag,
		           email: email,
		           password: password,
		           friends: []
		       },

		       success: function(data){
		    		return true;
		       },

		       error: function(){
		       		return false;
		       }
		    });
		},

		// §3
		makeFriends: function(tag1, tag2){
			$.ajax({
				type: "post",
				url: "/ajax/make-friends",
				data: {
					tag1: tag1,
					tag2: tag2 
				},
				success: function(data){
					return true;
				}
			});
		},

		// §4
		getUser: function(tag, cb){
			$.ajax({
				type: "get",
				url: "/ajax/get-user",
				data: {
					tag: tag
				}, 

				success: function(data){
					if(typeof data === 'string'){
						if(data === "not_found"){
							cb(data, null);
						}
					}else{
						cb(null, data);
					}
				}

			})
		},

		sendFriendRequest: function(sender, target, cb){
			$.ajax({
				type: "post",
				url: "/ajax/send-friend-request",
				data: {
					sender: sender,
					target: target
				},
				success: function(data){
					if(!cb) return;
					switch(data){
						case "sent":
							cb(null);
							return;
						default:
							cb(data);
							return;
					}
				}
			});
		},

		createChallenge:function(name,description,rules,users,public,date,achievements){
		    $.ajax({
		       type: "post",
		       url: "/ajax/create-challenge",
		       data: {
		            name: String,
				    description: String,
					rules: [String],
					users: [{ type: String, required: true, unique: true, lowercase: true, trim: true }],
					public: Boolean,
					date: String,
					achievements: [{ name: String }]
		       },

		       success: function(data){
		    		return true;
		       },

		       error: function(){
		       		return false;
		       }
		    });
		}
	};

});