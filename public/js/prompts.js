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

define(["jquery", "./popup", "./persistent"], function($, popup, Persistent){

	var $custom = $("<div/>").html($("<a>Sign up!</a>").click(function(){
		alert("TODO");
	}));

	return {

		login: function(){	
			popup({
		        title: "Login",
		        canCancel: false,

		        inputs: [
		            { name: "email", type: "text", label: "Email", tooltip: "Your email" },
		            { name: "pass", type: "password", label: "Password", tooltip: "Your super secret password!"}
		        ],

		        submit: "Login",

		        success: function(e){
		            Persistent.login(e.email, e.pass);
		        },

		        custom: $custom
		    });
		}
	}
});