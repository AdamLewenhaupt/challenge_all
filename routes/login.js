/*
Author: Adam Lewenhaupt
Keywords: Router, Login
Description:
Provies login support; ment to be used as ajax request.
*/

var models = require('models'),
    User = models.schemas.User;

function(req, res){
    
    var valid = false;
    
    User.findOne({ mail: req.params.mail, password: req.params.pass }, function(user){
        valid = true;
        res.cookie('e8701ad48ba05a91604e480dd60899a3', user._id, { maxAge: 60*60*24, httpOnly: true });
        res.send('success');
    });
    
    if(!valid){
        res.send('err');
    }
}