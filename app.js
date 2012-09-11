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

//Gets
app.get('/', routes.index);
app.get('/cs_testing', routes.cs_testing);
app.get('/ss_testing', routes.ss_testing);
app.get('/ss_testing/profiles', routes.ss_testing_profiles);

app.get('/update-stream', function(req, res){
    console.log("got new sse connection.");
    res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        "connection": "keep-alive"
    });
    
    res.write('id\n\n');
    
    connections.push(res);
    console.log("Current connections: " + connections.length);
    
    req.on('close', function(){
        console.log("closeing sse connection");
        res.end();
        removeConnection(res);
    });
});

app.get('/scream', function(req, res){
    broadcast('scream', 'Wooha');
    res.redirect('/');
});

function removeConnection(res){
    var index = connections.indexOf(res);
    connections.splice(index, 1);
    console.log("Removed connection");
    console.log("Connections:" + connections.length);
}

function sseMessage(res, event, data){
    res.write("event: " + event + "\n");
    res.write("data: " + data + "\n\n");
}

function broadcast(event, data){
    for(i = 0; i < connections.length; i++){
        sseMessage(connections[i], event, data);
    }
}

//Posts
app.post('/ss_testing/profiles', routes.ss_testing_create_profile);

//Deletes
app.del('/ss_testing/profiles/:tag', routes.ss_testing_delete_profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});