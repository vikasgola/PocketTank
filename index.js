var express = require('express');

var socket = require("socket.io");

var app = express();

var server = app.listen(3000,function(){
    console.log("started listening to port 3000.");
});

app.use(express.static('src'));