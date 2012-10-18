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
		popup({
			morph: true,
			canCancel: false,

			title: "Create account",

			inputs: [
				{ name: "fname", type: "text", label: "First name", tooltip: "Your first name" },
				{ name: "lname", type: "text", label: "Last name" tooltip: "Your last name" },
				{ name: "tag", type: "text", label: "Tag", tooltip: "Your tag, Make it special!"},
				{ name: "password", type: "password", label: "Password", "Your super secret password!" },
				{ name: "password2", type: "password", label: "Password verification", "Just making sure"},
				{ name: "email", type: "text", label: "Email", tooltip: "Pick an email you will remember"}
			],

			submit: "Create account",

			success: function(e){
				if(e.password === e.password2){
					Persistent.createUser(e.fname, e.tag, e.lname, e.email )
				}
			}
		});
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