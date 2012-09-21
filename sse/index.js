/*
Author: Adam Lewenhaupt
Keywords: Index, Server-side Events
Description:
This is the index file of the sse module which provides
a api to the websites sse utilities.
*/

var EventEmitter = require('events').EventEmitter,
    connections = [],
    connectionIds = {};

exports.Events = new EventEmitter();

exports.eventStream =  function(req, res){
    
    if(req.headers.accept == "text/event-stream"){
        res.id = req.params.id;
        
        res.writeHead(200, {
            "content-type": "text/event-stream",
            "cache-control": "no-cache",
            "connection": "keep-alive"
        });
        
        res.write('id\n\n');
        
        connectionIds[res.id] = connections.length;
        connections.push(res);
        exports.Events.emit("connection", req.params.id);
        console.log("Established connection to: '" +  req.params.id + "'");
        console.log("Connections: " + connections.length);
        
        req.on('close', function(){
            removeConnection(res);
        });    
    }else{
        res.write("Error: your browser does not support Server-side events");
        res.end();
    }
}

function removeConnection(res){
    var index = connections.indexOf(res);
    connections.splice(index, 1);
    delete connectionIds[res.id];
    console.log("Connection to '" + res.id + "' terminated");
    console.log("Connections:" + connections.length);
    res.end();
}

function sseMessage(res, event, data){
    res.write("event: " + event + "\n");
    res.write("data: " + data + "\n\n");
}

function broadcast(event, data, id){
    if(typeof id === 'undefined'){
        for(var i = 0; i < connections.length; i++){
            sseMessage(connections[i], event, data);
        }  
    }else{
        if(typeof connectionIds[id] != "undefined")
            sseMessage(connections[connectionIds[id]], event, data);
        else
            return false;
    }

    return true;
}

exports.helloWorld = function(req, res){
    if(broadcast("hello", "<script type='text/javascript'>alert('hello from "+req.params.id+"')</script>", req.params.to)){
        res.write("Sent a message to: " +  req.params.to);
    }else{
        res.send(400);
    }
    res.end();
}

exports.broadcast = broadcast;