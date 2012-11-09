/*
Author: Adam Lewenhaupt
Keywords: Routing, Index
Description:
This is the index file of the routes module
and provides access to all routes.
*/

var ajax_login = require('./social/login'),
    ajax_create_user = require('./social/create_user'),
    ajax_make_friends = require('./social/make_friends'),
    ajax_get_user = require("./social/get_user"),
    ajax_send_friend_request = require("./social/send_friend_request"),
    ajax_create_challenge = require('./challenges/create'),
    events = require("./events");

exports.index = function(req, res){
    res.render('index', { 
        title: 'Challenge All', 
        user: req.user, 
        ssv: res.ssv
    });
}

exports.ajax = {
	get_user: ajax_get_user.route,
    login: ajax_login.route,
    create_user: ajax_create_user.route,
    make_friends: ajax_make_friends.route,
    send_friend_request: ajax_send_friend_request.route,
    create_challenge: ajax_create_challenge.route,
    remove_event: events.remove
};

exports.file = require("./file");
