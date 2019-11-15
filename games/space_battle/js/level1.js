var starfield;
var player;
var bullets;
var enemybullets;
var lastTime = 0;
var lastTime2 = 0;
var cursorKeys;
var sfxExplode;
var sfxExplode2;
var bgmusic;

var flip = true;
var isplay = false;
var globalTime;
var enemyType = [5,5,5,1,2,3,1,2,3,1,2,3,1,2,3];
var enemyIndex = 0;
var isBoss = false;
var firstTimeEvent;
/*    1   2          3         4        5       6
*   O O  O O         O        O O         O    boss
*    O    O        O   O      O O     O
*                 O     O     O O         O
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
        this.isDead = false; 
        this.number = 0;
        this.enemyType = 'regular';
    } 
}

function shoot() {
       
    var w = player.body.width;
    var bullet = bullets.get(player.body.x + w/2, player.body.y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = -550;
    }
    else{
        console.log('error: no bullets');
    }
        
        
}

function enemyFire(x, y) {
       
    var bullet = enemybullets.get(x, y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = 300;
        
        //bullet.body.velocity.x = (player.body.x - x)*2;
        
    }
        
}
function addEnemyGroup1(){
    e = new Enemy({scene:level1, x: 100, y:-100, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');

    e = new Enemy({scene:level1, x: 150, y:0, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');

    e = new Enemy({scene:level1, x: 200, y:-100, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');
}

function addEnemyGroup2(){
    
    e = new Enemy({scene:level1, x: 400, y:-100, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');

    e = new Enemy({scene:level1, x: 450, y:0, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');

    e = new Enemy({scene:level1, x: 500, y: -100, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');
}

function addEnemyGroup3(){
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');
    
    e = new Enemy({scene:level1, x: 180, y:-60, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');

    e = new Enemy({scene:level1, x: 300, y:-120, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');
    
    e = new Enemy({scene:level1, x: 420, y:-60, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');

    e = new Enemy({scene:level1, x: 520, y:0, defaultKey:'enemygroup2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    e.anims.play('enemygroup2');
    

}

function addEnemyGroup4(){
    e = new Enemy({scene:level1, x: 100, y:-200, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    
    e = new Enemy({scene:level1, x: 100, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;

    e = new Enemy({scene:level1, x: 100, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    
    e = new Enemy({scene:level1, x: 500, y:-200, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
    
    e = new Enemy({scene:level1, x: 500, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;

    e = new Enemy({scene:level1, x: 500, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 120;
}

function addEnemyGroup5(){  // S shape
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 0,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    
    e = new Enemy({scene:level1, x: 80, y:-80, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 400,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
     
    e = new Enemy({scene:level1, x: 80, y:-160, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
        e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 800,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    
    e = new Enemy({scene:level1, x: 80, y:-240, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 1200,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 

    e = new Enemy({scene:level1, x: 80, y:-320, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 1600,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    e = new Enemy({scene:level1, x: 80, y:-400, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    e = new Enemy({scene:level1, x: 80, y:-480, defaultKey:'enemygroup4'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 160;
    e.enemyType = 'attack';
    e.anims.play('enemygroup4');
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 2400,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 

}


function addEnemyGroup6(){
    e = new Enemy({scene:level1, x: 300, y:0, defaultKey:'boss'});
    e.enemyType = 'boss';
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 20;
    e.scaleX = 1.5;
    e.scaleY = 1.5;
  
}


function addEnemy(){
    if(isBoss){
        return;
    }
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
    }

    enemyIndex++;
}

function addFirstEnemy(){
    level1.time.addEvent({ delay: 4500, callback: addEnemy, callbackScope: level1, loop: true });
    firstTimeEvent.remove();
    addEnemyGroup1();
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
}

var lock = false;
function playExplosionSound(){
    sfxExplode2.play();
    lock = false;
}

function hitEnemy(bullet, enemy){

    console.log('type = '+ enemy.enemyType);
    if(enemy.number > 0){
        enemy.number--;
        e = new Enemy({scene:level1, x: bullet.x, y:bullet.y -40});
        e.body.immovable = true;
        e.anims.play('explode2');
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
    
    e = new Enemy({scene:level1, x: bullet.x, y:bullet.y + 20});
    //enemies.add(e);
    e.body.immovable = true;
    e.anims.play('explode3');
    
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
      frameRate: 6,
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
    
    
    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 500 });
    enemybullets = this.physics.add.group({ defaultKey: 'bullet3', maxSize: 10 });
    enemies = this.physics.add.group({ defaultKey: 'enemy1', maxSize: 30, runChildUpdate: true });
 
    cursors = level1.input.keyboard.createCursorKeys();
    cursorKeys = level1.input.keyboard.createCursorKeys();

    this.physics.world.enable(enemies);
    this.physics.world.enable(bullets);
    this.physics.world.enable(enemybullets);
    this.physics.add.overlap(enemybullets, player, hitPlayer, null, this);
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.collider(player,enemies, enemyHitPlayer, null, this);
    firstTimeEvent = this.time.addEvent({ delay: 1500, callback: addFirstEnemy, callbackScope: this, loop: false });
    


    bgmusic = this.sound.add('music');
    sfxExplode = this.sound.add('explode');
    sfxExplode1 = this.sound.add('explode1');
    sfxExplode2 = this.sound.add('explode2');
    
    bgmusic.play({
    volume: .4,
    loop: true
  })
},



level1.update = function (time, delta)
{
    
    starfield.tilePositionY -= 1; // background scrolling
    
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
            if(time > this.lastTime){
                if(this.y <= 200){
                    this.y += 3;
                }
                
                this.lastTime = time + 20;
            }
            
        }

        if(Math.abs(this.body.x - player.body.x) <= 150 && Math.abs(this.body.y - player.body.y) <= 500 && !this.isDead){
            if(time > this.lastTime){
                var w = this.body.width;
                var h = this.body.height;
                enemyFire(this.body.x + w/2, this.body.y + h + 10);
                this.lastTime = time + 2000;
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
