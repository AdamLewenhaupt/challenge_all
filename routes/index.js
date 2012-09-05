/*
Author: Adam Lewenhaupt
Keywords: Routing, Index
Description:
This is the index file of the routes module
and provides access to all routes.
*/

var cs_testing = require('./cs_testing');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.cs_testing = cs_testing.cs_testing;