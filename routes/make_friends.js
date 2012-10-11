var models = require('../models'),
    User = models.schemas.User;

exports.route = function(req, res){
	var tag1 = req.body.tag1,
		tag2 = req.body.tag2;

	User.find().where("tag").in([tag1, tag2]).exec(function(err, doc){
		var doc1 = doc[0],
			doc2 = doc[1];

		if(doc1.friends.indexOf(doc2._id) != -1) {
			res.send("allready friends");
			return;
		}

		doc1.friends.push(doc2._id);
		doc2.friends.push(doc1._id);
		console.log(doc1.tag + " and " + doc2.tag + " are now friends.");

		doc1.save();
		doc2.save();

		res.send("success");
	});
}