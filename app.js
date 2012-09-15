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
    models = require('./models'),
    Newsfeed = require('./features/newsfeed/Newsfeed');

models.db.connect();

var app = express();

config.app = app;

var connections = [];

app.configure(config.dev);

//Gets
app.get('/', routes.index);
app.get('/cs_testing', routes.cs_testing);
app.get('/ss_testing', routes.ss_testing);
app.get('/ss_testing/profiles', routes.ss_testing_profiles);
app.get('/event-stream/:id', sse.eventStream);
app.get('/hello-world/:id/:to', sse.helloWorld);
app.get('/hello-world/:id', sse.helloWorld);
app.get('/sse', routes.sse_testing);

//Posts
app.post('/ss_testing/profiles', routes.ss_testing_create_profile);

//Deletes
app.del('/ss_testing/profiles/:tag', routes.ss_testing_delete_profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});