/*
Author: Adam Lewenhaupt
Keywords: Router, Login, Ajax
Description:
Provies login support; ment to be used as ajax request.
*/

var models = require('../../models'),
    User = models.schemas.User;

exports.route = function(req, res){
    User.findOne({ email: req.query.email }, function(err, user){
        if(!err && user){
        	if(user.verify(req.query.password)){

        			res.cookie('e8701ad48ba05a91604e480dd60899a3', user["_id"], { maxAge: 60*60*24, httpOnly: true });
        			res.send(user);
        	}else{
                res.send("auth_err");
            }
        }else{
            res.send("user_err");
        }
    });
}