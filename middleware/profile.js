/*
Author: Adam Lewenhaupt
Keywords: Middleware, profile
Description:
This middleware provides support for the challenge all profile system.

@profile(req, res, next);
This function intercepts every request and checks if there is user information to accuire.
If there is we load it otherwise we prompt for login.
*/

var models = require('../models'),
	User = models.schemas.User;

exports.func = function profile(req, res, next){

	var id = req.cookies["e8701ad48ba05a91604e480dd60899a3"];

    if(id){
    	User.findOne({_id: id }, function(profile){
    		console.log(profile);
    	});
    }
	else{
	    res.ssv = "req_login";
	    req.user = {
	    	fname: "Adam",
	    	tag: "Spinno",
	    	lname: "Lewenhaupt",
	    	age: 17
	    };
	}

    next();
}