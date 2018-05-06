
function weapon(nameWeapon,power,color,size,gravity){
    this.name = nameWeapon;
    this.power = power;
    this.size = size;
    this.color = color;
    this.gravity = gravity;

    this.weapon = new createjs.Shape();
    this.weapon.graphics.beginFill(this.color).drawCircle(0,0,this.size);
    
    this.setSize = function(size){
        this.size = size;
    }

    this.setPosition = function(x,y){
        this.weapon.x = x + 40;
        this.weapon.y = y - 20;
    };


    this.move = function(angle,velocity,x,y){
        this.setPosition(x,y);
        x = x + 40;
        y = y - 20;
        angle = angle*Math.PI/180;
        stage.addChild(this.weapon);      
        var attackpoint = -1,pat = [];

        for(var j=0;x < terrain.width;j+=1){
            x = velocity*Math.cos(angle)*j + this.weapon.x;
            y = -1*velocity*Math.sin(angle)*j + 0.5*this.gravity*j*j + this.weapon.y;

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
        
        var lastpoint = {x:(pat[pat.length-2]+x)/2,y:(pat[pat.length-1]+y)/2}

        if((pat.length/2)%2 == 0){
            pat.push(lastpoint.x);pat.push(lastpoint.y);
        }else if(x < terrain.width){
            pat.push(lastpoint.x);pat.push(lastpoint.y);
            pat.push(lastpoint.x);pat.push(lastpoint.y);
        }

        switch(this.name){
            case "singleShot":
                break;
            case "tripleShot":
                var k = pat.slice(0,3+Math.floor(pat.length/2));

                if((k.length/2)%2 == 0){
                    k = pat.slice(0,1+Math.floor(pat.length/2));
                }
                pat = k;
                break;
        }

        createjs.Tween.get(this.weapon).to({guide:{path:pat}},pat.length*50).call(function(){stage.removeChild(this.weapon)});
    };

}