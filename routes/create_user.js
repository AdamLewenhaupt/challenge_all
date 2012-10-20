/*
Author: Adam Lewenhaupt
Keywords: Router, Create, Ajax
Description:
This module provides the create user route.
*/

var models = require('../models'),
    User = models.schemas.User;

exports.route = function(req, res){

    var user = new User(req.body);

    user.save(function(err){
    	if(!err){
    		res.send("success");
    		console.log("Created user: " + user.tag);
    	}else{
    		console.log("Error creating user: " + err);
    		res.send("err");
    	}
    });
}