
function weapon(nameWeapon,power,color,size,gravity){
    this.name = nameWeapon;
    this.power = power;
    this.size = size;
    this.color = color;

    this.weapon = new createjs.Shape();
    this.weapon.graphics.beginFill(this.color).drawCircle(0,0,this.size);
    this.weapon.visible = false;
    
    this.setSize = function(size){
        this.size = size;
    }


    this.move = function(angle,velocity,time,x,y){
        this.weapon.x = x + 20;
        this.weapon.y = y + 20;
        angle = angle*Math.PI/180;

        this.weapon.visible = true;

        var attackpoint = -1,path = [];

        for(var j=0;x < terrain.width;j++){
            x = velocity*Math.cos(angle)*j + x;
            y = -1*velocity*Math.sin(angle)*j + 0.5*this.gravity*j*j + y;
            
            for(var i=0;i<terrain.points.length;i++){
                if(Math.floor(terrain.points[i].x) == Math.floor(x)){
                    attackpoint = i;
                    break;
                }
            }

            if(attackpoint != -1)
            if(Math.floor(terrain.points[attackpoint-2].y) <= Math.floor(y)
                || Math.floor(terrain.points[attackpoint].y) <= Math.floor(y) 
                || Math.floor(terrain.points[attackpoint-1].y) <= Math.floor(y) ){
                break;
            }
            path.push(x);
            path.push(y);
        }

        
        if((path.length/2)%2 == 0){
            path.push(x);
            path.push(y);
        }else if(x < width){
            path.push(x);path.push(y);
            path.push(x);path.push(y);
        }

        createjs.Tween.get(this.weapon).to({guide:{path:path}},time);
        this.weapon.visible = false;  
    };

}