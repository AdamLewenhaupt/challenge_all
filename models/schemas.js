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
    age: {type: Number, required: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: {type: String, required: true},
    friends: [String]
});

userSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')) return next();

	var hash = passwordHash.hashPassword(user.password);

});

userSchema.methods.verify = function(password, cb){
	return passwordHash.checkPassword(password, this.password);
};

exports.User = mongoose.model('User', userSchema);