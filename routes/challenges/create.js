var models = require('../../models'),
	Challenge = models.schemas.Challenge;

exports.route = function(req, res){
	var chall = new Challenge(req.body);
	chall.save(function(err){
		if(err) res.send(err);
		else res.send("saved");
	});
}