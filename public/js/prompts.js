/*
Author: Adam Lewenhaupt
Keywords: Prompts, API
Description:
The Prompts interface is the gateway between the user and the client-side.

§1:
login()
The login function is a premade popup request that prompts the user for login and on 
success calls the Persistent.login [./persistent.js].
*/

define(["./popup", "./persistent"], function(popup, Persistent){
	return {
		login: function(){	
			popup({
		        title: "Login",
		        canCancel: false,

		        inputs: [
		            { name: "email", type: "text", label: "Username", tooltip: "Your username" },
		            { name: "pass", type: "password", label: "Password", tooltip: "Your super secret password!"}
		        ],

		        submit: "Login",
		        success: function(e){
		            Persistent.login(e.email, e.pass);
		        }
		    });
		}
	}
});