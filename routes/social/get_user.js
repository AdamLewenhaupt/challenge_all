var models = require('../../models'),
    User = models.schemas.User;

exports.route = function(req, res){

    User.findOne({ tag: req.query.tag }, function(err, user){
        if(user){
            res.send(user.getPublic());
        }else{
            res.send("not_found");
        }
    });
}