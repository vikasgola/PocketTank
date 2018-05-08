

var game = new function(){
    this.turn;

    this.playerOne;
    this.playerTwo;
    
    this.text1;
    this.text2;

    this.score1;
    this.score2;

    this.tank1;
    this.tank2;

    this.currentTank;

    this.weapon;

    this.rounds = 10;

    this.selectWeapon = function(nameOfWeapon){
        switch(nameOfWeapon){
            case "singleShot":
                this.weapon = new weapon("singleShot",100,"brown",10,10);    
                break;
            case "tripleShot":
                this.weapon = new weapon("tripleShot",80,"brown",10,10);
                break;
            case "fiveShot":
                this.weapon = new weapon("fiveShot",60,"brown",10,10);
                break;
            // case "oilShot":
            //     this.weapon = new weapon("oilShot",120,"yellow",10,10);
            //     break;
            case "straightShot":
                this.weapon = new weapon("straightShot",120,"black",10,0);
                break;
            case "missile":
                this.weapon = new weapon("missile",150,"black",13,15);
                break;
            case "chaser":
                this.weapon = new weapon("chaser",150,"black",10,10);            
                break;
        }
    };

    this.gamemode = localStorage["mode"];

    this.setLights = function(){
        this.text1 = new createjs.Text(this.playerOne, "32px Arial", "#ffffff");
        this.text2 = new createjs.Text(this.playerTwo, "32px Arial", "#ffffff");

        this.score1 = new createjs.Text("Score: 0", "24px Arial", "#ffffff");
        this.score2 = new createjs.Text("Score: 0", "24px Arial", "#ffffff");
        
        this.text1.x = 20;
        this.score1.x = 20;
        this.text2.x = 20;
        this.score2.x = 20;

        this.text1.y = 20;
        this.score1.y = 55;
        this.text2.y = 80;
        this.score2.y = 115;

        stage.addChild(this.text1);
        stage.addChild(this.text2);
        stage.addChild(this.score1);
        stage.addChild(this.score2);


        this.tank1.indexPos = Math.floor(terrain.points.length/6);
        this.tank1.setPos(terrain.points[this.tank1.indexPos].x - 20,terrain.points[this.tank1.indexPos].y);
        this.tank1.nozzle.x += 36;
        this.tank1.angle = 0;
        stage.addChild(this.tank1.tank);
        stage.addChild(this.tank1.nozzle);

        this.tank2.indexPos = Math.floor(5*terrain.points.length/6);
        this.tank2.setPos(terrain.points[this.tank2.indexPos].x - 60,terrain.points[this.tank2.indexPos].y);
        stage.addChild(this.tank2.tank);
        this.tank2.angle = 180;
        this.tank2.regX = 40;
        this.tank2.regY = 15;
        stage.addChild(this.tank2.nozzle);
    };

    this.flipTurn = function(){
        if(this.turn == 1){
            this.turn = 0;
            this.currentTank = this.tank1; 
            notifyUser("It's " + game.playerOne + " turn.");                        
        }else{
            this.currentTank = this.tank2;            
            this.turn = 1;
            notifyUser("It's " + game.playerTwo + " turn.");                
        }
    };


    this.exit = function(){
        localStorage["mode"] = "";
        window.location.pathname = "/html/menu.html";
    }

    this.start = function(){
        switch(this.gamemode){
            case "singlePlayer":
                this.playerTwo = "Computer";
                this.setLights();     
                singlePlayer();
                break;
            case "multiPlayer":
                this.playerTwo = "Other";
                this.setLights();            
                multiPlayer();
                break;
            case "lanMultiplayer":
                lanMultiplayer();
                break;
        }
    };


    function singlePlayer(){
        game.currentTank = game.tank1;
        if(Math.random() < 0.5){
            game.turn = 0;
        }else{
            game.turn = 1;
        }

        if(game.turn == 1){
            game.currentTank = game.tank2;
            computer.fire();
        }else if(game.turn == 0){
            notifyUser("It's " + game.playerOne + " turn.");            
            game.currentTank = game.tank1; 
        }   
    }


    function multiPlayer(){
        if(Math.random() < 0.5){
            game.currentTank = game.tank1;
            notifyUser("It's " + game.playerOne + " turn.");    
            game.turn = 0;
        }else{
            game.currentTank = game.tank2;
            notifyUser("It's " + game.playerTwo + " turn.");
            game.turn = 1;
        }
        
    }
}