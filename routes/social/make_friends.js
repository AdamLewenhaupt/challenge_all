var models = require('../../models'),
    User = models.schemas.User,
    Event = models.schemas.Event;

exports.route = function(req, res){
	var tag1 = req.body.tag1,
		tag2 = req.body.tag2;

	User.find().where("tag").in([tag1, tag2]).exec(function(err, doc){
		var doc1 = doc[0],
			doc2 = doc[1];

		if(doc1.friends.indexOf(doc2.tag) != -1) {
			res.send("allready friends");
			return;
		}

		doc1.friends.push(doc2.tag);
		doc2.friends.push(doc1.tag);
		console.log(doc1.tag + " and " + doc2.tag + " are now friends.");

		doc1.save();
		doc2.save();

		res.send("success");
	});

	Event.remove({user: tag1, name: "friend-request"}, function(err){
	});
}