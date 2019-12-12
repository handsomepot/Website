const max_live = 5;
var starfield;
var player;
var bullets;
var liveBalls;
var enemies;
var enemybullets;
var lazerbullets;
var lazerbullets2;
var smallbossbullets;
var lastTime = 0;
var sfxExplode;
var sfxExplode2;
var sfxPoint;
let bgmusic = null;
var sfxBattle1;
var sfxBattle2;
var sfxBattle3;
var globalTime;
var lock = false;
var lives = max_live; // lives
var bulletNum = 1; 
var direction = ['down','right','left','down', 'up','left','right','down', 'up','right','left','down'];
var liveBall;
var bulletBall;
var overText;
var winText;
var gameState = 'running';
var t1,t2;
var isShoot = false;
var stage = 1;
var bossText, bossText2,bossText3;
var stageText;
var scoreText;
var score = 0;
var ship = [];
var b = [];
var shootTime = [200,170,150];


class Enemy extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.defaultKey);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.lastTime = 0;
        this.isDead = false; 
        this.number = 0;
        this.enemyType = 'regular';
        this.timerLock = false;
        this.hitLock = false;
        this.winLock = false;
        this.bulletTimer = null;
        this.moveTimer = null;
        this.index = 0;
        this.flip = true;
        this.isCollide = false;
    } 
}
function playOverAnimation(){
           level1.time.addEvent({ delay: 100, callback: function(){
                    e = new Enemy({scene:level1, x: player.x, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
           level1.time.addEvent({ delay: 150, callback: function(){
                    e = new Enemy({scene:level1, x: player.x + 40, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
           level1.time.addEvent({ delay: 200, callback: function(){
                    e = new Enemy({scene:level1, x: player.x - 40, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
            level1.time.addEvent({ delay: 250, callback: function(){
                    e = new Enemy({scene:level1, x: player.x, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
           level1.time.addEvent({ delay: 300, callback: function(){
                    e = new Enemy({scene:level1, x: player.x + 40, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
           level1.time.addEvent({ delay: 350, callback: function(){
                    e = new Enemy({scene:level1, x: player.x - 40, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false });  
    
            level1.time.addEvent({ delay: 400, callback: function(){
                    e = new Enemy({scene:level1, x: player.x, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
           level1.time.addEvent({ delay: 450, callback: function(){
                    e = new Enemy({scene:level1, x: player.x + 40, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
            
           level1.time.addEvent({ delay: 500, callback: function(){
                    e = new Enemy({scene:level1, x: player.x - 40, y:player.y -40});
                    e.body.immovable = true;
                    e.anims.play('sprExplosion2');

            }, callbackScope: level1, loop: false }); 
}
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function removeAllObjects(){
    starfield.destroy();

    enemies.clear(true);

    bullets.clear(true);
    enemybullets.clear(true);
    lazerbullets.clear(true);
    lazerbullets2.clear(true);
    smallbossbullets.clear(true);
    player.visible = false;
    

    lock = false;
    liveBall.destroy();
    bulletBall.destroy();
    overText.destroy();
    stage = 1;
    bulletNum = 1;

    ship = [];
    b = [];

}

function fire2(child){
    console.log(child);

    if(child.flip){
        level1.time.addEvent({ delay: 300, callback: 
          function(){
        if(!child.isDead)
                bossFire3(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 600, callback: 
          function(){
            if(!child.isDead)
                bossFire3(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 900, callback: 
          function(){
            if(!child.isDead)
                bossFire3(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 1200, callback: 
          function(){
            if(!child.isDead)
                bossFire3(child.x, child.y);
        },callbackScope: level1, loop: false });  
    }
    else{
        level1.time.addEvent({ delay: 250, callback: 
          function(){
            if(!child.isDead)
                bossFire4(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 450, callback: 
          function(){
            if(!child.isDead)
                bossFire4(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 650, callback: 
          function(){
            if(!child.isDead)
                bossFire4(child.x, child.y);
        },callbackScope: level1, loop: false });  
    }

    child.bulletTimer.remove();
    child.bulletTimer = null;
    child.flip = !child.flip;        
}   

function fire3(child){
    console.log(child);

    if(child.flip){
        level1.time.addEvent({ delay: 300, callback: 
          function(){
        if(!child.isDead)
                bossFire5(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 600, callback: 
          function(){
            if(!child.isDead)
                bossFire5(child.x, child.y);
        },callbackScope: level1, loop: false });  
         

    }
    else{
        level1.time.addEvent({ delay: 250, callback: 
          function(){
            if(!child.isDead)
                bossFire6(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 450, callback: 
          function(){
            if(!child.isDead)
                bossFire6(child.x, child.y);
        },callbackScope: level1, loop: false });  


    }

    child.bulletTimer.remove();
    child.bulletTimer = null;
    child.flip = !child.flip;        
}   

function fire(child){
    console.log(child);

    if(child.flip){
        level1.time.addEvent({ delay: 300, callback: 
          function(){
        if(!child.isDead)
                bossFire1(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 700, callback: 
          function(){
            if(!child.isDead)
                bossFire1(child.x, child.y);
        },callbackScope: level1, loop: false });  
        
        if(child.enemyType == 'boss1' || child.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 1100, callback: 
              function(){
                if(!child.isDead)
                    bossFire1(child.x, child.y);
            },callbackScope: level1, loop: false });  
        }
        
        if(child.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 1500, callback: 
              function(){
                if(!child.isDead)
                    bossFire1(child.x, child.y);
            },callbackScope: level1, loop: false });  
        }
        

    }
    
    else{
        level1.time.addEvent({ delay: 250, callback: 
          function(){
            if(!child.isDead)
                bossFire2(child.x, child.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 450, callback: 
          function(){
            if(!child.isDead)
                bossFire2(child.x, child.y);
        },callbackScope: level1, loop: false });  

        if(child.enemyType == 'boss1' || child.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 650, callback: 
              function(){
                if(!child.isDead)
                    bossFire2(child.x, child.y);
            },callbackScope: level1, loop: false });  

        }
        if(child.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 850, callback: 
              function(){
                if(!child.isDead)
                    bossFire2(child.x, child.y);
            },callbackScope: level1, loop: false });  

        }
         
    }
    child.bulletTimer.remove();
    child.bulletTimer = null;
    child.flip = !child.flip;
}    


function lineFire(x,y){
    var bullet = smallbossbullets.get(x , y + 20);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = 0;
        bullet.body.velocity.y = 550;
    }
}

function bossFire1(x,y){
    var dx = [0, 0, 1, -1, 1, -1, 1, -1];
    var dy = [1, -1, 0, 0, 1, 1, -1, -1];
    var v = [1,1,1,1,0.7, 0.7, 0.7, 0.7];


    for(var i = 0; i < dx.length; i ++){
        var bullet = smallbossbullets.get(x + dx[i] * 30, y + dy[i]*30);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = dx[i]*250 * v[i];
            bullet.body.velocity.y = dy[i]*250 * v[i];
        }
    }
}


function bossFire2(x,y){

    
    var bullet;
    bullet = smallbossbullets.get(x , y + 20);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = 200;
        bullet.body.velocity.y = 250;
    }
    
    bullet = smallbossbullets.get(x , y + 20);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = -200;
        bullet.body.velocity.y = 250;
    } 
    
    bullet = smallbossbullets.get(x , y + 20);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = 0;
        bullet.body.velocity.y = 350;
    }

}


function bossFire3(x,y){
    var dx = [0, 0, 1, -1, 1, -1, 1, -1];
    var dy = [1, -1, 0, 0, 1, 1, -1, -1];
    var v = [1,1,1,1,0.7, 0.7, 0.7, 0.7];


    for(var i = 0; i < dx.length; i ++){
        var bullet = smallbossbullets.get(x + dx[i] * 30, y + dy[i]*30);
        bullet
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = dx[i]*350 * v[i];
            bullet.body.velocity.y = dy[i]*350 * v[i];
            bullet.scaleX = 1.5;
            bullet.scaleY = 1.5;
        }
    }
}


function bossFire4(x,y){

    
    var bullet;
    
    bullet = smallbossbullets.get(x , y + 20);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = 0;
        bullet.body.velocity.y = 450;
        bullet.scaleX = 1.5;
        bullet.scaleY = 1.5;
    }

}

function bossFire5(x,y){
    var dx = [0, 0, 1, -1, 1, -1, 1, -1];
    var dy = [1, -1, 0, 0, 1, 1, -1, -1];
    var v = [1,1,1,1,0.7, 0.7, 0.7, 0.7];


    for(var i = 0; i < dx.length; i ++){
        var bullet = smallbossbullets.get(x + dx[i] * 30, y + dy[i]*30);
        bullet
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = dx[i]*350 * v[i];
            bullet.body.velocity.y = dy[i]*350 * v[i];
            bullet.scaleX = 1.25;
            bullet.scaleY = 1.25;
        }
    }
}

function bossFire6(x,y){

    
    var bullet;
    
    bullet = smallbossbullets.get(x , y + 20);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = 0;
        bullet.body.velocity.y = 450;
        bullet.scaleX = 1.25;
        bullet.scaleY = 1.25;
    }

}



function shoot() {

    var w = player.body.width;
    var bullet;
    var vy = -550;
    if(bulletNum >=2){
        vy = -600;
    }
    if(bulletNum >=3){
        vy = -650;
    }
    
    if(bulletNum==3){
        
        var dx = [ 0, 1, -1];
        var dy = [-1,-3, -3];
        var v =  [ 1, 0.3, 0.3];


        for(var i = 0; i < 3; i ++){
            var bullet = lazerbullets.get(player.body.x + 20 + dx[i] * 30, player.body.y + dy[i]*30);
            if (bullet) {
                bullet.setActive(true);
                bullet.setVisible(true);
                bullet.body.velocity.x = dx[i]*350 * v[i];
                bullet.body.velocity.y = dy[i]*350 * v[i];
            }
        }
        
    }
    
    else{
        bullet = bullets.get(player.body.x + w/4, player.body.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = vy;
        }




        bullet = bullets.get(player.body.x + w/4*3, player.body.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = vy;
        }   
    }

        
}


function enemyFire(child) {
    
    if(!child.isDead){
    if(child.enemyType == 'regular'){
        var bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 350;
        }
    }
    else if(child.enemyType == 'attack'){
        var bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            var dx = Math.abs(player.body.x - child.x);
            var dy = Math.abs(player.body.y - child.y);
            var ratio = 200000/(dx*dx + dy*dy);
            ratio = Math.sqrt(ratio);
          
            var vx = (player.body.x - child.x) * ratio;
            var vy = (player.body.y - child.y) * ratio;

            bullet.body.velocity.x = vx;
            bullet.body.velocity.y = vy;
        }
    }
    else if(child.enemyType == 'attack2' || child.enemyType == 'attack3'){
        var bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            var dx = Math.abs(player.body.x - child.x);
            var dy = Math.abs(player.body.y - child.y);
            var ratio = 280000/(dx*dx + dy*dy);
            ratio = Math.sqrt(ratio);
          
            var vx = (player.body.x - child.x) * ratio;
            var vy = (player.body.y - child.y) * ratio;

            bullet.body.velocity.x = vx;
            bullet.body.velocity.y = vy;
        }
    }
    
    else if(child.enemyType == 'scatter'){
        var bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            
            bullet.body.velocity.x = 300;
            bullet.body.velocity.y = 0;
        }
        
        bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            
            bullet.body.velocity.x = -300;
            bullet.body.velocity.y = 0;
        }
        
        bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = -300;
        }
        
        bullet = enemybullets.get(child.x, child.y);
        if (bullet) {
            
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = 300;
        }
    }
    else if(child.enemyType == 'line'){
        level1.time.addEvent({ delay: 200, callback: 
              function(){
                if(!child.isDead)
                    lineFire(child.x, child.y);
        },callbackScope: level1, loop: false });  
        
        level1.time.addEvent({ delay: 400, callback: 
              function(){
                if(!child.isDead)
                    lineFire(child.x, child.y);
        },callbackScope: level1, loop: false });  

    } 
    else if(child.enemyType == 'round'){
        level1.time.addEvent({ delay: 350, callback: 
              function(){
                bossFire1(child.x,child.y);
        },callbackScope: level1, loop: false });  
       bossFire1(child.x,child.y);
    } 
    else if(child.enemyType == 'round_back'){
        level1.time.addEvent({ delay: 250, callback: 
              function(){
                bossFire3(child.x, child.y);
        },callbackScope: level1, loop: false }); 
        bossFire3(child.x, child.y);
    }
    }
    
}


function addUfo1(){
    
    e = new Enemy({scene:level1, x: 180, y:-80, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('ufo1');

    e = new Enemy({scene:level1, x: 240, y:0, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('ufo1');

    e = new Enemy({scene:level1, x: 300, y:-80, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('ufo1');

}


function addUfo2(){
    
    e = new Enemy({scene:level1, x: 420, y:-110, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('ufo1');


    e = new Enemy({scene:level1, x: 360, y:0, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('ufo1');


    e = new Enemy({scene:level1, x: 300, y: -110, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('ufo1');

}


function addUfo3(){
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'ufo2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.enemyType = 'attack'
    e.anims.play('ufo2');

    
    e = new Enemy({scene:level1, x: 160, y:-80, defaultKey:'ufo2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.enemyType = 'attack'
    e.anims.play('ufo2');


    e = new Enemy({scene:level1, x: 240, y:-160, defaultKey:'ufo2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.enemyType = 'attack'
    e.anims.play('ufo2');

    
    e = new Enemy({scene:level1, x: 320, y:-80, defaultKey:'ufo2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.enemyType = 'attack'
    e.anims.play('ufo2');


    e = new Enemy({scene:level1, x: 400, y:0, defaultKey:'ufo2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.enemyType = 'attack'
    e.anims.play('ufo2');

}


function addUfo4(){
    e = new Enemy({scene:level1, x: 0, y:-80, defaultKey:'ufo4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 60;
    e.body.velocity.x = 180;
    e.enemyType = 'attack';
    e.number = 5;
    
    e.isCollide = true;

    
    e.anims.play('ufo4');


    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'ufo4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 60;
    e.body.velocity.x = 180;
    e.enemyType = 'attack';
    e.number = 5;
    
    e.isCollide = true;

    e.anims.play('ufo4');
    

    e = new Enemy({scene:level1, x: 160, y:80, defaultKey:'ufo4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 60;
    e.body.velocity.x = 180;
    e.enemyType = 'attack';
    e.number = 5;
    
    e.isCollide = true;

    e.anims.play('ufo4');

}


function addUfo5(){
        
    e = new Enemy({scene:level1, x: 300, y:-200, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'none';
    e.body.immovable = true;
    e.body.velocity.y = 270;
    e.anims.play('enemygroup4');
    e.number = 5;

}


function addUfo6(){
    
    e = new Enemy({scene:level1, x: player.x, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'none';
    e.body.immovable = true;
    e.body.velocity.y = 220;
    e.anims.play('enemygroup4');
    e.number = 5;
    
    e = new Enemy({scene:level1, x: player.x, y:-100, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'none';
    e.body.immovable = true;
    e.body.velocity.y = 220;
    e.anims.play('enemygroup4');
    e.number = 5;
}


function addUfo7(){
    
    e = new Enemy({scene:level1, x: 420, y:-100, defaultKey:'ufo6'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack';
    e.body.velocity.y = 90;
    e.body.velocity.x = -250;
    e.isCollide = true;

    e.number = 5;

    e = new Enemy({scene:level1, x: 340, y:-50, defaultKey:'ufo7'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack';
    e.body.velocity.y = 90;
    e.body.velocity.x = -250;
    e.isCollide = true;

    e.number = 5;

    
    e = new Enemy({scene:level1, x: 260, y: 0, defaultKey:'ufo8'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack';
    e.body.velocity.y = 90;
    e.body.velocity.x = -250;
e.isCollide = true;

    e.number = 5;
}


function addUfo8(){
    e = new Enemy({scene:level1, x: player.x, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'attack';
    e.body.immovable = true;
    e.body.velocity.y = 320;
    e.anims.play('enemygroup4');
    e.number = 5;
    
    e = new Enemy({scene:level1, x: player.x, y:-100, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'none';
    e.body.immovable = true;
    e.body.velocity.y = 320;
    e.anims.play('enemygroup4');
    e.number = 5;
  
}


function addUfo9(){
    e = new Enemy({scene:level1, x: player.x, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'attack';
    e.body.immovable = true;
    e.body.velocity.y = 320;
    e.anims.play('enemygroup4');
    e.number = 5;
    
    e = new Enemy({scene:level1, x: player.x, y:-100, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'none';
    e.body.immovable = true;
    e.body.velocity.y = 320;
    e.anims.play('enemygroup4');
    e.number = 5;
  
}


function addSmallboss1(){

    e = new Enemy({scene:level1, x: worldX/2, y:-20, defaultKey:'boss1'});
    enemies.add(e);
    e.enemyType = 'smallboss';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 50;
    e.anims.play('boss1');
    e.scaleX = 0.75;
    e.scaleY = 0.75;
  
}


function addUfo11(){
    
    e = new Enemy({scene:level1, x: -50, y:worldY/2, defaultKey:'ufo6'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack3';
    e.body.velocity.y = -130;
    e.body.velocity.x = 20;
e.isCollide = true;

    e.number = 8;

    
    e = new Enemy({scene:level1, x: worldX+50, y: worldY/2, defaultKey:'ufo8'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack3';
    e.body.velocity.y = -130;
    e.body.velocity.x = -20;
e.isCollide = true;

    e.number = 8;
}

function addUfo12(){
    
    e = new Enemy({scene:level1, x: 120, y:0, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'round_back';
    e.body.velocity.y = 180;
    e.body.velocity.x = 0;
    e.isCollide = true;

    e.number = 48;

}


function addBoss(){
    
    e = new Enemy({scene:level1, x: worldX/2, y:-100, defaultKey:'boss1'});
    enemies.add(e);
    e.enemyType = 'boss1';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 88;
    e.scaleX = 1.1;
    e.scaleY = 1.1;
    e.anims.play('boss1');
    bgmusic.stop();
    sfxBoss1.play({
        volume: .3,
        loop: true
      })
    
    level1.time.addEvent({ delay: 5000, 
                          callback: function(){
                            sfxBoss1.stop();
                            sfxBattle1.play({volume: .6,loop: true});
                        }
                  ,callbackScope: this, loop: false });    
    
    
    
    bossText = this.add.text(
    this.physics.world.bounds.width/2,
    40,
    'BOSS FROG' ,
    {
      fontFamily:  'monospace',
      fontSize: '22px',
      fill: '#fff',
    },
    );
    bossText.setOrigin(0.5);
    bossText.setAlpha(0.75);
    
}


function addBrick1(){
    e = new Enemy({scene:level1, x: 100, y:0, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'scatter';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 15;
    e.anims.play('brick1');
    e.body.velocity.y = 90;
    
    
    e = new Enemy({scene:level1, x: worldX - 100, y:0, defaultKey:'brick1'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'scatter';
    e.body.velocity.y = 0;
    e.number = 15;
    e.anims.play('brick1');
    e.body.velocity.y = 90;

}


function addBrick2(){
    e = new Enemy({scene:level1, x: 150, y:0, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'attack2';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 6;
    e.anims.play('brick1');
    e.body.velocity.y = 80;
    
    e = new Enemy({scene:level1, x: 150, y:0, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'attack2';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 6;
    e.anims.play('brick1');
    e.body.velocity.y = 80;


}


function addBrick3(){
    e = new Enemy({scene:level1, x: worldX - 150, y:0, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'attack2';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 6;
    e.anims.play('brick1');
    e.body.velocity.y = 80;
    
    e = new Enemy({scene:level1, x: worldX - 150, y:0, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'attack2';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 6;
    e.anims.play('brick1');
    e.body.velocity.y = 80;
    

}

function addBrick4(){
    e = new Enemy({scene:level1, x: player.x, y:-200, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'round';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 36;
    e.anims.play('brick1');
    e.body.velocity.y = 90;

}

function addBrick5(){ // crab small

    e = new Enemy({scene:level1, x: worldX/2, y:-20, defaultKey:'crab'});
    enemies.add(e);
    e.enemyType = 'smallboss';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 60;
    e.anims.play('crab');

}

function addBoss2(){ // crab 

    e = new Enemy({scene:level1, x: worldX/2, y:-20, defaultKey:'crab'});
    enemies.add(e);
    e.enemyType = 'boss2';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 180;
    e.anims.play('crab');
    e.scaleX = 1.2;
    e.scaleY = 1.2;
    
   sfxBattle1.stop();
    sfxBoss1.play({
        volume: .3,
        loop: true
      })
    
    level1.time.addEvent({ delay: 5000, 
                          callback: function(){
                            sfxBoss1.stop();
                            sfxBattle2.play({volume: .6,loop: true});
                        }
                  ,callbackScope: this, loop: false });    
    
    
    
    bossText2 = this.add.text(
    this.physics.world.bounds.width/2,
    40,
    'BOSS CRAB' ,
    {
      fontFamily:  'monospace',
      fontSize: '22px',
      fill: '#fff',
    },
    );
    bossText2.setOrigin(0.5);
    bossText2.setAlpha(0.75);
}

function addEnemy1(){

    e = new Enemy({scene:level1, x: worldX/4, y:-50, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'line';
    e.body.immovable = true;
    e.number = 20;
    e.body.velocity.y = 40;
    e.body.velocity.x = 150;
    e.isCollide = true;

    e.anims.play('brick1');

    
    
    e = new Enemy({scene:level1, x: worldX/4*3, y:-50, defaultKey:'brick1'});
    enemies.add(e);
    e.enemyType = 'line';
    e.body.immovable = true;
    e.number = 20;
    e.body.velocity.y = 40;
    e.body.velocity.x = -150;
    e.isCollide = true;

    e.anims.play('brick1');

}

function addEnemy2(){

    e = new Enemy({scene:level1, x: worldX/4, y:-50, defaultKey:'crab'});
    enemies.add(e);
    e.enemyType = 'smallboss3';
    e.body.immovable = true;
    e.body.velocity.y = 80;
    e.body.velocity.x = 100;
    e.number = 60;
    e.isCollide = true;

    e.anims.play('crab');

}

function addEnemy3(){

    e = new Enemy({scene:level1, x: worldX/4*3, y:-50, defaultKey:'boss3'});
    enemies.add(e);
    e.enemyType = 'smallboss4';
    e.body.immovable = true;
    e.body.velocity.x = -100;
    e.body.velocity.y = 90;
    e.number = 80;
    e.isCollide = true;

    e.anims.play('boss3');

}

function addBoss3(){



    
    sfxBattle2.stop();
    sfxBoss1.play({
        volume: .3,
        loop: true
      })
    
    level1.time.addEvent({ delay: 5000, 
                          callback: function(){
                            sfxBoss1.stop();
                            sfxBattle3.play({volume: .6,loop: true});
                              
                            e = new Enemy({scene:level1, x: worldX/2, y: -50, defaultKey:'boss3'});
                            enemies.add(e);
                            e.enemyType = 'boss3';
                            e.body.immovable = true;
                            e.body.velocity.x = 20;
                            e.body.velocity.y = 80;
                            e.number = 250;

                            e.scaleX = 1.25;
                            e.scaleY = 1.25;
                            e.anims.play('boss3');
                            e.isCollide = true;
                        }
                  ,callbackScope: this, loop: false });    
    
    
    
    bossText3 = this.add.text(
    this.physics.world.bounds.width/2,
    40,
    'BOSS GIANT' ,
    {
      fontFamily:  'monospace',
      fontSize: '22px',
      fill: '#fff',
    },
    );
    bossText3.setOrigin(0.5);
    bossText3.setAlpha(0.75);

}

function addEnemy5(child){

    e = new Enemy({scene:level1, x: child.x, y: child.y + 150, defaultKey:'brick1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 180;
    e.body.velocity.x = 180;
    //e.enemyType = "attack";
    e.number = 10;

    e.isCollide = true;

    e.anims.play('brick1');
    if(child.bulletTimer)
        child.bulletTimer.remove();
    child.bulletTimer = null;

}

function updateLive(){
    for(var i = 0 ; i < max_live; i++){
      ship[i].setAlpha(0.15);
    }
    for(var i = 0 ; i < lives; i++){
      ship[i].setAlpha(1);
    }

}
function hitLiveBall2(player, ball){
    
    if(ball.visible){
        sfxPoint.play();
        ball.visible = false;
        ball.destroy();
    }
    
    if(lives < max_live && lives >=0){
        lives++;
    }
    updateLive();

}

function hitLiveBall(){
    
    
    if(lives < max_live && lives >=0){
        lives++;
    }
    updateLive();

    
            
    if(liveBall.visible){
        sfxPoint.play();
        liveBall.body.x = -100;
        liveBall.body.y = -100;
        liveBall.visible = false;
    }

}

function hitBulletBall(){
    
    b[bulletNum] = level1.physics.add.sprite(150 + bulletNum*15, 34, 'bullet2');
    bulletNum++;

    if(liveBall.visible){
        sfxPoint.play();
        bulletBall.body.x = -100;
        bulletBall.body.y = -100;
        bulletBall.visible = false;
    }

}
function addLevel1(){
    level1.time.addEvent({ delay: 2500, callback: addUfo1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 5000, callback: addUfo2, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 8000, callback: addUfo3, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 10000, callback: addUfo4, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 14000, callback: addUfo5, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 18000, callback: addUfo6, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 22000, callback: addUfo7, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 26000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 28000, callback: addUfo9, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 30000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 32000, callback: addUfo9, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 34000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 36000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 38000, callback: addUfo9, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 42000, callback: addSmallboss1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 52000, callback: addUfo1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 57000, callback: addUfo2, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 62000, callback: addUfo4, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 67000, callback: addUfo7, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 72000, callback: addUfo1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 77000, callback: addBoss, callbackScope: level1, loop:false });
}

function addLevel2(){
        level1.time.addEvent({ delay:  2000, callback: addBrick1,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay:  6000, callback: addBrick1,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 10000, callback: addBrick1,callbackScope: level1, loop: false });

        level1.time.addEvent({ delay: 21000, callback: addBrick2,callbackScope: level1, loop: false }); 
        level1.time.addEvent({ delay: 21000, callback: addBrick3,callbackScope: level1, loop: false }); 
        level1.time.addEvent({ delay: 27000, callback: addBrick2,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 27000, callback: addBrick3,callbackScope: level1, loop: false }); 
        level1.time.addEvent({ delay: 34000, callback: addBrick4,callbackScope: level1, loop: false }); 
        level1.time.addEvent({ delay: 45000, callback: addUfo11,callbackScope: level1, loop: false }); 
        level1.time.addEvent({ delay: 53000, callback: addUfo11,callbackScope: level1, loop: false }); 
        level1.time.addEvent({ delay: 61000, callback: addBrick5,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 69000, callback: addBrick2,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 77000, callback: addBrick4,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 85000, callback: addBrick4,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 96000, callback: addUfo11,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 105000, callback: addBoss2,callbackScope: level1, loop: false });
}

function addLevel3(){

        
       
        level1.time.addEvent({ delay:  4000, callback: addEnemy1,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay:  12000, callback: addEnemy1,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay:  20000, callback: addEnemy1,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay:  30000, callback: addEnemy2,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay:  45000, callback: addEnemy3,callbackScope: level1, loop: false });



}
function addWinningScene(x, y){
    level1.time.addEvent({ delay:  100, callback: 
        function(){
            e = new Enemy({scene:level1, x: x, y:y -40});
            e.body.immovable = true;
            e.anims.play('sprExplosion2');
            e.scaleX = 2;
            e.scaleY = 2;
            },callbackScope: level1, loop: false });

    level1.time.addEvent({ delay:  200, callback: 
        function(){
            e = new Enemy({scene:level1, x: x -50, y:y -40});
            e.body.immovable = true;
            e.anims.play('sprExplosion2');
            e.scaleX = 2;
            e.scaleY = 2;
        },callbackScope: level1, loop: false });
    
    level1.time.addEvent({ delay:  300, callback: 
        function(){
            e = new Enemy({scene:level1, x: x +50, y:y -40});
            e.body.immovable = true;
            e.anims.play('sprExplosion2');
            e.scaleX = 2;
            e.scaleY = 2;
        },callbackScope: level1, loop: false });
      
    level1.time.addEvent({ delay:  400, callback: 
        function(){
            e = new Enemy({scene:level1, x: x +50, y:y -40});
            e.body.immovable = true;
            e.anims.play('sprExplosion2');
            e.scaleX = 2;
            e.scaleY = 2;
        },callbackScope: level1, loop: false });
    
    level1.time.addEvent({ delay:  2000, callback: function(){

         winText.visible = true;
    },callbackScope: level1, loop: false });
   
}

function enemyHitPlayer(player, enemy){
    if(enemy.enemyType=='smallboss' || enemy.enemyType=='smallboss3'|| enemy.enemyType=='smallboss4' || enemy.enemyType=='boss1' || enemy.enemyType=='boss2'|| enemy.enemyType=='boss3'){
        player.anims.play("sprExplosion"); // play the animation
        
        lives = 0;
        updateLive();
        return;
    }
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;
        
        e = new Enemy({scene:level1, x: enemy.x, y:enemy.y});
        e.body.immovable = true;
        e.anims.play('explode2');
        sfxExplode1.play();

    }

    
    lives--;
    updateLive();
    
}


function hitEnemy(bullet, enemy){

    if(enemy.y <= 0){
        return;
    }
    score += 50;
    if(enemy.number > 0){
        enemy.number--;
        e = new Enemy({scene:level1, x: bullet.x, y:bullet.y -40});
        e.body.immovable = true;
        e.anims.play('sprExplosion2');
        bullet.disableBody(false, true); 
        
        if(!enemy.hitLock){
            level1.time.addEvent({ delay: 80, callback: function(){    
                sfxExplode2.play();
                e.destroy();
                enemy.hitLock = false;
                                                                  
            }, callbackScope: level1, loop: false});
            enemy.hitLock = true;
        }
        return;
    }

    if(enemy.enemyType =='boss1'){
        enemy.moveTimer.remove();
        if(enemy.bulletTimer!=null)
            enemy.bulletTimer.remove();
        score+=100;
        if(enemy.winLock==false){
            enemy.winLock = true;
            bossText.visible = false;
            stage++;
            stageText.text = 'stage ' + stage;
            addLevel2();

        }
    }
     if(enemy.enemyType =='boss2'){
        enemy.moveTimer.remove();
         if(enemy.bulletTimer!=null)
            enemy.bulletTimer.remove();
         score+=100;
         if(enemy.winLock==false){
            enemy.winLock = true;
            bossText2.visible = false;
            stage++;
            stageText.text = 'stage ' + stage;
            addLevel3();
         }
     }
    if(enemy.enemyType =='boss3'){
        enemy.moveTimer.remove();
         if(enemy.bulletTimer!=null)
            enemy.bulletTimer.remove();
         score+=200;
         if(enemy.winLock==false){
            enemy.winLock = true;
            bossText3.visible = false;


             
            addWinningScene(bullet.x, bullet.y);
         }
     }
    
    
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;


        e = new Enemy({scene:level1, x: enemy.x, y:enemy.y});
        e.body.immovable = true;
        e.anims.play('sprExplosion');
        sfxExplode2.play();

        bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
        
        if(enemy.enemyType == 'smallboss'){
            liveBall.x = enemy.body.x;
            liveBall.y = enemy.body.y + 50;
            liveBall.setVelocityY(120);
            liveBall.visible = true;
        }
        if(enemy.enemyType == 'boss1' || enemy.enemyType == 'boss2'){
            
            liveBall.x = enemy.body.x;
            liveBall.y = enemy.body.y + 50;
            liveBall.setVelocityY(120);
            liveBall.visible = true;
            
            bulletBall.x = enemy.body.x;
            bulletBall.y = enemy.body.y + 100;
            bulletBall.setVelocityY(140);
            bulletBall.visible = true;
        }
    }
}

var tmp;
function hitPlayer(player, bullet){
    //bullet.setVelocity(0);

    //bullet.anims.play('sprExplosion');
    console.log(lives);
    lives--;
    updateLive();
    
    if(lives == 0){
        return;
    }
    tmp = new Enemy({scene:level1, x: bullet.x, y:bullet.y + 20});
    tmp.body.immovable = true;
    tmp.anims.play('explode3');
    
    if(!lock){
        level1.time.addEvent({ delay: 180, callback: function(){
            sfxExplode1.play();
            tmp.visible = false;
            tmp.destroy();
            lock = false;
        }, callbackScope: level1, loop: false});
        lock = true;
    }
    
    
    bullet.disableBody(false, true); //( [disableGameObject] [, hideGameObject])
}

level1.preload = function ()
{
    this.load.bitmapFont('desyrel', 'assets/font/font.png', 'assets/font/font.xml');
    this.load.bitmapFont('arcade', 'assets/font/arcade.png', 'assets/font/arcade.xml');
    this.load.bitmapFont('topaz', 'assets/font/topaz.png', 'assets/font/topaz.xml');

    
    this.anims.create({
      key: "playergroup",
      frames: this.anims.generateFrameNumbers("playergroup"),
      frameRate: 10,
      repeat: -1
    });
    
     this.anims.create({
      key: "playergroup2",
      frames: this.anims.generateFrameNumbers("playergroup2"),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });  
    
    this.anims.create({
      key: "sprExplosion2",
      frames: this.anims.generateFrameNumbers("sprExplosion2"),
      frameRate: 20,
      repeat: 0
    }); 
    
    this.anims.create({
      key: "explode2",
      frames: this.anims.generateFrameNumbers("explode2"),
      frameRate: 20,
      repeat: 0
    });
    
    this.anims.create({
      key: "explode3",
      frames: this.anims.generateFrameNumbers("explode3"),
      frameRate: 20,
      repeat: 0
    });
    
    this.anims.create({
      key: "enemygroup1",
      frames: this.anims.generateFrameNumbers("enemygroup1"),
      frameRate: 4,
      repeat: -1
    });
        
    this.anims.create({
      key: "enemygroup2",
      frames: this.anims.generateFrameNumbers("enemygroup2"),
      frameRate: 4,
      repeat: -1
    });
         
    this.anims.create({
      key: "enemygroup3",
      frames: this.anims.generateFrameNumbers("enemygroup3"),
      frameRate: 40,
      repeat: -1
    });
    
    this.anims.create({
      key: "enemygroup4",
      frames: this.anims.generateFrameNumbers("enemygroup4"),
      frameRate: 40,
      repeat: -1
    });
    
    this.anims.create({
      key: "smallboss",
      frames: this.anims.generateFrameNumbers("smallboss"),
      frameRate: 4,
      repeat: -1
    });
    
    this.anims.create({
      key: "ufo1",
      frames: this.anims.generateFrameNumbers("ufo1"),
      frameRate: 4,
      repeat: -1
    });
    
    this.anims.create({
      key: "ufo2",
      frames: this.anims.generateFrameNumbers("ufo2"),
      frameRate: 4,
      repeat: -1
    });
    
    this.anims.create({
      key: "ufo4",
      frames: this.anims.generateFrameNumbers("ufo4"),
      frameRate: 4,
      repeat: -1
    });
      
    this.anims.create({
      key: "crab",
      frames: this.anims.generateFrameNumbers("crab"),
      frameRate: 10,
      repeat: -1
    });
    
         
    this.anims.create({
      key: "boss1",
      frames: this.anims.generateFrameNumbers("boss1"),
      frameRate: 10,
      repeat: -1
    });
           
    this.anims.create({
      key: "brick1",
      frames: this.anims.generateFrameNumbers("brick1"),
      frameRate: 5,
      repeat: -1
    });
      this.anims.create({
      key: "boss3",
      frames: this.anims.generateFrameNumbers("boss3"),
      frameRate: 5,
      repeat: -1
    });
    
 
      
},

level1.create = function ()
{
   
    
    gameState = 'running';
    starfield = this.add.tileSprite(worldX/2, worldY/2, worldX, worldY, 'starfield');
    
    liveBall = this.physics.add.sprite(-100, -100, 'live');
    liveBall.setImmovable(true);
    liveBall.visible = false;  
    
    bulletBall = this.physics.add.sprite(-100, -200, 'up');
    bulletBall.setImmovable(true);
    bulletBall.visible = false;
   
    player = this.physics.add.sprite(worldX/2, worldY - 40, 'playergroup2');
    player.setCollideWorldBounds(true);
    player.setImmovable(true);
    player.anims.play('playergroup2');
    


    liveBalls = this.physics.add.group({ defaultKey: 'live', maxSize: 50 });
    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 500 });
    enemybullets = this.physics.add.group({ defaultKey: 'bullet3', maxSize: 500 });
    lazerbullets = this.physics.add.group({ defaultKey: 'bullet1', maxSize: 500 });
    lazerbullets2 = this.physics.add.group({ defaultKey: 'bullet6', maxSize: 500 });
    smallbossbullets = this.physics.add.group({ defaultKey: 'bullet4', maxSize: 500 });
    enemies = this.physics.add.group({ defaultKey: 'enemy1', maxSize: 30, runChildUpdate: true });
 
    cursors = level1.input.keyboard.createCursorKeys();
    
    
    this.input.keyboard.on('keydown', function (event) {
       console.log(gameState);
        
       if(90 == event.keyCode &&  gameState == 'running'){
          
           isShoot = true;

       }

    });
    
    this.input.keyboard.on('keyup', function (event) {
       console.log(event.keyCode);
       if(90 == event.keyCode){
          
           isShoot = false;

       }

    });

    this.physics.world.enable(enemies);
    this.physics.world.enable(bullets);
    this.physics.world.enable(liveBalls);
    this.physics.world.enable(enemybullets);
    this.physics.world.enable(lazerbullets);
    this.physics.world.enable(smallbossbullets);

    
    this.physics.add.overlap(liveBall, player, hitLiveBall, null, this);
    this.physics.add.overlap(liveBalls, player, hitLiveBall2, null, this);
    this.physics.add.overlap(bulletBall, player, hitBulletBall, null, this);
    this.physics.add.overlap(enemybullets, player, hitPlayer, null, this);
    this.physics.add.overlap(lazerbullets, enemies, hitEnemy, null, this);
    this.physics.add.overlap(smallbossbullets, player, hitPlayer, null, this);
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.collider(player,enemies, enemyHitPlayer, null, this);
   
 
    
    // level1

    addLevel1();

    
    if(bgmusic == null){
        bgmusic = this.sound.add('music');
        death = this.sound.add('death');
        sfxExplode = this.sound.add('explode');
        sfxExplode1 = this.sound.add('explode1');
        sfxExplode2 = this.sound.add('explode2');
        sfxPoint = this.sound.add('point');
        sfxBoss1 = this.sound.add('boss1Music');
        sfxBattle1 = this.sound.add('battle1');
        sfxBattle2 = this.sound.add('battle2');
        sfxBattle3 = this.sound.add('battle3');
    }
    
   bgmusic.play({
    volume: .4,
    loop: true
  })
    

    
    for(var i = 0; i < max_live; i++){
        ship[i] = this.physics.add.sprite(30 + i* 30, 60, 'b' + (i+3));
        ship[i].scaleX = 0.8;
        ship[i].scaleY = 0.8;
    }
    


    //dynamic.setScale(3);
    

    b[0] = this.physics.add.sprite(150, 34, 'bullet2');
    
    
    scoreText = this.add.bitmapText(70, 30, 'topaz', pad(score, 8), 28).setOrigin(0.5).setCenterAlign().setInteractive();
    stageText = this.add.bitmapText(worldX-90, 40, 'arcade', 'Stage ' + stage, 16).setOrigin(0.5).setCenterAlign().setInteractive();
    
    overText = this.add.bitmapText(worldX/2,worldY/2, 'desyrel', '', 90).setOrigin(0.5).setCenterAlign().setInteractive();

    overText.setText([
        'GAME OVER'
    ]);
    overText.visible = false; 
    
    winText = this.add.bitmapText(worldX/2, 0, 'desyrel', '', 90).setOrigin(0.5).setCenterAlign().setInteractive();

    winText.setText([
        'YOU WIN'
    ]);
    winText.visible = false;
 
},


level1.update = function (time, delta)
{
    scoreText.text =  pad(score, 8);
    if(winText.visible && winText.y <= 300){
        winText.y += 2;
         gameState = 'win';
    }


    if(gameState == 'win'){
        
       this.time.addEvent({ delay: 8000, callback: function(){
       lives = max_live;

       gameState = 'running'
       menu.scene.stop('menu');
       this.scene.stop('level1');
       removeAllObjects();
       menu.scene.restart();
       sfxBattle3.stop();


        }, callbackScope: this, loop: false }); 
    }
    
    if(stage==1){
        starfield.tilePositionY -= 2; // background scrolling
    }
    else if(stage==2){
        starfield.tilePositionY -= 3; // background scrolling
    }
    else if(stage==3){
        starfield.tilePositionY -= 4; // background scrolling
    }
   
    player.setVelocity(0); // player velocity

    if (cursors.left.isDown)
    {
        player.setVelocityX(-400);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(400);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(300);
    }
    
    if(isShoot){
     if(time >= lastTime){
                shoot();
                sfxExplode.play({volume: .2, loop: false})
                lastTime = time + shootTime[stage-1];
            }
    }
    
    bullets.children.each(function(b) {
           if(b.y < 0 || !b.visible){
               bullets.remove(b);
           }
    });

    enemybullets.children.each(function(b) {
           if(!b.visible || b.y > worldY || b.x > worldX || b.x < 0 || b.y < 0){
               enemybullets.remove(b);
           }
           
    });

    smallbossbullets.children.each(function(b) {
           if(!b.visible || b.y > worldY || b.x > worldX || b.x < 0 || b.y < 0){
               smallbossbullets.remove(b);
           }
           
    }); 
    
    lazerbullets.children.each(function(b) {
           if(!b.visible || b.y > worldY || b.x > worldX || b.x < 0 || b.y < 0){
               lazerbullets.remove(b);
           }
           
    });
    
   
    enemies.children.iterate((child) => {
    child.update = function (time, delta) {
        var delatTime = 2000;
        if(child.enemyType == 'smallboss'){
         
            var dir = direction[child.index];
            if(dir == 'left'){
                child.x -= 2;
            }
            if(dir == 'right'){
                child.x += 2;
            }
            if(dir == 'up'){
                child.y -= 2;
            }
            if(dir == 'down'){
                child.y += 2;
            }
            if(child.moveTimer == null){
                child.moveTimer = level1.time.addEvent({ 
                    delay: delatTime, 
                    callback: function(){
                        child.index ++;
                        if(child.index == 12){
                            child.index = 4;
                        }
                    },
                    callbackScope: level1, 
                    loop: true }); 
            }
            
            if(child.bulletTimer==null){
                child.bulletTimer = level1.time.addEvent({ delay: 1500, callback: fire, args:[child], callbackScope: level1, loop: false });  
                
            }

        }
        if(child.y >= child.body.height/2 && child.isCollide){
            child.body.setCollideWorldBounds(true); //ball can't leave the screen
            child.body.setBounce(1, 1);
        }
        if(child.enemyType == 'boss1' || child.enemyType == 'boss2'){
            
            var dir = direction[child.index];
            if(dir == 'left'){
                child.x -= 2;
            }
            if(dir == 'right'){
                child.x += 2;
            }
            if(dir == 'up'){
                child.y -= 2;
            }
            if(dir == 'down'){
                child.y += 2;
            }
            if(child.moveTimer==null){
                child.moveTimer = level1.time.addEvent({ 
                    delay: 1700, 
                    callback: function(){
                        child.index ++;
                        if(child.index == 12){
                            child.index = 4;
                        }
                    },
                    callbackScope: level1, 
                    loop: true }); 
            }
            
            if(child.bulletTimer==null){

                child.bulletTimer = level1.time.addEvent({ delay: 1400, callback: fire, args: [child], callbackScope: level1, loop: false });  
                
            }

        }
        if(child.enemyType == 'boss3'){
            

            if(child.moveTimer==null){
                
                child.moveTimer = level1.time.addEvent({ 
                    delay: 8000, 
                    callback: function(){
                        var live = liveBalls.get(child.x, child.y + 100);
                        if (live) {
                            live.x = child.body.x;
                            live.y = child.body.y + 50;
                            if(Math.random() >= 0.5)
                                live.setVelocityY(100);
                            else
                                live.setVelocityY(-100);
                            live.setVelocityX(100);
                            live.visible = true;
                            live.body.setCollideWorldBounds(true); //ball can't leave the screen
                            live.body.setBounce(1, 1);
                        }
                       
                    },
                    callbackScope: level1, 
                    loop: true }); 
            }
            
            if(child.bulletTimer==null){
                
                child.bulletTimer = level1.time.addEvent({ delay: 1500, callback: fire2, args: [child], callbackScope: level1, loop: false });  
                
            }

        }
        
        if(child.enemyType == 'smallboss3' || child.enemyType == 'smallboss4'){
            

            if(child.bulletTimer==null){
                
                child.bulletTimer = level1.time.addEvent({ delay: 1500, callback: fire3, args: [child], callbackScope: level1, loop: false });  
                
            }
            

        }
        if(child.enemyType == 'smallboss4'){
            if(child.moveTimer==null && child.number <=2){
                    child.moveTimer = level1.time.addEvent({ delay:  1000, callback: addBoss3,callbackScope: level1, loop: false });
                }
        }
        
        if(this.enemyType == 'attack' || this.enemyType == 'attack2' || this.enemyType == 'scatter'){
            
            if(!this.timerLock && Math.abs(this.x - player.body.x) < 500 && this.y > 0){
                this.timerLock = true;
                level1.time.addEvent({ delay: 10, callback: 
                function(){
                    level1.time.addEvent({ 
                        delay: 1300, 
                        callback: function(){
                            child.timerLock = false;
                        },
                        callbackScope: level1, 
                        loop: false });    
                        if(!child.isDead)
                            enemyFire(child);

                },
                callbackScope: level1, loop: false });    
            }
        }
        else if(this.enemyType == 'attack3'){
            
            if(!this.timerLock && this.y < worldY-250){
                this.timerLock = true;
                level1.time.addEvent({ delay: 1200, callback: 
                function(){
                    
                    if(!child.isDead)
                        enemyFire(child);

                },
                callbackScope: level1, loop: true });    
            }
        }
        else if(this.enemyType == 'regular'){
            if(!this.timerLock && Math.abs(this.x - player.body.x) < 70){
                this.timerLock = true;
                level1.time.addEvent({ delay: 10, callback: 
                function(){
                    level1.time.addEvent({ 
                        delay: 2000, 
                        callback: function(){
                            child.timerLock = false;
                        },
                        callbackScope: level1, 
                        loop: false });    
                        if(!child.isDead)
                            enemyFire(child);

                },
                callbackScope: level1, loop: false });    
            }
        }
        else if(this.enemyType == 'round' && this.y < worldY && this.y > 0){
            if(!this.timerLock){
                this.timerLock = true;
                level1.time.addEvent({ delay: 2000, callback: 
                    function(){
                          if(!child.isDead)
                            enemyFire(child);
                         child.timerLock = false;
                     }, callbackScope: level1, loop: false });  
                 
            }
        }
        else if(this.enemyType == 'line' && this.y < worldY && this.y > 0){
            if(!this.timerLock){
                this.timerLock = true;
                level1.time.addEvent({ delay: 1000, callback: 
                    function(){
                          if(!child.isDead)
                            enemyFire(child);
                         child.timerLock = false;
                     }, callbackScope: level1, loop: false });  
                 
            }
            if(this.y < worldY && this.y >= 300){
                if(this.moveTimer==null){
                    this.moveTimer = level1.time.addEvent({ delay: 100, callback: 
                        function(){
                              child.body.setVelocityY(-100);
                         }, callbackScope: level1, loop: false });  

                }
            }
            
            
        }
        else if(this.enemyType == 'round_back'){
          
            if(!this.timerLock){
                this.timerLock = true;
                level1.time.addEvent({ delay: 1500, callback: 
                    function(){

                          if(!child.isDead)
                            enemyFire(child);
                         child.timerLock = false;
                     }, callbackScope: level1, loop: false });  
                 
            }
            if(this.y < worldY && this.y >= 400){
                if(this.moveTimer==null){
                    this.moveTimer = level1.time.addEvent({ delay: 100, callback: 
                        function(){
                              if(!child.isDead){
                                if(Math.random() >= 0.5)
                                    child.body.setVelocityX(50);
                                else
                                    child.body.setVelocityX(-50);
                                child.body.setVelocityY(-100);
                              }
                         }, callbackScope: level1, loop: false });  

                }
            }
            if(this.timerLock && this.y <= 100){
                child.body.setVelocityY(120);
            }
        }
        
        if(this.body.y >= worldY || this.isDead){
            enemies.remove(child, true);
        }

    };

    if(lives <= 0){
        sfxBattle1.stop();
        sfxBattle2.stop();
        sfxBattle3.stop();
        sfxBoss1.stop();
        bgmusic.stop();
        player.visible = false;
        if(gameState == 'running'){
            gameState = 'over';
                    
            this.time.addEvent({ delay: 8000, callback: function(){
               lives = max_live;
  
               gameState == 'running'
               menu.scene.stop('menu');
               this.scene.stop('level1');
               removeAllObjects();
               menu.scene.restart();


            }, callbackScope: this, loop: false }); 
        }   
    
        if(!overText.visible){
            
            playOverAnimation();
            
            overText.visible = true;
            player.disableBody(true,true);
            bgmusic.stop();
            death.play({
            volume: .5,
            loop: false
          })

        }

    }
    


  })

    globalTime = time;

}
