var starfield;
var player;
var bullets;

class Enemy extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, 'spaceship1');
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.bullets = level1.physics.add.group({ defaultKey: 'bullet1', maxSize: 10 });
    }

    fire() {
        var bullet = this.bullets.get(this.x, this.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 250;
        }
    }

}

var enemies = [];



function createEnemies(){
   enemy = new Enemy({scene:level1, x:100, y:100});
   enemy.fire();
   enemy.body.velocity.y = 20;
   level1.tweens.add({
        targets: enemy,
        duration: 3000,
        x: 300,
        delay: 10,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    }); 
}

function shoot(event) {
        if(32==event.keyCode){
            var w = player.body.width;
            var bullet = bullets.get(player.body.x + w/2, player.body.y);
            if (bullet) {
                bullet.setActive(true);
                bullet.setVisible(true);
                bullet.body.velocity.y = -250;
            }
        }
        
}

function init(){
   
}

level1.preload = function ()
{

      
},

level1.create = function ()
{
    starfield = level1.add.tileSprite(400, 300, 800, 600, 'starfield');
    player = this.physics.add.sprite(400, 500, 'starship');
    player.setCollideWorldBounds(true);
    
    bullets = this.physics.add.group({ defaultKey: 'bullet2', maxSize: 10 });
   //ship1 = this.physics.add.sprite(400, 100, 'spaceship2');
   //bullet1 = this.physics.add.sprite(400, 300, 'bullet1');
   //bullet2 = this.physics.add.sprite(400, 400, 'bullet2');
   //ship1.scaleX = 0.35
   //ship1.scaleY = 0.35
    
    cursors = level1.input.keyboard.createCursorKeys();
    
    this.input.keyboard.on('keydown', shoot, this);
        
    init();
    createEnemies();
    
    
},


    
level1.update = function ()
{
    
    starfield.tilePositionY -= 1;
    
    player.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(300);
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
