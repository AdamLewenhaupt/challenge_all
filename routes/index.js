/*
Author: Adam Lewenhaupt
Keywords: Routing, Index
Description:
This is the index file of the routes module
and provides access to all routes.
*/

var ajax_login = require('./login'),
    ajax_create = require('./create');

exports.index = function(req, res){
    res.render('index', { title: 'Express', user: req.user, ssv: res.ssv });
}

exports.ajax = {
    login: ajax_login.route,
    create: ajax_create.route
};