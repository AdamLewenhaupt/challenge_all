/*
Author: Adam Lewenhaupt
Keywords: Schema, Database
Description:
This file will contain all the schemas that are used in the database.
*/

var mongoose = require('mongoose'),
	PasswordHash = require('phpass').PasswordHash,
	Schema = mongoose.Schema,
	SALT_WORK_FACTOR = 10;

function get_capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var passwordHash = new PasswordHash();

var userSchema = new Schema({
    fname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    lname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    tag: {type: String, required: true, unique: true, lowercase: true, trim: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: {type: String, required: true},
    friends: [String]
});

userSchema.pre('save', function(next){

	if(!this.isModified('password')) return next();

	var hash = passwordHash.hashPassword(this.password);

	this.password = hash;

	next();

});

userSchema.methods.verify = function(password, cb){
	return passwordHash.checkPassword(password, this.password);
};

userSchema.methods.getPublic = function(){
	var self = this;

	return {
		_id: self._id,
		fname: self.fname,
		tag: self.tag,
		lname: self.lname,
		email: self.email,
		friends: self.friends
	}
}

exports.User = mongoose.model('User', userSchema);