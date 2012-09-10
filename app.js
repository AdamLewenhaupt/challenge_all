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

var connections = [];

app.configure(config.dev);
<<<<<<< HEAD
//var publisherClient = redis.createClient(process.env.PORT, process.env.IP);
=======
>>>>>>> 7fd79a49d01ed5d97af522c0e086550891d62c7c

//Gets
app.get('/', routes.index);
app.get('/cs_testing', routes.cs_testing);
app.get('/ss_testing', routes.ss_testing);
app.get('/ss_testing/profiles', routes.ss_testing_profiles);
<<<<<<< HEAD

app.get('/update-stream', function(req, res){
    console.log("got new sse connection.");
    res.writeHead(200, {
        "content-type": "text/html",
        "cache-control": "no-cache",
        "connection": "keep-alive"
    });
    
    res.write('id\n\n');
    
    connections.push(res);
    console.log("Current connections: " + connections.length);
    
    req.on('close', function(){
        console.log("closeing sse connection");
        res.end();
        connections = connections.remove(res);
    });
});

app.get('/scream', function(req, res){
    for(var response in connections){
        response.write('event: scream\n');
        response.write('data: Everybody hears the scream!\n\n');
    }
});
=======
>>>>>>> 7fd79a49d01ed5d97af522c0e086550891d62c7c

//Posts
app.post('/ss_testing/profiles', routes.ss_testing_create_profile);

//Deletes
app.del('/ss_testing/profiles/:tag', routes.ss_testing_delete_profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});
