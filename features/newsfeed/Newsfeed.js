/*
Author: Adam Lewenhaupt
Keywords: Newsfeed, Class
Description:
This file provides the Newsfeed class.
*/

var broadcast = require('../../sse').broadcast;
	events = require('events'),
	EventEmitter = events.EventEmitter;

var Newsfeed = function(){
	broadcast("newsfeed", "this is a newsfeed");
};

Newsfeed.prototype.__proto__ = EventEmitter.prototype;

exports = new Newsfeed();