

function weapon(nameWeapon,power,color,size,gravity){
    this.name = nameWeapon;
    this.power = power;
    this.size = size;
    this.color = color;
    this.gravity = gravity;

    this.velocity = 100;
    this.crash;

    this.weapon = new createjs.Shape();
    this.weapon.graphics.beginFill(this.color).drawCircle(0,0,this.size);


    this.setSize = function(size){
        this.size = size;
    }

    this.setPosition = function(x,y){
        this.weapon.x = x + 40;
        this.weapon.y = y - 20;
    };

    this.fire = function(angleInitial,velocity,x,y){
        this.crash = 0;
        game.weapon.disableKeys(true,keyboardKeys); 
        switch(this.name){
            case "singleShot":
                singleShot(this,angleInitial,velocity,x,y,this.crash);
                break;
            case "tripleShot":
                tripleShot(this,angleInitial,velocity,x,y,this.crash);
                break;
            case "fiveShot":
                fiveShot(this,angleInitial,velocity,x,y,this.crash);
                break;
            case "straightShot":
                this.gravity = 0;
                straightShot(this,angleInitial,velocity,x,y,this.crash);
                break;
            case "missile":
                singleShot(this,angleInitial,velocity,x,y,this.crash);
                break;
            case "chaser":
                chaserShot(this,angleInitial,velocity,x,y,this.crash);
                break;
        }
        setTimeout(function(){
            game.weapon.disableKeys(false,keyboardKeys);
        },5000);        
    };

    this.disableKeys = function(tf,listener){
        if(tf){
            window.removeEventListener("keydown" , listener); 
        }else{
            window.addEventListener("keydown" , listener);
        }
    };


    function singleShot(single,angleInitial,velocity,x,y,crash){

        single.setPosition(x,y);
        x = x + 40;
        y = y - 20;
        var angle = angleInitial*Math.PI/180;
        stage.addChild(single.weapon);
        var attackpoint = -1,pat = [];
        
        for(var j=0;x < terrain.width && x > 0;j+=1){
            x = velocity*Math.cos(angle)*j + single.weapon.x;
            y = -1*velocity*Math.sin(angle)*j + 0.5*single.gravity*j*j + single.weapon.y;
            
            for(var i=0;i<terrain.points.length;i++){
                if(Math.floor(terrain.points[i].x) == Math.floor(x)){
                    attackpoint = i;
                    break;
                }
            }

            if(attackpoint != -1)
            if(Math.floor(terrain.points[attackpoint].y) <= Math.floor(y)){
                break;
            }
            pat.push(x);
            pat.push(y);
        }

        if(pat.length == 2){
            pat.push(x);pat.push(y);
            pat.push(x);pat.push(y);
        }

        var lastpoint = {x:(pat[pat.length-2]+x)/2,y:(pat[pat.length-1]+y)/2};

        if(pat.length != 0){
            if((pat.length/2)%2 == 0){
                pat.push(lastpoint.x);pat.push(lastpoint.y);
            }else if(x < terrain.width){
                pat.push(lastpoint.x);pat.push(lastpoint.y);
                pat.push(lastpoint.x);pat.push(lastpoint.y);
            }
          
            var y = pat[pat.length - 1];
            var x = pat[pat.length - 2];
            if((x-70 < game.tank1.tank.x && x+70 > game.tank1.tank.x ) ){
                if(y < game.tank1.tank.y + 100 ){
                        crash = 1;
                }
            }else if((x-70 < game.tank2.tank.x && x+70 > game.tank2.tank.x ) ){
                if(y < game.tank2.tank.y + 100 ){
                    crash = -1;
                }
            }


            createjs.Tween.get(single.weapon).to({guide:{path:pat}},pat.length*100).call(function(){
                stage.removeChild(single.weapon);
                destroy(crash);
            });     
        }else{
            stage.removeChild(single.weapon);
        }
    }

    function tripleShot(main,angleInitial,velocity,x,y,crash){
        var temp1 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);
        var temp2 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);
        var temp3 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);

        temp1.fire(angleInitial,velocity,x,y);
        temp2.fire(angleInitial,velocity*1.1,x,y);
        temp3.fire(angleInitial,velocity*0.9,x,y);
    }

    function fiveShot(main,angleInitial,velocity,x,y,crash){
        var temp1 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);
        var temp2 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);
        var temp3 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);
        var temp4 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);
        var temp5 = new weapon("singleShot",main.power,main.color,main.size,main.gravity);

        temp1.fire(angleInitial,velocity,x,y);
        temp2.fire(angleInitial,velocity*1.2,x,y);
        temp3.fire(angleInitial,velocity*1.1,x,y);
        temp4.fire(angleInitial,velocity*0.9,x,y);
        temp5.fire(angleInitial,velocity*0.8,x,y);
    }

    function straightShot(main,angleInitial,velocity,x,y,crash){
        main.setPosition(x,y+40);
        y = y+40;
        var angle = angleInitial*Math.PI/180;
        stage.addChild(main.weapon);
        var pat = [];

        for(var j=0;x < terrain.width  && x > 0;j+=1){
            x = velocity*Math.cos(angle)*j + main.weapon.x;
            y = -1*velocity*Math.sin(angle)*j + main.weapon.y;
            pat.push(x);
            pat.push(y);
        }
        
        

        if(pat.length != 0){
            var lastpoint = {x:(pat[pat.length-2]+x)/2 , y:(pat[pat.length-1]+y)/2};

            if((pat.length/2)%2 == 0){
                pat.push(lastpoint.x);pat.push(lastpoint.y);
            }

            pat.find(function(xy ,index){
                if(index%2 == 0 && (xy-20 < game.tank1.x && xy+20 > game.tank1.x ) ){
                    if(pat[index+1]-10 < game.tank1.y && pat[index+1]+40 > game.tank1.y ){
                        crash = 1;
                    }
                }else if(index%2 == 0 && (xy-20 < game.tank2.x && xy+20 > game.tank2.x ) ){
                    if(pat[index+1]-10 < game.tank2.y && pat[index+1]+40 > game.tank2.y ){
                        crash = -1;
                    }
                }
            });

            createjs.Tween.get(main.weapon).to({guide:{path:pat}},pat.length*100).call(function(){stage.removeChild(main.weapon);destroy(crash);});        
        }else{
            stage.removeChild(main.weapon);
        }
        
    }


    function chaserShot(main,angleInitial,velocity,x,y,crash){
        main.setPosition(x,y);
        x = x + 40;
        y = y - 20;
        var angle = angleInitial*Math.PI/180;
        stage.addChild(main.weapon);   
        var attackpoint = -1,pat = [];

        for(var j=0;x < terrain.width  && x > 0;j+=1){
            y = -1*velocity*Math.sin(angle)*j + 0.5*main.gravity*j*j + main.weapon.y;

            if(game.turn == 1){
                if( 100 + Math.floor(game.tank2.tank.x) >= Math.floor(x) && 
                -100 + Math.floor(game.tank2.tank.x) <= Math.floor(x)){
                x = game.tank2.tank.x + 50;
                }else{
                    x = velocity*Math.cos(angle)*j + main.weapon.x;
                }
            }else{
                if( 100 + Math.floor(game.tank1.tank.x) >= Math.floor(x) && 
                -100 + Math.floor(game.tank1.tank.x) <= Math.floor(x)){
                x = game.tank1.tank.x + 50;
                }else{
                    x = velocity*Math.cos(angle)*j + main.weapon.x;
                }
            }
  

            for(var i=0;i<terrain.points.length;i++){
                if(Math.floor(terrain.points[i].x) == Math.floor(x)){
                    attackpoint = i;
                    break;
                }
            }

            if(attackpoint != -1)
            if(Math.floor(terrain.points[attackpoint].y) <= Math.floor(y)){
                break;
            }
            pat.push(x);
            pat.push(y);
        }

        if(pat.length == 2){
            pat.push(x);pat.push(y);
            pat.push(x);pat.push(y);
        }
        
        var lastpoint = {x:(pat[pat.length-2]+x)/2,y:(pat[pat.length-1]+y)/2};

        if(pat.length != 0){
            if((pat.length/2)%2 == 0){
                pat.push(lastpoint.x);pat.push(lastpoint.y);
            }else if(x < terrain.width){
                pat.push(lastpoint.x);pat.push(lastpoint.y);
                pat.push(lastpoint.x);pat.push(lastpoint.y);
            }

            pat.find(function(xy ,index){
                if(index%2 == 0 && (xy-20 < game.tank1.x && xy+20 > game.tank1.x ) ){
                    if(pat[index+1]-10 < game.tank1.y && pat[index+1]+40 > game.tank1.y ){
                        crash = 1;
                    }
                }else if(index%2 == 0 && (xy-20 < game.tank2.x && xy+20 > game.tank2.x ) ){
                    if(pat[index+1]-10 < game.tank2.y && pat[index+1]+40 > game.tank2.y ){
                        crash = -1;
                    }
                }
            });

            createjs.Tween.get(main.weapon).to({guide:{path:pat}},pat.length*100).call(function(){stage.removeChild(main.weapon);destroy(crash);});            
        }else{
            stage.removeChild(main.weapon);
        }
        
    }


    function destroy(crash){
        if(crash == -1){
            var score = parseInt(game.score1.text.slice(7)) + game.weapon.power;
            game.score1.text = "Score: " + score;
        }else if(crash == 1){
            var score = parseInt(game.score2.text.slice(7)) + game.weapon.power;
            game.score2.text = "Score: " + score;
        }

        

    }
}
