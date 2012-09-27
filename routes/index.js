/*
Author: Adam Lewenhaupt
Keywords: Routing, Index
Description:
This is the index file of the routes module
and provides access to all routes.
*/

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};