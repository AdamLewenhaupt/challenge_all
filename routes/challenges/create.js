var models = require('../../models'),
	_ = require('underscore'),
	Challenge = models.schemas.Challenge,
	Achievement = models.schemas.Achievement;

exports.route = function(req, res){
	var chall = new Challenge(req.body);
	chall.achievements = _.map(chall.achievements, function(a){
		return new Achievement(a);
	});

	chall.save(function(err){
		if(err) res.send(err);
		else res.send("saved");
	});
}