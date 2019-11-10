let cursors;
var startButton
menu.preload = function ()
{

      
},

menu.create = function ()
{
    console.log('menu');
    this.cameras.main.backgroundColor.setTo(44, 62, 80);
    
    
   
  
    var titleText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 4,
    'PONG',
    {
      fontFamily:  'monospace',
      fontSize: '100px',
      fill: '#ff0',
      backgroundColor: '#2c3e50'
    },
  );
    titleText.setOrigin(0.5);
    
    var startText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Press SPACE to Start',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#2c3e50'
    },
  );
    startText.setOrigin(0.5);
    
     var startText2 = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2 + 50,
    '(use arrow keys to move)',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#2c3e50'
    },
  );
    startText2.setOrigin(0.5);
    

      
  this.input.keyboard.on('keydown', function (event) {

       if(32 == event.keyCode){
           menu.scene.start('level1');
       }

    });
},

menu.update = function ()
{
    
    
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
