var models = require ('../models'),
	User = models.schemas.User;

exports.ss_testing = function(req, res){
	res.render('testing/ss_testing', { title: 'SS Testing' });
}

exports.ss_testing_profiles = function(req, res){
	res.format({
		html: function(req,res){
			res.send("<a href='/'>like a boss</a>");
		},

		json: function(req,res){
			res.send({name: "testing"});
		}
	});
}

exports.create_profile = function(req,res){
	user = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		tag: req.body.tag,
		age: req.body.age
	});

	user.save(function(err){
		if(!err){
			console.log("created user:");
			console.log(user);
		}else{
			console.log("A error occured.");
		}

		res.json(user);
	});
}

exports.delete_profile = function(req, res){
	return User.findOne({tag: req.params.tag}, function(err, user){
		if(!err && user){
			return user.remove(function(err){
				if(!err){
					console.log("Removed user:" + req.params.tag);
					res.send('success');
				}else{
					console.log("A error occured when trying to remove user: " + req.params.tag);
				}
			});
		}else{
			console.log("No such user exists");
			res.send('no-user');
		}
	});
}

exports.sse_testing = function(req, res){
	res.render('testing/ss_sse', {title: "SSE Testing"});
}