/*
Author: Adam Lewenhaupt
Keywords: Schema, Database
Description:
This file will contain all the schemas that are used in the database.
*/

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema,
	SALT_WORK_FACTOR = 10;

function get_capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var userSchema = new Schema({
    fname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    lname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    tag: {type: String, required: true, unique: true, get: get_capitalize, lowercase: true, trim: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: {type: String, required: true},
    friends: [String]
});

userSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){

			if(err) return next(err);

			user.password = hash;
			next();

		});
	});
});

userSchema.methods.verify = function(password, cb){
	bcrypt.compare(password, this.password, cb);
};

exports.User = mongoose.model('User', userSchema);