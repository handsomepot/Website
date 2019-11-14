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
var enemyType = [5,1,2,3];
var enemyIndex = 0;
var isBoss = false;

/*      1            2         3        4       5
*   O O  O O         O        O O         O    ufo
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
        bullet.body.velocity.y = 400;
        
        bullet.body.velocity.x = (player.body.x - x)*2;
        
    }
        
}
function addEnemyGroup1(){
    e = new Enemy({scene:level1, x: 100, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 150, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 200, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    e = new Enemy({scene:level1, x: 400, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 450, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 500, y: -100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
}

function addEnemyGroup2(){
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    e = new Enemy({scene:level1, x: 180, y:-60, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 300, y:-120, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    e = new Enemy({scene:level1, x: 420, y:-60, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 520, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    

}

function addEnemyGroup3(){
    e = new Enemy({scene:level1, x: 100, y:-200, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    e = new Enemy({scene:level1, x: 100, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 100, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    e = new Enemy({scene:level1, x: 500, y:-200, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    e = new Enemy({scene:level1, x: 500, y:-100, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;

    e = new Enemy({scene:level1, x: 500, y:0, defaultKey:'enemy1'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
}
function addEnemyGroup4(){ // S shape
    e = new Enemy({scene:level1, x: 80, y:0, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 0,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    
    e = new Enemy({scene:level1, x: 80, y:-80, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 400,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
     
    e = new Enemy({scene:level1, x: 80, y:-160, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 800,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
    
    
    e = new Enemy({scene:level1, x: 80, y:-240, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 1200,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 

    e = new Enemy({scene:level1, x: 80, y:-320, defaultKey:'enemy2'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 200;
    
    level1.tweens.add({
        targets: e,
        duration: 1500,
        x: 500,
        delay: 1600,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 

    
}


function addEnemyGroup5(){
    e = new Enemy({scene:level1, x: 300, y:100, defaultKey:'ufo'});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 0;
    e.number = 500;
    isBoss = true;
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
    }
    enemyIndex++;
}

function enemyHitPlayer(player, enemy){
    
    //enemy.animate.play('');
    //enemies.remove(enemy, true);
    
    
    
   //console.log('enemyHitPlayer');
    //level1.setTexture("sprExplosion");  // this refers to the same animation key we used when we added this.anims.create previously

}

function hitEnemy(bullet, enemy){
    console.log(enemy.number--);
    if(enemy.number >=0){
        isBoss = true;
        bullet.anims.play("sprExplosion");
        sfxExplode.stop();
         //sfxExplode2.play();
        return;
    }
    else
        isBoss = false;
    
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;
        enemy.anims.play("sprExplosion"); // play the animation
        enemy.lastTime = globalTime;
        sfxExplode2.play();
        
    //enemy.disableBody(true, false); 
        bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
        //console.log('hit'); 
    }
}
function stopAnimation(){
    console.log('stop');
    player.anims.pause(player.anims.currentAnim.frames[0]);
    isplay = false;
}
function hitPlayer(player, bullet){
    //enemy.anims.play("sprExplosion"); // play the animation
    player.anims.play('playerAnimation');
    if(!isplay){
        level1.time.addEvent({ delay: 800, callback: stopAnimation, callbackScope: level1, loop: false });
        isplay = true;
    }
    
    bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
    //console.log('player hit');
}

level1.preload = function ()
{

      
},

level1.create = function ()
{
    starfield = level1.add.tileSprite(worldX/2, worldY/2, worldX, worldY, 'starfield');
    player = this.physics.add.sprite(400, 700, 'starship');
    player.setCollideWorldBounds(true);
    player.setImmovable(true);
    
    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 500 });
    enemybullets = this.physics.add.group({ defaultKey: 'bullet3', maxSize: 10 });
    enemies = this.physics.add.group({ defaultKey: 'enemy1', maxSize: 30, runChildUpdate: true });


    /*e = new Enemy({scene:level1, x: 100, y:100});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 155;
    console.log(e.time);*/
    //addEnemy();




    
   //ship1 = this.physics.add.sprite(400, 100, 'spaceship2');
   //bullet1 = this.physics.add.sprite(400, 300, 'bullet1');
   //bullet2 = this.physics.add.sprite(400, 400, 'bullet2');
   //ship1.scaleX = 0.35
   //ship1.scaleY = 0.35
    
    cursors = level1.input.keyboard.createCursorKeys();
    cursorKeys = level1.input.keyboard.createCursorKeys();

    //createEnemies();

    this.physics.world.enable(enemies);
    this.physics.world.enable(bullets);
    this.physics.world.enable(enemybullets);
    this.physics.add.overlap(enemybullets, player, hitPlayer, null, this);
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.overlap(player, enemies, enemyHitPlayer, null, this);
    this.time.addEvent({ delay: 3500, callback: addEnemy, callbackScope: this, loop: true   });
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "playerAnimation",
      frames: this.anims.generateFrameNumbers("playerAnimation"),
      frameRate: 60,
      repeat: 0
    });
    bgmusic = this.sound.add('music');
    sfxExplode = this.sound.add('explode');
    sfxExplode2 = this.sound.add('explode2');
    
    bgmusic.play({
    volume: .4,
    loop: true
  })
},



level1.update = function (time, delta)
{
    
    starfield.tilePositionY -= 1;
    
    player.setVelocity(0);

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
            sfxExplode.play({
            volume: .2,
            loop: false
          })
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
    
    //console.log('#bullets ' + bullets.children.entries.length);
    enemies.children.iterate((child) => {
    child.update = function (time, delta) {
        //console.log(child.body);
        if(time > this.lastTime + 1000){
            if(this.isDead){
                enemies.remove(child, true);
            }
           //console.log(enemies.children.entries.length);
        }
        if(Math.abs(this.body.x - player.body.x) <= 100 && Math.abs(this.body.y - player.body.y) <= 400 && !this.isDead){
            if(time > this.lastTime){
                var w = this.body.width;
                var h = this.body.height;
                //if(Math.random() <= 0.5)
                    enemyFire(this.body.x + w/2, this.body.y + h + 10);
                this.lastTime = time + 2000;
            }
            
        }
        if(this.body.y >= worldY){
            enemies.remove(child, true);
            
        }
    };

  })
    globalTime = time;


}
