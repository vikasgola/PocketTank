
var menu = function(){
    this.mode;
    this.setMode = function(mode){
        this.mode = mode;
    };
}

function singlePlayer(){
    menu.mode = "singlePlayer";
    window.location.pathname = "../index.html";
}


function multiPlayer(){
    menu.mode = "multiPlayer";    
    window.location.pathname = "../index.html";
}

function lanMultiplayer(){
    menu.mode = "lanMultiplayer";
    window.location.pathname = "../index.html";
}