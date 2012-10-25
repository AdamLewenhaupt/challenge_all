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

models.db.connect();

var app = express();

config.app = app;

app.configure(config.dev);

//Gets
app.get('/', routes.index);
app.get('/event-stream/:id', sse.eventStream);
app.get('/ajax/login', routes.ajax.login);
app.get("/ajax/get-user", routes.ajax.get_user);
app.get("/file/:file", routes.file.get);

//Posts
app.post("/ajax/create-user", routes.ajax.create_user);
app.post("/ajax/make-friends", routes.ajax.make_friends);
app.post("/ajax/sse-send", sse.ajax_send);
app.post("/ajax/send-friend-request", routes.ajax.send_friend_request);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server up and running on port: " + app.get('port'));
});