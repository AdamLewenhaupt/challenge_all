/*
Author: Adam Lewenhaupt
Keywords: Database, Index
Description:
This is the index file of the models package that provides a interface 
to the models layer of the application.
*/

var db 		= require('./db'),
	schemas = require('./schemas');

exports.db = db;
exports.schemas = schemas;