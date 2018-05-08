var stage;
var width,height;
var canvas;
var images;
var singleShot,tripleShot,fiveShot,oilFire,dirt,dirtRemover,straightAttack,missile,chaser;
var message = document.getElementById("message");
var send = document.getElementById("send");

if(localStorage["mode"]){
    document.getElementById("gamelevel").style.display = "none";
    if(localStorage["mode"] == "singlePlayer"){
        document.getElementById("gamelevel").style.display = "block";
    }
    document.getElementById("game").style.display = "block";    
    loadAssests();
}



// loading images and intiallising variables
function loadAssests(){
    images = new createjs.LoadQueue();
    createjs.MotionGuidePlugin.install();
    images.installPlugin(createjs.Sound);       // enabling sound preload
    images.loadFile(
        {id:"menu", src:"audio/menu.mp3"}
    );
    images.addEventListener("complete", init);
    images.loadManifest([
        {id:"grass" , src:"images/grass.jpg"},
        {id:"sky" , src:"images/sky-night.jpg"},
        {id:"terrain" , src:"images/terrain.jpg"},
        {id:"tank1" , src: "images/tank1.png"},
        {id:"tank2" , src: "images/tank2.png"},
        {id:"nozzle1" , src: "images/nozzle1.png"},
        {id:"nozzle2" , src: "images/nozzle2.png"},
        {id:"single" , src: "images/single.png"},
        {id:"multi" , src: "images/multi.png"},
        {id:"lan" , src: "images/lan.png"},
        {id:"logo" , src: "images/logo.png"}
    ]);
}


function init(){
    canvas = document.getElementById("canvas");     //canvas
    canvas.width = window.innerWidth - window.innerWidth/110;
    canvas.height = window.innerHeight - window.innerHeight/50;
    width = canvas.width;
    height = canvas.height;

    stage = new createjs.Stage("canvas");
    createjs.Ticker.addEventListener("tick", stage);
    window.addEventListener("keydown" , keyboardKeys);
    window.addEventListener("keydown",chatbox);
    window.onbeforeunload = function(event)
    {
        return confirm("Confirm refresh");
    };

    // clouding
    terrain.setSize(width,height);
    terrain.setClouds(images.getResult("sky"));
    stage.addChild(terrain.clouds);
    terrain.startClouds(100);


    // terrain
    terrain.initalizePoints();
    terrain.addPoints(7,1);
    terrain.draw(images.getResult("terrain"),images.getResult("grass"),10);
    stage.addChild(terrain.shape);


    // tanks
    game.tank1 = new tank(images.getResult("tank1"),images.getResult("nozzle1"));
    game.tank2 = new tank(images.getResult("tank2"),images.getResult("nozzle2"));


    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            game.playerOne = user.email.substring(0, user.email.lastIndexOf("@"));                                        
            game.start();
        }else{
            console.log("network error!");
        }
    });
}

function resume(level){
    document.getElementById("gamelevel").style.display = "none";
    computer.setLevel(level);    
}


//  keyboard events control
function keyboardKeys(event){
    var key = event.keyCode;

    if(message.style.display == "none" && send.style.display == "none"){

        switch(key){
            case 39:
                game.currentTank.moveForward();
                break;
            case 37:
                game.currentTank.moveBackward();
                break;
            case 38:
                game.currentTank.setNozzle(-1*game.currentTank.angle - 1);
                break;
            case 40:
                game.currentTank.setNozzle(-1*game.currentTank.angle + 1);
                break;
            case 32:
                game.weapon.fire(game.currentTank.angle,game.weapon.velocity,game.currentTank.tank.x,game.currentTank.tank.y);
                if(game.gamemode == "singlePlayer"){
                    notifyUser("It's My Turn.");
                    setTimeout(function(){
                        game.flipTurn();                    
                        computer.fire();
                        notifyUser("It's Your Turn.");
                    },5000);
                }else if(game.gamemode == "multiPlayer"){
                    game.flipTurn();
                }
                break;
            case 49:
                game.selectWeapon("singleShot");
                break;
            case 50:
                game.selectWeapon("tripleShot");
                break;
            case 51:
                game.selectWeapon("fiveShot");
                break;
            case 52:
                game.selectWeapon("oilShot");
                break;
            case 53:
                game.selectWeapon("straightShot");
                break;
            case 54:
                game.selectWeapon("missile");
                break;
            case 55:
                game.selectWeapon("chaser");
                break;
            case 107:
                game.weapon.velocity +=1;
                break;
            case 109:
                game.weapon.velocity -= 1;
                break;
        }
    }else{
        if(key == 13){
            sendMessage();
        }
    }
}


function chatbox(event){
    var key = event.keyCode;
    switch(key){
        case 192:
            if(message.style.display == "none" && send.style.display == "none"){
                message.style.display = "inline";
                send.style.display = "inline";
                message.focus();
                message.scrollIntoView();
                setTimeout(function(){message.value = "";},100);
            }else{
                message.style.display = "none";
                send.style.display = "none";
            }
    }    
}


function exitGame(){
    game.exit();
}