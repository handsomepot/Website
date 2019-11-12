var starfield;
var player;
var bullets;
var enemybullets;
var lastTime = 0;
var lastTime2 = 0;
var cursorKeys;
// path /Users/riley/Documents/Website/games/space_battle/assets/bullet2.png
class Enemy extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, 'spaceship1');
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        //config.scene.physics.body.immovable = true;
        this.lastTime = 0;
        this.time = 0;
        this.isDead = false;
        this.play = false;
        
    } 
}

function shoot() {
       
    var w = player.body.width;
    var bullet = bullets.get(player.body.x + w/2, player.body.y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = -400;
    }
    else{
        //bullets.children.each(function(b) {
            //bullets.remove(b);
        //})
    }
        
        
}

function fire2(x, y) {
       
    var bullet = enemybullets.get(x, y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = 300;
        if(Math.random() >= 0.8){
            bullet.body.velocity.x = player.body.x - x;
        }
    }
        
        
}


function createEnemy(x, y){
    var e = new Enemy({scene:level1, x: x, y:y});
   
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 100;
    //level1.physics.add.existing(e);

    /*level1.tweens.add({
           targets: enemy,
           duration: 3000,
           x: 300,
           delay: 200,
           ease: 'Sine.easeInOut',
           repeat: -1,
           yoyo: true,
       }); */

}
var isplay = false;
function addEnemy(){
    var n = Math.floor((Math.random() * 3) + 1);
    e = new Enemy({scene:level1, x: n*50, y:20});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 150;
    
    if(Math.random()>=0.5){
        e = new Enemy({scene:level1, x: worldX - n*50, y:-20});
        enemies.add(e);
        e.body.immovable = true;
        e.body.velocity.y = 150;
    }


}

function enemyHitPlayer(player, enemy){
    
    //enemy.animate.play('');
    //enemies.remove(enemy, true);
    isplay = true;
    
    console.log('enemyHitPlayer');
    console.log(enemies.children.entries.length);
    //level1.setTexture("sprExplosion");  // this refers to the same animation key we used when we added this.anims.create previously

}

function hitEnemy(bullet, enemy){
    if(!enemy.isDead && enemy.body.y >= 10){
        enemy.isDead = true;
        enemy.anims.play("sprExplosion"); // play the animation
        enemy.play = false;
        
    //enemy.disableBody(true, false); 
        bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
        console.log('hit');
        console.log(enemies.children.entries.length);  
    }
}

function hitPlayer(player, bullet){
    
    bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
    console.log('player hit');
    console.log(enemies.children.entries.length);
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
    enemybullets = this.physics.add.group({ defaultKey: 'bullet3', maxSize: 500 });
    enemies = this.physics.add.group({ defaultKey: 'spaceship1', maxSize: 30, runChildUpdate: true });


    e = new Enemy({scene:level1, x: 100, y:100});
    enemies.add(e);
    e.body.immovable = true;
    e.body.velocity.y = 155;
    console.log(e.time);




    
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
    this.time.addEvent({ delay: 2000, callback: addEnemy, callbackScope: this, loop: true });
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 32,
      repeat: 0
    });
    
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
            lastTime = time + 300;
        }
    }
    
    bullets.children.each(function(b) {
           if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
    }.bind(this));

    enemybullets.children.each(function(b) {
           if (b.active) {
                if (b.y > worldY) {
                    b.setActive(false);
                }
            }
    }.bind(this));
    console.log(enemybullets.children.entries.length);
    enemies.children.iterate((child) => {
    child.update = function (time, delta) {
        //console.log(child.body);

        if(this.isDead && this.play){
            enemies.remove(child, true);
        }
        if(Math.abs((this.body.x - player.body.x)) <= 100 || Math.abs((this.body.y - player.body.y)) <= 400&& !this.isDead){
            if(time > this.lastTime){
                var w = this.body.width;
                var h = this.body.height;
                if(Math.random() <= 0.8)
                    fire2(this.body.x + w/2, this.body.y + h);
                this.lastTime = time + 1500;
            }
            
        }
        if(this.body.y >= worldY){
            enemies.remove(child, true);
            console.log(enemies.children.entries.length);
        }
    };

  })
    

}
/*
enterButtonHoverState = function() {
    //startButton.setStyle({ fill: '#ff0'});
    //startButton.setStyle({ fontSize: '28px'});
},

enterButtonResetState = function() {
    //startButton.setStyle({ fill: '#fff'});
    //startButton.setStyle({ fontSize: '25px'});
},
    
enterButtonActiveState = function() {
     level1.scene.start('level1');
}*/
