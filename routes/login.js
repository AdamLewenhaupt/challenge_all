/*
Author: Adam Lewenhaupt
Keywords: Router, Login, Ajax
Description:
Provies login support; ment to be used as ajax request.
*/

var models = require('../models'),
    User = models.schemas.User;

exports.route = function(req, res){
    
    if(req.params.length() == 0){
        res.send("No params");
    }
    
    User.findOne({ mail: req.params.mail, password: req.params.pass }, function(err, user){
        if(!err){
            res.cookie('e8701ad48ba05a91604e480dd60899a3', user._id, { maxAge: 60*60*24, httpOnly: true });
            res.send('success');
        }else{
            res.send(err);
        }
    });
}