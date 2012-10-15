/*
Author: Adam Lewenhauppt
Keywords: Config, Helper.
Description:
This is where the server configurations are set.
*/

var express = require('express'),
    path    = require('path'),
    middleware = require('./middleware');

function std(app){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', middleware.profile);
}

function dev(){
    var app = exports.app;
    std(app);
    app.use(express.errorHandler());
}

exports.dev = dev;