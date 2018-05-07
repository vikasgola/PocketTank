var computer = function(){
    this.tank = tank2;
    
    this.mode;
    this.setMode = function(mode){
        this.mode = mode;
    };

    this.fire = function(){
        if(this.mode == "easy"){
            easy();
        }else if(this.mode == "intermediate"){
            intermediate();
        }else{
            hard();
        }
    };

}