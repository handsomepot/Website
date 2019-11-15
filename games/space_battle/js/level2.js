level2.preload = function ()
{

      console.log('this is level2');
},

level2.create = function ()
{
    starfield = this.add.tileSprite(worldX/2, worldY/2, worldX, worldY, 'starfield');
    player = this.physics.add.sprite(player.x, player.y, 'starship');
    player.setCollideWorldBounds(true);
    player.setImmovable(true);
    
    cursors = this.input.keyboard.createCursorKeys();
    cursorKeys = this.input.keyboard.createCursorKeys();
},

level2.update = function (time,delta)
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
        //if(time >= lastTime){
            //shoot();
            //sfxExplode.play({volume: .2, loop: false})
        //    lastTime = time + 250;
        //}
    }
    
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
     menu.scene.start('level1');
}*/
