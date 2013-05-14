var models = require("../../models"),
	_ = require('underscore'),
	Challenge = models.schemas.Challenge;

function getField (field) {
	return function(target) {
		return target[field];	
	}
}

function get(req, res){

	Challenge.find({ }, function (err, challenges){

		var id = getField("_id");

		var retval = challenges.map(id);

		res.send(retval);
	});
}

function internal (fn){
	Challenge.find({ }, function (err, challenges){

		var id = getField("_id");

		var retval = challenges.map(id);

		fn(retval);
	});
}	

exports.route = get;
exports.internal = internal;