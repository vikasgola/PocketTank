

function tank(tankImage,nozzleImage){
    this.tank = new createjs.Bitmap(tankImage);
    this.nozzle = new createjs.Bitmap(nozzleImage);
    this.indexPos;
    this.angle;
    this.setPos = function(x,y){
        this.tank.x = x;
        this.tank.y = y-50;
        this.nozzle.x = this.tank.x + 10;
        this.nozzle.y = this.tank.y;
    };
    this.moveForward = function(){
        if( !(this.indexPos < terrain.points.length*2/3 && this.indexPos > terrain.points.length/3) ){  
            createjs.Tween.get(this.tank).to({x:terrain.points[this.indexPos + 1].x - 30, y:terrain.points[this.indexPos + 1].y -50 }, 100);
            if(game.turn == 0)
                createjs.Tween.get(this.nozzle).to({x:terrain.points[this.indexPos + 1].x + 15, y:terrain.points[this.indexPos + 1].y -50 }, 100);
            else
                createjs.Tween.get(this.nozzle).to({x:terrain.points[this.indexPos + 1].x - 15, y:terrain.points[this.indexPos + 1].y -50 }, 100);
            
            this.indexPos +=1;
        }else{
            this.indexPos -=1;            
        }
    };

    this.moveBackward = function(){
        if( !(this.indexPos < terrain.points.length*2/3 && this.indexPos > terrain.points.length/3) ){
            createjs.Tween.get(this.tank).to({x:terrain.points[this.indexPos - 1].x - 30, y:terrain.points[this.indexPos - 1].y -50 }, 100);
            if(game.turn == 0)
                createjs.Tween.get(this.nozzle).to({x:terrain.points[this.indexPos - 1].x + 15, y:terrain.points[this.indexPos - 1].y -50 }, 100);
            else
                createjs.Tween.get(this.nozzle).to({x:terrain.points[this.indexPos - 1].x - 15, y:terrain.points[this.indexPos - 1].y -50 }, 100);
            
            this.indexPos -=1;
        }else{
            this.indexPos +=1;            
        }
    };
    this.setNozzle = function(angle){
        if(game.turn == 1){
            createjs.Tween.get(this.nozzle).to({rotation: 180+angle }, 40);
        }else{
            createjs.Tween.get(this.nozzle).to({rotation: angle }, 40);
        }
        this.angle = -1*angle;
    }
}