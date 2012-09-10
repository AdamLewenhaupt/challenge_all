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
    models = require('./models'),
    redis = require('redis');

models.db.connect();

var app = express();

config.app = app;

app.configure(config.dev);
var publisherClient = redis.createClient(process.env.PORT, process.env.IP);

//Gets
app.get('/', routes.index);
app.get('/cs_testing', routes.cs_testing);
app.get('/ss_testing', routes.ss_testing);
app.get('/ss_testing/profiles', routes.ss_testing_profiles);
app.get('/update-stream', function(req, res){
    req.socket.setTimeout(Infinity);
    var messageCount = 0;
    var subscriber = redis.createClient();
    subscriber.subscribe('updates');
    
    subscriber.on('error', function(err){
        console.log("SSE error: " + err);
    })
    
    subscriber.on('message', function(channel, message){
        messageCount++;
        res.write('id: ' + messageCount + "\n");
        res.write('data: ' + message + "\n\n");
    });
    
    res.writeHead(200, {
        "Content-Type": "text/eventstream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });
    
    res.write('\n');
    
    req.on('close', function(){
        subscriber.unsubscribe();
        subscriber.quit();
    });
});

app.get('/fire-event/:eventName', function(req, res){
    publisherClient.publish('updates', '"' + req.params.eventName + '" page visited');
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('All clients has received: ' + req.params.eventName);
    res.end();
});

//Posts
app.post('/ss_testing/profiles', routes.ss_testing_create_profile);

//Deletes
app.del('/ss_testing/profiles/:tag', routes.ss_testing_delete_profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});
