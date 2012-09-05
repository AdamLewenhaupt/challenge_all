/*
Author: Adam Lewenhaupt
Keywords: Testing, Database
Description:
This file is only used for testing database features.
*/

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:access@alex.mongohq.com:10032/challengeall');

mongoose.connection.close(function(){
    console.log("successfuly accessed db and is now closeing the connection.");
});