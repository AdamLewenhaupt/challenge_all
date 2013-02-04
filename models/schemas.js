/*
Author: Adam Lewenhaupt
Keywords: Schema, Database
Description:
This file will contain all the schemas that are used in the database.

Schemas:
§1 UserSchema

§2 EventSchema

§3 AchievementSchema

§4 ChallengeSchema
*/

var mongoose = require('mongoose'),
	PasswordHash = require('phpass').PasswordHash,
	Schema = mongoose.Schema,
	SALT_WORK_FACTOR = 10;

function get_capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var passwordHash = new PasswordHash();

// §1
var AchievementSchema = new Schema({
	name: String,
	image: String,
	color: String,
	description: String
});


// §2
var userSchema = new Schema({
    fname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    lname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    tag: {type: String, required: true, unique: true, lowercase: true, trim: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: {type: String, required: true},
    friends: [String],
    achievements: [AchievementSchema]
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
		friends: self.friends,
		achievements: self.achievements
	}
}

exports.User = mongoose.model('User', userSchema);

// §3
var eventSchema = new Schema({
	name: String,
	user: String,
	data: [String]
});

exports.Event = mongoose.model('Event', eventSchema);

// §4
var ChallengeSchema = new Schema({
	name: String,
	description: String,
	rules: [String],
	users: [{ type: String, required: true, unique: true, lowercase: true, trim: true }],
	hosts: [{ type: String, required: true, unique: true, lowercase: true, trim: true }],
	isPublic: Boolean,
	date: String,
	achievements: [AchievementSchema]
});

exports.Achievement = mongoose.model('Achievement', AchievementSchema);
exports.Challenge = mongoose.model('Challenge', ChallengeSchema);