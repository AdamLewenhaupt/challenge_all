/*
Author: Adam Lewenhaupt
Keywords: Schema, Database
Description:
This file will contain all the schemas that are used in the database.
*/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

function get_capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.User = mongoose.model('User', new Schema({
    fname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    lname: {type: String, required: true, get: get_capitalize, lowercase: true, trim: true},
    tag: {type: String, required: true, unique: true, get: get_capitalize, lowercase: true, trim: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: {type: String, required: true},
    friends: [String]
}));