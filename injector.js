/*
Author: Adam Lewenhaupt
Description:
This file provides capabilites that allows client side javascript to be loaded dynamically.
*/

var injectionRouter = require('injector.json');

function injector(req, res, next){
	paths = injectionRouter[path];
	req.csPaths = paths;
	next();
}