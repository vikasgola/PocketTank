var computer = new function(){
    this.tank = tank2;
    
    this.level;
    this.setLevel = function(level){
        this.level = level;
    };

    this.fire = function(){
        if(this.level == "easy"){
            easy();
        }else if(this.level == "intermediate"){
            intermediate();
        }else{
            hard();
        }
    };


    function intermediate(){

    }

}