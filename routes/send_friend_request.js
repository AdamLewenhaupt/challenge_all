var models = require('../models'),
    Event = models.schemas.Event;

exports.route = function(req, res){
	var sender = req.body.sender,
		target = req.body.target

	Event.findOne({ name: "friend-request", user: sender, data: [target] },
		function(err, event){
			if(err){
				var event = new Event();
				event.name = "friend-request";
				event.user = sender;
				event.data = [target];
				event.save(function(){
					res.send("sent");
				});
			}else{
				res.send("exists");
			}
		})
}