var starfield;
var player;
var bullets;
var enemybullets;
var bossbullets;
var lastTime = 0;
var lastTime2 = 0;
var cursorKeys;
var sfxExplode;
var sfxExplode2;
var bgmusic;
var block = [];
var flip = true;
var isplay = false;
var globalTime;
var enemyType = [2,3,4,5,5,5,1,2,3,4,5,5,5,5,7,6,7,8,9,8,9,10,8,9];
var enemyIndex = 0;
var firstTimeEvent;  
var lives = 5; // lives
/*    1   2          3         4        5           6    7        8      9      10
*   O O  O O         O        O O         O         O     O        O     O   boss
*    O    O        O   O      O O     O           O         O
*                 O     O     O O         O     O             O
*                                    O
*                                       O
*/

// path /Users/riley/Documents/Website/games/space_battle/assets/bullet2.png
// path /Users/riley/Documents/Website/games/space_battle/assets/enemy2.png
class Enemy extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.defaultKey);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.lastTime = 0;
        this.moveTime = 0;
        this.isDead = false; 
        this.number = 0;
        this.enemyType = 'regular';
        this.direction = 'down';
    } 
}

function shoot() {
       
    var w = player.body.width;
    var bullet = bullets.get(player.body.x + w/4, player.body.y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = -550;
    }
    
    bullet = bullets.get(player.body.x + w/4*3, player.body.y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = -550;
    }
    
        
        
}
var flip = false;
function enemyFire(x, y, type) {
    
    if(type == 'regular'){
        var bullet = enemybullets.get(x, y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 300;
        }
    }
    else if(type == 'attack'){
        var bullet = enemybullets.get(x, y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 300;
            bullet.body.velocity.x = (player.body.x - x)*2;
        }
    }
    else if(type == 'boss'){
            var dx = [0, 0, 1, -1, 1, -1, 1, -1];
            var dy = [1, -1, 0, 0, 1, 1, -1, -1];
            var v = [1,1,1,1,0.7, 0.7, 0.7, 0.7];
            
            if(flip){
                for(var i = 0; i < dx.length; i ++){
                    var bullet = bossbullets.get(x + dx[i] * 30, y + dy[i]*30);
                    if (bullet) {
                        bullet.setActive(true);
                        bullet.setVisible(true);
                        bullet.body.velocity.x = dx[i]*250 * v[i];
                        bullet.body.velocity.y = dy[i]*250 * v[i];
                    }
                }
            }

            else{
                for(var i = 0; i < 4; i ++){
                    var bullet = bossbullets.get(x, y + (i-1) * 20);
                    if (bullet) {
                        bullet.setActive(true);
                        bullet.setVisible(true);
                        bullet.body.velocity.y = 250 + i * 20;
                        bullet.body.velocity.x = 0;
                    }
                }
            }
            flip = !flip;
            
    }
        
}

function addEnemyGroup1(){
    e = new Enemy({scene:level1, x: 80, y:-110, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 140, y:0, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 200, y:-110, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('enemygroup1');
}

function addEnemyGroup2(){
    
    e = new Enemy({scene:level1, x: 520, y:-110, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 460, y:0, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 400, y: -110, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 170;
    e.anims.play('enemygroup1');
}

function addEnemyGroup3(){
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');
    
    e = new Enemy({scene:level1, x: 180, y:-60, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 300, y:-120, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');
    
    e = new Enemy({scene:level1, x: 420, y:-60, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 520, y:0, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');
    

}

function addEnemyGroup4(){
    e = new Enemy({scene:level1, x: 100, y:-200, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    
    e = new Enemy({scene:level1, x: 100, y:-100, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;

    e = new Enemy({scene:level1, x: 100, y:0, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    
    e = new Enemy({scene:level1, x: 500, y:-200, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    
    e = new Enemy({scene:level1, x: 500, y:-100, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;

    e = new Enemy({scene:level1, x: 500, y:0, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
}

function addEnemyGroup5(){  // S shape
    e = new Enemy({scene:level1, x: 120, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 0,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    
    e = new Enemy({scene:level1, x: 120, y:-80, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 400,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
     
    e = new Enemy({scene:level1, x: 120, y:-160, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
        e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 800,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    
    e = new Enemy({scene:level1, x: 120, y:-240, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 1200,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 

    e = new Enemy({scene:level1, x: 120, y:-320, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 1600,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    e = new Enemy({scene:level1, x: 120, y:-400, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    e = new Enemy({scene:level1, x: 120, y:-480, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1200,
        x: 480,
        delay: 2400,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 

}

function addEnemyGroup6(){
    
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 160, y:-50, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 240, y: -100, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');
}


function addEnemyGroup7(){
    
    e = new Enemy({scene:level1, x: 520, y:0, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 440, y:-50, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');

    e = new Enemy({scene:level1, x: 360, y: -100, defaultKey:'enemygroup1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup1');
}

function addEnemyGroup8(){
    e = new Enemy({scene:level1, x: 100, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'attack';
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup4');
    
    e = new Enemy({scene:level1, x: 100, y:-100, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'attack';
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup4');
  
}


function addEnemyGroup9(){
    e = new Enemy({scene:level1, x: 500, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'attack';
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup4');
    
    e = new Enemy({scene:level1, x: 500, y:-100, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.enemyType = 'attack';
    e.body.immovable = true;
    e.body.velocity.y = 150;
    e.anims.play('enemygroup4');
  
}


function addEnemyGroup10(){
    e = new Enemy({scene:level1, x: 300, y:0, defaultKey:'boss'});
    enemies.add(e);
    e.enemyType = 'boss';
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 40;
    e.scaleX = 1.5;
    e.scaleY = 1.5;
  
}


function addEnemy(){

    if(enemyIndex >= enemyType.length){
        //enemyIndex = 0;
        return;
    }
    var x = enemyType[enemyIndex];
    switch(x){
        case 1:
            addEnemyGroup1();
            break;
        case 2:
            addEnemyGroup2();
            break;
        case 3:
            addEnemyGroup3();
            break;
        case 4:
            addEnemyGroup4();
            break;
        case 5:
            addEnemyGroup5();
            break;
        case 6:
            addEnemyGroup6();
            break;
        case 7:
            addEnemyGroup7();
            break;
        case 8:
            addEnemyGroup8();
            break; 
        case 9:
            addEnemyGroup9();
            break;        
        case 10:
            addEnemyGroup10();
            break;
    }

    enemyIndex++;
}

function addFirstEnemy(){
    level1.time.addEvent({ delay: 2500, callback: addEnemy, callbackScope: level1, loop: true });
    firstTimeEvent.remove();

}


function enemyHitPlayer(player, enemy){
    if(enemy.enemyType=='boss'){
        player.anims.play("sprExplosion"); // play the animation
    }
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;
        enemy.anims.play("explode2"); // play the animation
        enemy.lastTime = globalTime;
        sfxExplode1.play();
    }
    lives--;
    if(lives >= 0)
        block[lives].visible = false;
}

var lock = false;
function playExplosionSound(){
    sfxExplode2.play();
    lock = false;
}

function hitEnemy(bullet, enemy){

    
    if(enemy.number > 0){
        enemy.number--;
        e = new Enemy({scene:level1, x: bullet.x, y:bullet.y -40});
        e.body.immovable = true;
        e.anims.play('sprExplosion');
        bullet.disableBody(false, true); 
        
        if(!lock){
            level1.time.addEvent({ delay: 80, callback: function(){    
                sfxExplode2.play();
                e.destroy();
                lock = false;
                                                                  
            }, callbackScope: level1, loop: false});
            lock = true;
        }
        return;
    }

    if(enemy.enemyType =='boss'){

        if(enemy.number <= 0){
            console.log('level2');
            if(!lock){
                level1.time.addEvent({ delay: 2800, callback: function(){level1.scene.start('level2');}, callbackScope: level1, loop: false});
                lock = true;
            }
        }
    }

    
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;
        enemy.anims.play("sprExplosion"); // play the animation
        enemy.lastTime = globalTime;
        sfxExplode2.play();

        bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
    }
}

function stopAnimation(){
    console.log('stop');
    //player.anims.pause(player.anims.currentAnim.frames[0]);
    isplay = false;
}

function hitPlayer(player, bullet){
    //bullet.setVelocity(0);

    //bullet.anims.play('sprExplosion');
    lives--;
    if(lives >= 0)
        block[lives].visible = false;
    e = new Enemy({scene:level1, x: bullet.x, y:bullet.y + 20});
    //enemies.add(e);
    e.body.immovable = true;
    e.anims.play('explode3');
    //e.visible = false;
    
    if(!lock){
        level1.time.addEvent({ delay: 80, callback: function(){
            sfxExplode1.play();
            e.destroy();
            lock = false;
        }, callbackScope: level1, loop: false});
        lock = true;
    }
    
    
    bullet.disableBody(false, true); //( [disableGameObject] [, hideGameObject])
}

level1.preload = function ()
{
    this.anims.create({
      key: "playergroup",
      frames: this.anims.generateFrameNumbers("playergroup"),
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
      key: "explode2",
      frames: this.anims.generateFrameNumbers("explode2"),
      frameRate: 30,
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
      frameRate: 4,
      repeat: -1
    });
    
    this.anims.create({
      key: "enemygroup4",
      frames: this.anims.generateFrameNumbers("enemygroup4"),
      frameRate: 8,
      repeat: -1
    });
    

      
},

level1.create = function ()
{
    
    starfield = level1.add.tileSprite(worldX/2, worldY/2, worldX, worldY, 'starfield');
    
    player = this.physics.add.sprite(400, 700, 'playergroup');
    player.setCollideWorldBounds(true);
    player.setImmovable(true);
    player.anims.play('playergroup');
    
    for(var i = 0; i < 5; i++){
        var b = this.physics.add.sprite(38 + 38*i, 40, 'b' + (i+1));
        block.push(b);
        b.scaleX = 0.8;
        //ifb.scaleY = 0.8;
        b.setAlpha(0.5);
    }
    
    
    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 500 });
    enemybullets = this.physics.add.group({ defaultKey: 'bullet3', maxSize: 500 });
    bossbullets = this.physics.add.group({ defaultKey: 'bullet4', maxSize: 500 });
    enemies = this.physics.add.group({ defaultKey: 'enemy1', maxSize: 30, runChildUpdate: true });
 
    cursors = level1.input.keyboard.createCursorKeys();
    cursorKeys = level1.input.keyboard.createCursorKeys();

    this.physics.world.enable(enemies);
    this.physics.world.enable(bullets);
    this.physics.world.enable(enemybullets);
    this.physics.world.enable(bossbullets);
    this.physics.add.overlap(enemybullets, player, hitPlayer, null, this);
    this.physics.add.overlap(bossbullets, player, hitPlayer, null, this);
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.collider(player,enemies, enemyHitPlayer, null, this);
   
    this.time.addEvent({ delay: 1500, callback: addEnemyGroup1,callbackScope: this, loop: false });    
    this.time.addEvent({ delay: 4000, callback: addEnemyGroup2, callbackScope: this, loop:false });
    this.time.addEvent({ delay: 7000, callback: addEnemyGroup3, callbackScope: this, loop: false }); 
    this.time.addEvent({ delay: 11000, callback: addEnemyGroup4, callbackScope: this, loop: false }); 
    this.time.addEvent({ delay: 15500, callback: addEnemyGroup5, callbackScope: this, loop: false }); 
    this.time.addEvent({ delay: 19000, callback: addEnemyGroup5, callbackScope: this, loop: false }); 
    this.time.addEvent({ delay: 23500, callback: addEnemyGroup5, callbackScope: this, loop: false }); 

    

    bgmusic = this.sound.add('music');
    sfxExplode = this.sound.add('explode');
    sfxExplode1 = this.sound.add('explode1');
    sfxExplode2 = this.sound.add('explode2');
    
    bgmusic.play({
    volume: .4,
    loop: true
  })
    
    var stageText = this.add.text(
    this.physics.world.bounds.width -100,
    40,
    'Stage 1',
    {
      fontFamily:  'monospace',
      fontSize: '22px',
      fill: '#fff',
    },
    );
    stageText.setOrigin(0.5);
    stageText.setAlpha(0.75);
},

    

level1.update = function (time, delta)
{
    
    starfield.tilePositionY -= 2; // background scrolling
    
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
    if (cursorKeys.space.isDown)
    {
        if(time >= lastTime){
            shoot();
            sfxExplode.play({volume: .2, loop: false})
            lastTime = time + 250;
        }
    }
    
    bullets.children.each(function(b) {
           if(b.y < 0 || !b.visible){
               bullets.remove(b);
           }
    });

    enemybullets.children.each(function(b) {
           if(!b.visible || b.y > worldY){
               enemybullets.remove(b);
           }
           
    });
    
   
    enemies.children.iterate((child) => {
    child.update = function (time, delta) {
        
        if(this.enemyType == 'boss'){
           if(this.y <= 250){
               this.y += 2; // go down
           }
           if(this.moveTime == 0)
                this.moveTime = time;
           if(time > this.moveTime + 8000  && this.x >=100){
               this.x --;
           } 
           else if(time > this.moveTime + 4000 && this.x <= 500){
               this.x ++;
           } 
           
           if(!this.isDead){
                
                   if(time > this.lastTime + 1600){

                        var w = this.body.width;
                        var h = this.body.height;
                        enemyFire(this.body.x + w/2, this.body.y + h + 10, this.enemyType);
                        this.lastTime = time;

                    }
           }

        }
        else if(this.enemyType == 'attack'){

            if(Math.abs(this.body.y - player.body.y) <= 550 && !this.isDead){

                if(time > this.lastTime + 1200){

                    var w = this.body.width;
                    var h = this.body.height;
                    enemyFire(this.body.x + w/2, this.body.y + h + 10, this.enemyType);
                    this.lastTime = time;
                    console.log(this.enemyType);
                }

            }
            
            
        }
        else{
            if(Math.abs(this.body.x - player.body.x) <= 200 && Math.abs(this.body.y - player.body.y) <= 550 && !this.isDead){

                if(time > this.lastTime + 2000){

                    var w = this.body.width;
                    var h = this.body.height;
                    enemyFire(this.body.x + w/2, this.body.y + h + 10, this.enemyType);
                    this.lastTime = time;
                    console.log(this.enemyType);
                }

            }
        }
        

        if(time > this.lastTime + 1000){
            if(this.isDead){
                enemies.remove(child, true);
            }
        }
        if(this.body.y >= worldY){
            enemies.remove(child, true);
        }

    };

  })
    globalTime = time;


}
