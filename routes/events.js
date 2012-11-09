var models = require('../../models'),
    User = models.schemas.User,
    Event = models.schemas.Event;

exports.remove = function(req, res){
	Event.remove(req.body, function(err){
		if(err) res.send(err);
	});
	res.send(success);
}