
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    config = require('./config'),
    http = require('http'),
    path = require('path');

var app = express();

config.app = app;

app.configure(config.dev);

app.get('/', routes.index);
app.get('/cs_testing', routes.cs_testing);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});
