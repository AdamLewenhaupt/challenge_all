/*
Author: Adam Lewenhaupt
Keywords: Newsfeed, Class
Description:
This file provides the Newsfeed class.
*/

var sse = require('../../sse'),
	broadcast = sse.broadcast,
	Events = sse.Events,
	EventEmitter = require('events').EventEmitter;

var Newsfeed = function(id){
	this.id = id;
	broadcast("newsfeed", id + " signed in!");
};

Newsfeed.prototype.__proto__ = EventEmitter.prototype;

sse.Events.on("connection", function(id){
	var newsfeed = new Newsfeed(id);
});