var share = new function(){
    this.youare;
    this.socket = io.connect(window.location.origin);
    

    this.setYouare= function(m){
        this.youare = m;
    };

    this.hostkey = 0;

    this.host = function(){
        this.hostkey = Math.floor(randomBetween(1000000,9999999));
        socket.emit("create",this.hostkey);
        this.replies();
    };

    // this.startData = 

    this.replies = function(){
        socket.on("replyJoined" ,function(data){
            if(share.youare == "host"){
                game.text2.text = data.name;
                socket.emit("startingData",{room: share.hostkey ,terrainPoints:terrain.points,name:game.playerOne});
            }else if(share.youare == "join"){
                share.hostkey = data.hostkey;
                document.getElementById("hostkey").style.display = "none";
            }
        });

        socket.on("startingData", function(data){
            if(share.youare == "join"){
                terrain.points = data.terrainPoints;
                game.playerTwo = game.playerOne;
                game.playerOne = data.name;
                game.start();
    
                share.turn(game.turn);
                
            }
        });


        socket.on("turn", function(data){
            game.turn = data.turn;
            if(game.turn == 0){
                game.currentTank = game.tank1;                
                notifyUser("It's " + game.playerOne + " turn.");            
            }else{
                game.currentTank = game.tank2;            
                notifyUser("It's " + game.playerTwo + " turn.");            
            }
        });

        socket.on("fliped", function(data){
            game.flipTurn();
        });

        socket.on("fired", function(data){
            game.weapon.fire(data.angle, data.velocity, data.x, data.y);            
        });
    };

    this.flipTurn = function(){
        socket.emit("fliped",share.hostkey);
    };

    this.fired = function(angle,velocity,x,y){
        var hostkey = this.hostkey;
        socket.emit("fired" , {hostkey,angle,velocity,x,y});
    };
 
    this.turn = function(turn){
        socket.emit("turn",{hostkey:share.hostkey ,turn:turn});
    };

    this.join = function(){
        var key = document.getElementById("key").value;
        socket.emit("join",{ hostkey :key ,name:game.playerOne });
        this.replies();
    };


    function randomBetween(min , max){
        return Math.random()*(max-min + 1) + min;
    }
}