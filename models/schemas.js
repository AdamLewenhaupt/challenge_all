/*
Author: Adam Lewenhaupt
Keywords: Schema, Database
Description:
This file will contain all the schemas that are used in the database.
*/

var Schema = require('mongoose').Schema;

exports.User = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    tag: {type: String, required: true},
    age: {type: Number, required: true}
});