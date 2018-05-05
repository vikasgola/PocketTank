var terrain = new function(){
    this.shape = new createjs.Shape();
    this.points = [];
    this.width;
    this.height;
    this.clouds = new createjs.Shape();

    this.setSize = function(w,h){
        this.width = w;
        this.height = h;
    }

    this.initalizePoints = function(){
        this.points.push({x:-100 , y:this.height});
        for(var i=1;i<11;i++){
            if(i == 5){
                this.points.push({x:this.width*i/10 , y:randomBetween(50 , this.height/2) });
            }else{
                this.points.push({x:this.width*i/10 , y:randomBetween(this.height/3 , this.height/1.15) });
            }
        }
    };

    this.addPoints = function(num, gap){
        while(num--){
            var len = this.points.length;
            for(var i=0;i<len-1;i++){
                if(this.points[i+1].x - this.points[i].x > gap ){
                    var sy = (this.points[i+1].y < this.points[i].y)? {smaller:this.points[i+1].y ,bigger:this.points[i].y } : {smaller:this.points[i].y ,bigger:this.points[i+1].y };
                    this.points.push({x:(this.points[i].x + this.points[i+1].x)/2 , y:randomBetween(sy.smaller , sy.bigger)});
                }
            }
            this.points.sort(function(point1, point2){return point1.x - point2.x;});
        }  
    };


    this.draw = function(fillimage,strokeimage,strokeWidth){
        var len = this.points.length;

        this.shape.graphics.setStrokeStyle(strokeWidth);

        this.shape.graphics
        .beginBitmapFill(fillimage)
        .beginBitmapStroke(strokeimage)
            .moveTo(this.points[0].x , this.points[0].y);
        for(var i=1;i<len;i++){
            this.shape.graphics.lineTo(this.points[i].x , this.points[i].y);
        }
        this.shape.graphics.lineTo(this.width+50 , this.height);
        this.shape.graphics.endStroke();
    };

    
    this.setClouds = function(cloudImage){
        this.clouds.graphics.beginBitmapFill(cloudImage).drawRect(0 ,0 , 10*this.width, this.height);
    };

    this.startClouds = function(time){
        createjs.Tween.get(this.clouds).to({x:-(time-1)*this.width} ,100000*time);        
    }
    
}





// additional functionals
function randomBetween(min , max){
    return Math.random()*(max-min + 1) + min;
}