/*
Author: Adam Lewenhaupt
Keywords: Layout, Jquery
Description:
Std functions on load of every webpage.
*/

$(document).ready(function(){

 	$("#ssv").hide();

	 if(hasSSV("req_login")){
        popup({
            title: "Login",
            canCancel: false,

            inputs: [
                { name: "email", type: "text", value: "Username" },
                { name: "pass", type: "password", value: "Password"}
            ],

            submit: "Login",
            success: function(e){
                login(e.email, e.pass);
            }

        });
	}
});