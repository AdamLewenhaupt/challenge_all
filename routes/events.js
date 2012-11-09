var models = require('../../models'),
    User = models.schemas.User,
    Event = models.schemas.Event;

exports.remove = function(req, res){
	var tag = req.body.tag;
	Event.remove({user: tag, name: "friend-request"}, function(err){
		if(err) res.send(err);
	});
	res.send(success);
}