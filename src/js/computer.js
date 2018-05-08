var computer = new function(){
    this.level = "easy";
    this.setLevel = function(level){
        this.level = level;
    };

    this.fire = function(){
        this.findWeapon();
        if(this.level == "easy"){
            easy();
        }else if(this.level == "intermediate"){
            intermediate();
        }else{
            hard();
        }
    };


    this.findWeapon = function(){
        var k = Math.random();
        if( k < 1/6){
            game.selectWeapon("singleShot");
        }else if( 1/6 < k && k < 2/6 ){
            game.selectWeapon("tripleShot");
        }else if( 2/6 < k && k < 3/6 ){
            game.selectWeapon("fiveShot");
        }else if( 3/6 < k && k < 4/6 ){
            game.selectWeapon("straightShot");
        }else if( 4/6 < k && k < 5/6 ){
            game.selectWeapon("missile");
        }else if( 5/6 < k && k < 1 ){
            game.selectWeapon("chaser");
        }
    };


    function easy(){
        game.weapon.velocity = randomBetween(50,100);
        game.tank2.setNozzle(randomBetween(40,70));
        setTimeout(function(){
            game.weapon.fire(180 + game.tank2.angle, game.weapon.velocity,game.tank2.tank.x,game.tank2.tank.y);
        },3000);
    }


    // additional functionals
    function randomBetween(min , max){
        return Math.random()*(max-min + 1) + min;
    }

}