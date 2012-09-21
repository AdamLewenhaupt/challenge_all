/*
Author: Adam Lewenhaupt
Keywords: Routing, Index
Description:
This is the index file of the routes module
and provides access to all routes.
*/

var cs_testing = require('./cs_testing'),
	ss_testing = require('./ss_testing'),
    mainframe = require('./mainframe');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//CS Testing
exports.cs_testing = cs_testing.cs_testing;

//SS Testing
exports.ss_testing = ss_testing.ss_testing;
exports.ss_testing_profiles = ss_testing.ss_testing_profiles;
exports.ss_testing_create_profile = ss_testing.create_profile;
exports.ss_testing_delete_profile = ss_testing.delete_profile;
exports.sse_testing = ss_testing.sse_testing;

//Mainframe
exports.mainframe_index = mainframe.index;