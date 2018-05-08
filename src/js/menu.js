function singlePlayer(){
    localStorage["mode"] = "singlePlayer";
    window.location.pathname = "../index.html";
}


function multiPlayer(){
    localStorage["mode"] = "multiPlayer";    
    window.location.pathname = "../index.html";
}

function lanMultiplayer(){
    localStorage["mode"] = "lanMultiplayer";
    window.location.pathname = "../index.html";
}