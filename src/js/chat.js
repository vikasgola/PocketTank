
var socket = io.connect("http://localhost:3000");
var output = document.getElementById("output");
var chat = document.getElementById("chat-window");

var message = document.getElementById("message");
var send = document.getElementById("send");

message.style.display = "none";
send.style.display = "none";

function sendMessage(){
    var message = document.getElementById("message");
    socket.emit("chat",{ email:firebase.auth().currentUser.email.substring(0, firebase.auth().currentUser.email.lastIndexOf("@")) , message:message.value});

    message.value = "";
    setTimeout(function(){
        chat.scrollTop = chat.scrollHeight-chat.clientHeight;
    },100);
}

socket.on("chat",function(data){
    output.innerHTML += "<p><strong>"+ data.email +"</strong>: " + data.message + "</p>";
});


function notifyUser(message){
    output.innerHTML += "<p><strong>Computer</strong>: " + message + "</p>";
    setTimeout(function(){
        chat.scrollTop = chat.scrollHeight-chat.clientHeight;
    },100);
}