/*
Author: Adam Lewenhaupt
Keywords: Main, Server
Description:
This file lanuches the server.
*/

var express = require('express'),
    routes = require('./routes'),
    config = require('./config'),
    sse = require('./sse'),
    http = require('http'),
    models = require('./models');

//models.db.connect();

var app = express();

config.app = app;

app.configure(config.dev);

//Gets
app.get('/', routes.index);
app.get('/event-stream/:id', sse.eventStream);
app.get('/sse', routes.sse_testing);
app.get('/ajax/login', routes.ajax.login);

//Posts
app.post('/ajax/create', routes.ajax.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});