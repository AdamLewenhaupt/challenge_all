/*
Author: Adam Lewenhaupt
Keywords: Database, Helper
Description:
This file serves as a wrapper for the database and provides access and helper functions.
*/

var mongoose = require('mongoose');

exports.connect = function(){
    console.log("Connecting to database.");
    return mongoose.connect('mongodb://admin:access@alex.mongohq.com:10032/challengeall', function(err){
    	if(err) console.log(error);

    });
}

exports.disconnect = function(){
    mongoose.disconnect();
    console.log("Disconnecting from database");
}