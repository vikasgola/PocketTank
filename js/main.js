var stage;
var width,height;
var canvas;
var images;
var tank1,tank2;
var singleShot,tripleShot,fiveShot,oilFire,dirt,dirtRemover,straightAttack,missile;

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
        {id:"sky" , src:"images/sky.jpg"},
        {id:"terrain" , src:"images/terrain.jpg"},
        {id:"tank1" , src: "images/tank1.png"},
        {id:"tank2" , src: "images/tank2.png"},
        {id:"single" , src: "images/single.png"},
        {id:"multi" , src: "images/multi.png"},
        {id:"lan" , src: "images/lan.png"},
        {id:"logo" , src: "images/logo.png"}
    ]);
}


function init(){
    canvas = document.getElementById("canvas");     //canvas
    canvas.width = window.innerWidth - window.innerWidth/100;
    canvas.height = window.innerHeight - window.innerHeight/50;
    width = canvas.width;
    height = canvas.height;

    stage = new createjs.Stage("canvas");
    createjs.Ticker.addEventListener("tick", stage);
    window.addEventListener("keydown" , function(ev){keyboardKeys(ev);});

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
    tank1 = new tank(images.getResult("tank1"),images.getResult("tank1"));
    tank1.indexPos = Math.floor(terrain.points.length/6);
    tank1.setPos(terrain.points[tank1.indexPos].x,terrain.points[tank1.indexPos].y);
    stage.addChild(tank1.tank);

    tank2 = new tank(images.getResult("tank2"),images.getResult("tank1"));
    tank2.indexPos = Math.floor(5*terrain.points.length/6);
    tank2.setPos(terrain.points[tank2.indexPos].x,terrain.points[tank2.indexPos].y);
    stage.addChild(tank2.tank);

    // weapons              power    color   size    gravity
    // singleshot ->        100      brown    10        10
    // tripleshot ->        80      brown    12        12
    // fiveshot ->          60      brown    13        13
    // oilshot ->           120      yellow    11        10
    // missile ->           200     red-black   15        15
    // straightAttack->     100      red        10        0
    
    singleShot = new weapon("singleShot",100,"brown",10,10);
    tripleShot = new weapon("tripleShot",80,"brown",10,10);
    fiveShot = new weapon("fiveShot",60,"brown",10,10);
    oilFire = new weapon("oilShot",120,"yellow",10,10);
    straightAttack = new weapon("straightShot",120,"black",10,0);
    missile = new weapon("missile",150,"black",13,15);
}


//  keyboard events control
function keyboardKeys(event){
    var key = event.keyCode;

    switch(key){
        case 39:
            tank1.moveForward();
            break;
        case 37:
            tank1.moveBackward();
            break;
        case 32:
            missile.move(45,100,tank1.tank.x,tank1.tank.y);
            break;
    }
}

