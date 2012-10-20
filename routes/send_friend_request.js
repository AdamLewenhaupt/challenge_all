var models = require('../models'),
    Event = models.schemas.Event;

exports.route = function(req, res){
	var sender = req.body.sender,
		target = req.body.target

	Event.findOne({ name: "friend-request", user: target, data: [sender] },
		function(err, e){
			if(err || (!e)){
				if(target && sender){
					var event = new Event();
					event.name = "friend-request";
					event.user = target;
					event.data = [sender];
					event.save(function(){
						res.send("sent");
					});
				}else{
					res.send("invalid_input");
				}
			}else{
				res.send("exists");
			}
		})
}