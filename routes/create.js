/*
Author: Adam Lewenhaupt
Keywords: Router, Create, Ajax
Description:
This module provides the create user route.
*/

var models = require('models'),
    User = models.schemas.User;

exports.route = function(req, res){
    User.create(req.params, function(err, user){
        if(err){
            console.log(err);
        }else{
            console.log("Created user: " + user.fname);
        }
    });
}