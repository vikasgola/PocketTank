var stage;
var points = [],len;
var graphics;
var width,height;
var terrain,sky;
var canvas;
var images;
var tank1,tank2 , tank1Pos;
var single, multi,lan;
var menuSound;
var username , username2 , pocketTank;
var user = " ";

// loading images and intiallising variables
function loadAssests(usertemp){
    user = usertemp;
    images = new createjs.LoadQueue();
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
    ]);
}


// Pre setUup for playing the game
function init() {
    canvas = document.getElementById("canvas");     //canvas
    canvas.width = window.innerWidth - window.innerWidth/50;
    canvas.height = window.innerHeight - window.innerHeight/50;
    width = canvas.width;
    height = canvas.height;

    pocketTank = new createjs.Text("Pocket Tank", width/12+"px Arial", "#000");       // me    
    username = new createjs.Text(user, width/30+"px Arial", "#fff");       // me
    username2 = new createjs.Text(user, width/30 +"px Arial", "#fff");      //you
    
    stage = new createjs.Stage("canvas");
    createjs.Ticker.addEventListener("tick", stage);
    
    clouding(); 
    drawTerrain();
    drawTanks();
    drawMenu();
    drawTexting("me");

}

//  keyboard events control
function keyboardKeys(event){
    var key = event.keyCode;
    if(key == 39){
        if(tank1Pos < points.length/3){
            createjs.Tween.get(tank1).to({x:points[tank1Pos + 1].x - 30, y:points[tank1Pos + 1].y -50 }, 100);
            tank1Pos +=1;
        }
    }else if(key == 37){
        if(tank1Pos > 5){
            createjs.Tween.get(tank1).to({x:points[tank1Pos - 1].x - 30, y:points[tank1Pos - 1].y -50 }, 100);
            tank1Pos -=1;
        }
    }
}


//  Writing texts on screen
function drawTexting(player){

    var t = new createjs.Text("Username:" ,"20px Arial", "#fff" );
    
    if(player != "me"){
        username2.text = player;
        username2.x = 17*width/20;
        username2.y = height/15;
        t.x = 33*width/40;
        t.y = height/30;    
        stage.addChild(username2);
    }else{
        username.x = width/20;
        username.y = height/15;
        t.x = width/40;
        t.y = height/30;    
        pocketTank.x = width/2 - width/6;
        pocketTank.y = height - height/5;
        stage.addChild(username);    
    }
    stage.addChild(t);
}


//      showing menu
function drawMenu(){
    menuSound = createjs.Sound.play("menu", {loop: -1});    // infinte loop of sound on menu
    
    single = new createjs.Bitmap(images.getResult("single"));
    multi = new createjs.Bitmap(images.getResult("multi"));
    lan = new createjs.Bitmap(images.getResult("lan"));

    single.x = width/2 - 100;
    multi.x = width/2 - 100;
    lan.x = width/2 - 120;

    single.y = height/2 - 160;
    multi.y = height/2 - 80;
    lan.y = height/2;

    single.addEventListener("click" , function(){
        singlePlayerMode();
    } );

    stage.addChild(single);
    stage.addChild(multi);
    stage.addChild(lan);
}


// ------------------different modes-----------------------------

function singlePlayerMode(){
    drawTexting("computer");
    
    // menuSound.stop();
    stage.removeChild(pocketTank);
    stage.removeChild(single);
    stage.removeChild(multi);
    stage.removeChild(lan);
    window.addEventListener("keydown" , function(ev){keyboardKeys(ev);});
    
    

}



function clouding(){
    sky = new createjs.Shape();
    sky.graphics.beginBitmapFill(images.getResult("sky")).drawRect(0 ,0 , 2*width, height);
    stage.addChild(sky);

    var forth = function(){
        createjs.Tween.get(sky).to({x:-width} ,20000).call(back);
    };

    var back = function(){
        createjs.Tween.get(sky).to({x:0} ,20000).call(forth);
    };

    forth();
}

function randomBetween(min , max){
    return Math.random()*(max-min + 1) + min;
}


// -------------------------terrain---------------------
function addPoints(){
    len = points.length;
    for(var i=0;i<len-1;i++){
        if(points[i+1].x - points[i].x > 5 ){
            var sy = (points[i+1].y < points[i].y)? {smaller:points[i+1].y ,bigger:points[i].y } : {smaller:points[i].y ,bigger:points[i+1].y };
            points.push({x:(points[i].x + points[i+1].x)/2 , y:randomBetween(sy.smaller , sy.bigger)});
        }
    }
    points.sort(function(point1, point2){return point1.x - point2.x;});
}

function drawTerrain(){

    terrain = new createjs.Shape();

    points.push({x:-100 , y:height});
    for(var i=1;i<11;i++){
        if(i == 5){
            points.push({x:canvas.width*i/10 , y:randomBetween(50 , canvas.height/2) });
        }else{
            points.push({x:canvas.width*i/10 , y:randomBetween(canvas.height/3 , canvas.height/1.15) });
        }
    }

    addPoints();
    addPoints();
    addPoints();
    addPoints();

    len = points.length;

    terrain.graphics.setStrokeStyle(20);
    terrain.graphics
    .beginBitmapFill(images.getResult("terrain"))
    .beginBitmapStroke(images.getResult("grass"))
        .moveTo(points[0].x , points[0].y);
    for(i=1;i<len;i++){
        terrain.graphics.lineTo(points[i].x , points[i].y);
    }
    terrain.graphics.lineTo(width+50 , height);
    terrain.graphics.endStroke();
    stage.addChild(terrain);    
}

// ----------------------------tanks-------------------------------

function drawTanks(){
    len = points.length;    
    tank1 = new createjs.Bitmap(images.getResult("tank1"));
    tank2 = new createjs.Bitmap(images.getResult("tank2"));
    
    tank1Pos = Math.floor(len/6);
    tank1.x = points[tank1Pos].x - 50;
    tank1.y = points[tank1Pos].y - 50;

    tank2.x = points[Math.floor(5*len/6)].x - 50;
    tank2.y = points[Math.floor(5*len/6)].y - 50;

    stage.addChild(tank2);
    stage.addChild(tank1);    
}