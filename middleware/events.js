var SSV = require('../ssv'),
	models = require('../models'),
	Event = models.schemas.Event;

exports.func = function(req, res, next){
	Event.find({user: req.user.tag}, function(err, doc){

		if(!err){
			SSV.add("events", doc);
			next();
		}else{
			next();
		}
	});
}