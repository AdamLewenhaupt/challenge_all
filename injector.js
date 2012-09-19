/*
Author: Adam Lewenhaupt
Description:
This file provides capabilites that allows client side javascript to be loaded dynamically.
*/

var injectionRouter = require('./js-injection.json'),
	path 			= require('path');

function inject(req, res, next){

	var regex = req.route.regexp,
		matches = [],
		paths = [];

	for(route in injectionRouter){
		if(route.match(regex)){
			matches.push(route);
		}
	}

	for(var i = 0; i < matches.length; i++){
		for(var j = 0; j < injectionRouter[matches[i]].length; j++){
			var cpath = injectionRouter[matches[i]][j];
			var p = path.join("/javascripts/", cpath);
			paths.push(p);
		}
	}

	req.injections = paths;
	next();
}

exports.inject = inject;