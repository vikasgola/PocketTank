var express = require('express');

var socket = require("socket.io");

var app = express();

var server = app.listen(3000,function(){
    console.log("started listening to port 3000.");
});

app.use(express.static('src'));

var io = socket(server);

io.on('connection',function(socket){
    socket.on('create', function(room) {
        socket.join(room);
        console.log("room " + room + " created.");    
    });

    socket.on('join', function(room) {

        io.in(room.hostkey).clients((err, clients) => {
            var clientn =  clients.length;
            console.log(clients.length);
            if(clientn == 1){
                socket.join(room.hostkey);
                io.in(room.hostkey).emit("replyJoined",room);
                console.log("player joined in room " + room.hostkey);
            }else{
                socket.emit("notJoined","sry");
            }
    
        });        

    });

    socket.on("chat",function(data){
        io.sockets.in(data.hostkey).emit("chat",data);
    });

    socket.on("turn",function(data){
        io.sockets.in(data.hostkey).emit("turn",data);
    });

    socket.on("startingData" , function(data){
        console.log(data);
        io.in(data.room).emit("startingData",data);
    });
});