/*
Author: Adam Lewenhaupt
Keywords: Middleware, profile
Description:
This middleware provides support for the challenge all profile system.

@profile(req, res, next);
This function intercepts every request and checks if there is user information to accuire.
If there is we load it otherwise we prompt for login.
*/

var ssv = require('../ssv'),
	models = require('../models'),
	User = models.schemas.User;

exports.func = function profile(req, res, next){

		var id = req.cookies["e8701ad48ba05a91604e480dd60899a3"];
	
	    if(id){
	    	User.findOne({_id: id }, function(err, profile){
	            if(!err && profile){

	                req.user = profile;
	                ssv.add("user", JSON.stringify(req.user));

	                User.find().where('_id').in(req.user.friends).exec(function(err, doc){
	                	if(!err){
	                		req.user.c_friends = doc;
	                		ssv.add("friends", JSON.stringify(doc));
			                next();
	      				}else{
	      					next();
	      				}
                	});
	            }else{
	                next();
	            }
	    	});
	    }
		else{
		    ssv.add("req_login", "");
		    req.user = {
		    	fname: "@fname",
		    	tag: "@tag",
		    	lname: "@lname",
		    	age: "@age",
		    	friends: [],
		    	c_friends: []
		    };
	        next();
		}
}