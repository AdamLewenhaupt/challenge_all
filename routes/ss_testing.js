var models = require ('../models'),
	User = models.schemas.User;

exports.ss_testing = function(req, res){
	res.render('ss_testing', { title: 'SS Testing' });
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