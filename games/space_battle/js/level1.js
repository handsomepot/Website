var starfield;
var player;
var bullets;
var enemybullets;
var lastTime = 0;
var lastTime2 = 0;
var cursorKeys;

class Enemy extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, 'spaceship1');
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        //config.scene.physics.body.immovable = true;
        this.isFire = false;
        this.lastTime = 0;
        this.time = 0;
        
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
        
        
}

function fire2(x, y) {
       
    var bullet = enemybullets.get(x, y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = 200;
    }
        
        
}

function fireBullets(){
    enemies.children.iterate((child) => {
        var w = child.body.width;
        var h = child.body.height;
        fire2(child.body.x + w/2, child.body.y + h/2)
        
  })
   
}

function createEnemy(x, y){
    e = new Enemy({scene:level1, x: x, y:y});
   
    
    e.body.setVelocityY(50);
    e.body.immovable = true;
    enemy = enemies.create(e);
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
    console.log(enemies.children.entries.length);

}

function hitEnemy(bullet, enemy){
    enemies.remove(enemy, true);
    bullet.disableBody(false, true); // disableBody( [disableGameObject] [, hideGameObject])
    console.log('hit')
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
    
    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 100 });
    enemybullets = this.physics.add.group({ defaultKey: 'bullet1', maxSize: 100 });
    enemies = this.physics.add.group({ defaultKey: 'spaceship1', maxSize: 10, runChildUpdate: true });

    e = new Enemy({scene:level1, x: 100, y:100});
    enemies.add(e);
    e.body.immovable = true;

    e.body.velocity.y = 20;
    console.log(e.time);


    enemies.children.iterate((child) => {
    child.update = function (time, delta) {
        //console.log(child.body);
        if(this.body.y >= 150 && this.body.y <= 200){
            
        }
        if(this.body.y >= worldY){
            enemies.remove(child, true);
            console.log(enemies.children.entries.length);
        }
    };

  })

    
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
    this.physics.add.collider(bullets, enemies, hitEnemy, null, this);
    this.time.addEvent({ delay: 4000, callback: fireBullets, callbackScope: this, loop: true });
    
    
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
            lastTime = time + 100;
        }
    }
    
    bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
    }.bind(this));

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
