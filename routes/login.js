/*
Author: Adam Lewenhaupt
Keywords: Router, Login, Ajax
Description:
Provies login support; ment to be used as ajax request.
*/

var models = require('../models'),
    User = models.schemas.User;

exports.route = function(req, res){
    console.log(req.query.email);
    console.log(req.query.password);
    User.findOne({ email: req.query.email, password: req.query.password }, function(err, user){
        if(!err && user){
            res.cookie('e8701ad48ba05a91604e480dd60899a3', user["_id"], { maxAge: 60*60*24, httpOnly: true });
            res.send('success');
        }else{
            res.send(err);
        }
    });
}