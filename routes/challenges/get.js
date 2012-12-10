var models = require("../../models"),
	Challenge = models.schemas.Challenge;

function get(req, res){
	var id = req.params.id;
	Challenge.findById(id, function(err, chall){
		if(err) res.send(err);
		else res.json(chall);
	});
}	

exports.route = get;