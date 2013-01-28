var models = require("../../models"),
	User = models.schemas.User;

function post(req, res){
	var tag = req.body.tag,
		achievement = req.body.achievement;

	User.findOne({tag: tag }, function(err, user){
		if(err) res.send(err);
		else{
			if(!user.achievements) user.achievements = [];
			user.achievements.push(achievement);
			user.save(function(err){
				if(err) res.send(err);
				else{
					res.send("saved");
				}
			});
		}
 	});
}

exports.route = post;