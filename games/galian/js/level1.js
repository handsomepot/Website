const max_live = 5;
var starfield;
var player;
var bullets;
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
var flip = true;
var globalTime;
var lock = false;
var lives = max_live; // lives
var bulletNum = 1; 
var direction = ['down','right','left','down', 'up','left','right','down', 'up','right','left','down'];
var liveBall;
var bulletBall;
var currentBoss = null;
var overText;
var gameState = 'running';
var t1,t2;
var isShoot = false;
var stage = 1;
var bossText, bossText2;
var stageText;
var scoreText;
var score = 0;
var ship = [];
var b = [];
var shootTime = [230,200,170];


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
    } 
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
    

    flip = true;
    lock = false;
    liveBall.destroy();
    bulletBall.destroy();
    //currentBoss.destroy();
    overText.destroy();
    stage = 1;
    bulletNum = 1;

    ship = [];
    b = [];

}


// boss fire
function fire(){
    

    if(flip){
        level1.time.addEvent({ delay: 300, callback: 
          function(){
        if(!currentBoss.isDead)
                bossFire1(currentBoss.x, currentBoss.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 700, callback: 
          function(){
            if(!currentBoss.isDead)
                bossFire1(currentBoss.x, currentBoss.y);
        },callbackScope: level1, loop: false });  
        
        if(currentBoss.enemyType == 'boss1' || currentBoss.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 1100, callback: 
              function(){
                if(!currentBoss.isDead)
                    bossFire1(currentBoss.x, currentBoss.y);
            },callbackScope: level1, loop: false });  
        }
        
        if(currentBoss.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 1500, callback: 
              function(){
                if(!currentBoss.isDead)
                    bossFire1(currentBoss.x, currentBoss.y);
            },callbackScope: level1, loop: false });  
        }
        

    }
    
    else{
        level1.time.addEvent({ delay: 250, callback: 
          function(){
            if(!currentBoss.isDead)
                bossFire2(currentBoss.x, currentBoss.y);
        },callbackScope: level1, loop: false });  

        level1.time.addEvent({ delay: 450, callback: 
          function(){
            if(!currentBoss.isDead)
                bossFire2(currentBoss.x, currentBoss.y);
        },callbackScope: level1, loop: false });  

        if(currentBoss.enemyType == 'boss1' || currentBoss.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 650, callback: 
              function(){
                if(!currentBoss.isDead)
                    bossFire2(currentBoss.x, currentBoss.y);
            },callbackScope: level1, loop: false });  

        }
        if(currentBoss.enemyType == 'boss2'){
            level1.time.addEvent({ delay: 850, callback: 
              function(){
                if(!currentBoss.isDead)
                    bossFire2(currentBoss.x, currentBoss.y);
            },callbackScope: level1, loop: false });  

        }
         
    }
    currentBoss.bulletTimer = null;
    flip = !flip;
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
    
        

    
 
    /*if(bulletNum >=2){
        bullet = bullets.get(player.body.x + w/4, player.body.y - 24);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = vy;
        }

        bullet = bullets.get(player.body.x + w/4*3, player.body.y-24);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = vy;
        }
    }*/
    
    
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


function enemyFire(x, y, type) {
    
    if(type == 'regular'){
        var bullet = enemybullets.get(x, y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 350;
        }
    }
    else if(type == 'attack'){
        var bullet = enemybullets.get(x, y);
        if (bullet) {
            var dx = Math.abs(player.body.x - x);
            var dy = Math.abs(player.body.y - y);
            var ratio = 200000/(dx*dx + dy*dy);
            ratio = Math.sqrt(ratio);
          
            var vx = (player.body.x - x) * ratio;
            var vy = (player.body.y - y) * ratio;

            bullet.body.velocity.x = vx;
            bullet.body.velocity.y = vy;
        }
    }
    else if(type == 'attack2' || type == 'attack3'){
        var bullet = enemybullets.get(x, y);
        if (bullet) {
            var dx = Math.abs(player.body.x - x);
            var dy = Math.abs(player.body.y - y);
            var ratio = 280000/(dx*dx + dy*dy);
            ratio = Math.sqrt(ratio);
          
            var vx = (player.body.x - x) * ratio;
            var vy = (player.body.y - y) * ratio;

            bullet.body.velocity.x = vx;
            bullet.body.velocity.y = vy;
        }
    }
    
    else if(type == 'scatter'){
        var bullet = enemybullets.get(x, y);
        if (bullet) {
            
            bullet.body.velocity.x = 300;
            bullet.body.velocity.y = 0;
        }
        
        bullet = enemybullets.get(x, y);
        if (bullet) {
            
            bullet.body.velocity.x = -300;
            bullet.body.velocity.y = 0;
        }
        
        bullet = enemybullets.get(x, y);
        if (bullet) {
            
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = -300;
        }
        
        bullet = enemybullets.get(x, y);
        if (bullet) {
            
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = 300;
        }
    }
    
    else if(type == 'round' || type == 'round_back'){
        level1.time.addEvent({ delay: 350, callback: 
              function(){
                bossFire1(x,y);
        },callbackScope: level1, loop: false });  
       bossFire1(x,y);
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
    e = new Enemy({scene:level1, x: 0, y:0, defaultKey:'ufo4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 60;
    e.body.velocity.x = 180;
    e.enemyType = 'attack';
    e.number = 5;
    
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    
    e.anims.play('ufo4');


    e = new Enemy({scene:level1, x: 80, y:80, defaultKey:'ufo4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 60;
    e.body.velocity.x = 180;
    e.enemyType = 'attack';
    e.number = 5;
    
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    e.anims.play('ufo4');
    

    e = new Enemy({scene:level1, x: 160, y:160, defaultKey:'ufo4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 60;
    e.body.velocity.x = 180;
    e.enemyType = 'attack';
    e.number = 5;
    
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
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
    
    e = new Enemy({scene:level1, x: 420, y:0, defaultKey:'ufo6'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack';
    e.body.velocity.y = 90;
    e.body.velocity.x = -250;
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    e.number = 5;

    e = new Enemy({scene:level1, x: 340, y:50, defaultKey:'ufo7'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack';
    e.body.velocity.y = 90;
    e.body.velocity.x = -250;
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    e.number = 5;

    
    e = new Enemy({scene:level1, x: 260, y: 100, defaultKey:'ufo8'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack';
    e.body.velocity.y = 90;
    e.body.velocity.x = -250;
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
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
    if(currentBoss!=null){
        if(currentBoss.bulletTimer!=null)
            currentBoss.bulletTimer.remove();
        currentBoss.moveTimer.remove();
        currentBoss.destroy();
    }
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
    
    e = new Enemy({scene:level1, x: 0, y:worldY/2, defaultKey:'ufo6'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack3';
    e.body.velocity.y = -130;
    e.body.velocity.x = 20;
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    e.number = 8;

    
    e = new Enemy({scene:level1, x: worldX-20, y: worldY/2, defaultKey:'ufo8'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'attack3';
    e.body.velocity.y = -130;
    e.body.velocity.x = -20;
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    e.number = 8;
}

function addUfo12(){
    
    e = new Enemy({scene:level1, x: worldX/2, y:0, defaultKey:'ufo1'});
    enemies.add(e);
    e.body.immovable = true;
    e.enemyType = 'round_back';
    e.body.velocity.y = 80;
    e.body.velocity.x = 0;
    e.body.setCollideWorldBounds(true); //ball can't leave the screen
    e.body.setBounce(1, 1);
    e.number = 48;

}


function addBoss(){
    if(currentBoss!=null){
        if(currentBoss.bulletTimer!=null)
            currentBoss.bulletTimer.remove();
        currentBoss.moveTimer.remove();
        currentBoss.destroy();
    }
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
    e.number = 30;
    e.anims.play('brick1');
    e.body.velocity.y = 90;

}

function addBrick5(){ // crab small
    if(currentBoss!=null){
        if(currentBoss.bulletTimer!=null)
            currentBoss.bulletTimer.remove();
        currentBoss.moveTimer.remove();
        currentBoss.destroy();
    }
    e = new Enemy({scene:level1, x: worldX/2, y:-20, defaultKey:'crab'});
    enemies.add(e);
    e.enemyType = 'smallboss';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 70;
    e.anims.play('crab');

}

function addBoss2(){ // crab 
    if(currentBoss!=null){
        if(currentBoss.bulletTimer!=null)
            currentBoss.bulletTimer.remove();
        currentBoss.moveTimer.remove();
        currentBoss.destroy();
    }
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


function hitLiveBall(){
    
    
    if(lives < max_live && lives >=0){
        ship[lives].setAlpha(1);
        lives++;
    }

    
            
    if(liveBall.visible){
        sfxPoint.play();
        liveBall.body.x = -100;
        liveBall.body.y = -100;
        liveBall.visible = false;
    }

}

function hitBulletBall(){
    
    b[bulletNum] = level1.physics.add.sprite(180 + bulletNum*15, 40, 'bullet2');
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
    level1.time.addEvent({ delay: 11000, callback: addUfo4, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 15000, callback: addUfo5, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 19000, callback: addUfo6, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 23000, callback: addUfo7, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 27000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 29000, callback: addUfo9, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 31000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 33000, callback: addUfo9, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 35000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 37000, callback: addUfo8, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 39000, callback: addUfo9, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 43000, callback: addSmallboss1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 53000, callback: addUfo1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 58000, callback: addUfo2, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 63000, callback: addUfo4, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 68000, callback: addUfo7, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 72000, callback: addUfo1, callbackScope: level1, loop:false });
    level1.time.addEvent({ delay: 78000, callback: addBoss, callbackScope: level1, loop:false });
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
        level1.time.addEvent({ delay: 69000, callback: addBrick4,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 77000, callback: addBrick4,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 85000, callback: addBrick4,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 96000, callback: addUfo11,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay: 105000, callback: addBoss2,callbackScope: level1, loop: false });
}

function addLevel3(){
        level1.time.addEvent({ delay:  2000, callback: addUfo12,callbackScope: level1, loop: false });
        level1.time.addEvent({ delay:  8000, callback: addUfo12,callbackScope: level1, loop: false });
}

function enemyHitPlayer(player, enemy){
    if(enemy.enemyType=='smallboss' || enemy.enemyType=='boss1' || enemy.enemyType=='boss2'){
        player.anims.play("sprExplosion"); // play the animation
        
        lives = 0;
        return;
    }
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;
        
        e = new Enemy({scene:level1, x: enemy.x, y:enemy.y});
        e.body.immovable = true;
        e.anims.play('explode2');
        sfxExplode1.play();

    }
    
    /*if(!enemy.isDead){
        enemy.isDead = true;
        enemy.anims.play("explode2"); // play the animation
        sfxExplode1.play();
    }*/
    
    lives--;
    if(lives>=0)
        ship[lives].setAlpha(0.15);
    
}


function hitEnemy(bullet, enemy){

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
         score+=100;
         if(enemy.winLock==false){
            enemy.winLock = true;
            bossText2.visible = false;
            stage++;
            stageText.text = 'stage ' + stage;
            addLevel3();
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
    if(lives>=0)
        ship[lives].setAlpha(0.15);
    
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
    


    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 500 });
    enemybullets = this.physics.add.group({ defaultKey: 'bullet3', maxSize: 500 });
    lazerbullets = this.physics.add.group({ defaultKey: 'bullet5', maxSize: 500 });
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
    this.physics.world.enable(enemybullets);
    this.physics.world.enable(lazerbullets);
    this.physics.world.enable(lazerbullets2);
    this.physics.world.enable(smallbossbullets);

    
    this.physics.add.overlap(liveBall, player, hitLiveBall, null, this);
    this.physics.add.overlap(bulletBall, player, hitBulletBall, null, this);
    this.physics.add.overlap(enemybullets, player, hitPlayer, null, this);
    this.physics.add.overlap(lazerbullets, player, hitPlayer, null, this);
    this.physics.add.overlap(lazerbullets2, player, hitPlayer, null, this);
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
    

    b[0] = this.physics.add.sprite(180, 40, 'bullet2');
    
    
    scoreText = this.add.bitmapText(90, 40, 'arcade', pad(score, 8), 18).setOrigin(0.5).setCenterAlign().setInteractive();
    stageText = this.add.bitmapText(worldX-90, 40, 'arcade', 'Stage ' + stage, 16).setOrigin(0.5).setCenterAlign().setInteractive();
    
    overText = this.add.bitmapText(worldX/2,worldY/2, 'desyrel', '', 90).setOrigin(0.5).setCenterAlign().setInteractive();

    overText.setText([
        'GAME OVER'
    ]);
    overText.visible = false;
 
},


level1.update = function (time, delta)
{
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
                currentBoss = child;
                child.bulletTimer = level1.time.addEvent({ delay: 1500, callback: fire, callbackScope: level1, loop: false });  
                
            }

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
            
                currentBoss = child;
                child.bulletTimer = level1.time.addEvent({ delay: 1400, callback: fire, callbackScope: level1, loop: false });  
                
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
                            enemyFire(child.x, child.y + 20, child.enemyType);

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
                        enemyFire(child.x, child.y + 20, child.enemyType);

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
                            enemyFire(child.x, child.y + 20, child.enemyType);

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
                            enemyFire(child.x, child.y + 20, child.enemyType);
                         child.timerLock = false;
                     }, callbackScope: level1, loop: false });  
                 
            }
        }
        else if(this.enemyType == 'round_back'){
          
            if(!this.timerLock){
                this.timerLock = true;
                level1.time.addEvent({ delay: 3000, callback: 
                    function(){
                          if(!child.isDead)
                            enemyFire(child.x, child.y + 20, child.enemyType);
                         child.timerLock = false;
                     }, callbackScope: level1, loop: false });  
                 
            }
            if(this.y < worldY && this.y >= 500){
                if(this.moveTimer==null){
                    this.moveTimer = level1.time.addEvent({ delay: 100, callback: 
                        function(){
                              if(!child.isDead)
                                child.body.setVelocityX(50);
                                child.body.setVelocityY(-100);
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
            player.anims.play("sprExplosion");
            overText.visible = true;
            player.disableBody(true, true); 
            bgmusic.stop();
            death.play({
            volume: .5,
            loop: false
          })

        }

    }
        
    scoreText.text =  pad(score, 8);

  })
    globalTime = time;

}
