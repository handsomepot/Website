let cursors;
var titleText;
var start = 0;
var sfxMenu=null;
var offset = 0;
var startText;
var startText2;
menu.preload = function ()
{
    this.load.bitmapFont('desyrel', 'assets/font/font.png', 'assets/font/font.xml');
      //this.load.bitmapFont('carbonTypeFont', carbonTypeTexture, carbonTypeDescription);
    
}
menu.create = function ()
{

    this.cameras.main.backgroundColor.setTo(44, 62, 80);
    
      
    this.add.tileSprite(worldX/2, worldY/2, worldX, worldY, 'starfield');
    
    titleText = this.add.bitmapText(worldX/2, -30, 'desyrel', '', 110).setOrigin(0.5).setCenterAlign().setInteractive();

    titleText.setText([
        'GALIAN'
    ]);
    
    this.time.addEvent({ delay: 500, callback: function(){start = 1;},callbackScope: this, loop: false });    
    startText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Press S to Play',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '28px',
      fill: '#fff',
    },
    );
    startText.setOrigin(0.5);
    startText.setAlpha(0);

    startText2 = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2 + 50,
    '(arrow keys to move / Z to fire)',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '20px',
      fill: '#fff',
    },
    );
    startText2.setOrigin(0.5);
    startText2.setAlpha(0);

    

      
  this.input.keyboard.on('keydown', function (event) {
       console.log(event.keyCode);
       if(83 == event.keyCode){
           sfxMenu.stop();
           menu.scene.stop('menu');
           menu.scene.start('level1');
       }

    });
    if(sfxMenu==null)
        sfxMenu = this.sound.add('menuMusic');
    sfxMenu.play({
    volume: .2,
    loop: true
  })
   

},

menu.update = function ()
{
    if(start && titleText.y <=240){
        titleText.y += 2;
    }
    if(titleText.y == 240){
        startText.setAlpha(1);
        startText2.setAlpha(1);
    }
    
    
}
