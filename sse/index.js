/*
Author: Adam Lewenhaupt
Keywords: Index, Server-side Events
Description:
This is the index file of the sse module which provides
a api to the websites sse utilities.
*/

var connections = [];
var connectionIds = {};

exports.eventStream =  function(req, res){
    res.id = req.params.id;
    
    res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        "connection": "keep-alive"
    });
    
    res.write('id\n\n');
    
    connectionIds[res.id] = connections.length;
    connections.push(res);
    console.log("Established connection to: '" +  req.params.id + "'");
    console.log("Connections: " + connections.length);
    
    req.on('close', function(){
        res.end();
        removeConnection(res);
    });
}

function removeConnection(res){
    var index = connections.indexOf(res);
    connections.splice(index, 1);
    delete connectionIds[res.id];
    console.log("Connection to '" + res.id + "' terminated");
    console.log("Connections:" + connections.length);
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
        sseMessage(connections[connectionIds[id]], event, data);
    }
}

exports.helloWorld = function(req, res){
    broadcast("hello", "<button>hello world from: " + req.params.id + "</button>", req.params.to);
    res.write("Sent a message to: " +  req.params.to);
    res.end();
}