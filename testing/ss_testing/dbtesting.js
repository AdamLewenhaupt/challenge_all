/*
Author: Adam Lewenhaupt
Keywords: Testing, Database
Description:
This file is only used for testing database features.
*/

var db = require('../../models').db;

db.connect();
db.disconnect();