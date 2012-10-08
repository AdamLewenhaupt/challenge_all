define(["./popup", "./persistent"], function(popup, Persistent){
	return {
		login: function(){	
			popup({
		        title: "Login",
		        canCancel: false,

		        inputs: [
		            { name: "email", type: "text", value: "Username" },
		            { name: "pass", type: "password", value: "Password"}
		        ],

		        submit: "Login",
		        success: function(e){
		            Persistent.login(e.email, e.pass);
		        }
		    });
		}
	}
});