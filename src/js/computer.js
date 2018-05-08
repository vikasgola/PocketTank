var computer = new function(){
    this.level;
    this.setLevel = function(level){
        this.level = level;
    };

    this.fire = function(){
        this.findWeapon();
        game.weapon.disableKeys(true,keyboardKeys);                

        game.weapon.velocity = randomBetween(70,100);
        game.tank2.setNozzle(randomBetween(-160,-120));

        if(this.level == "easy"){
            level(0.8);
        }else if(this.level == "intermediate"){
            level(0.4);
        }else{
            level(0.2);
        }

        setTimeout(function(){
            game.weapon.fire(game.tank2.angle, game.weapon.velocity,game.tank2.tank.x,game.tank2.tank.y);
            setTimeout(function(){game.flipTurn();},5000);
        },3000);
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


    function level(k){
        if(Math.random() > k){
            game.weapon.velocity = 100;
            var x = game.tank2.tank.x - game.tank1.tank.x;
            var y = game.tank2.tank.y - game.tank1.tank.y;
            var z = 5*x*x/10000;
            var angle = (Math.atan( (x  + Math.sqrt(x*x - 4*z*(z+y)) )/(2*z) ))*180/Math.PI;
            console.log(angle);
            game.tank2.setNozzle(-180 + angle);
        }
    }


    // additional functionals
    function randomBetween(min , max){
        return Math.random()*(max-min + 1) + min;
    }

}