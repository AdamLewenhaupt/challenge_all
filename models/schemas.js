/*
Author: Adam Lewenhaupt
Keywords: Schema, Database
Description:
This file will contain all the schemas that are used in the database.
*/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

exports.User = mongoose.model('User',new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    tag: {type: String, required: true, unique: true},
    age: {type: Number, required: true}
}));