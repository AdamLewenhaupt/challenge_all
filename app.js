/*
Author: Adam Lewenhaupt
Keywords: Main, Server
Description:
This file lanuches the server.
*/

var express = require('express'),
    routes = require('./routes'),
    config = require('./config'),
    http = require('http'),
    models = require('./models');

models.db.connect();

var app = express();

config.app = app;

app.configure(config.dev);
//var publisherClient = redis.createClient(process.env.PORT, process.env.IP);

//Gets
app.get('/', routes.index);
app.get('/cs_testing', routes.cs_testing);
app.get('/ss_testing', routes.ss_testing);
app.get('/ss_testing/profiles', routes.ss_testing_profiles);

//Posts
app.post('/ss_testing/profiles', routes.ss_testing_create_profile);

//Deletes
app.del('/ss_testing/profiles/:tag', routes.ss_testing_delete_profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});
