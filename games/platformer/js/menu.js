var menuState = {
  
    preload:function(){
        
    },
    create: function () {
		
		// Here we display the name of the game. When defining text, the
		// first two parameters are x and y positional values, then the
		// actual text, and then the 'font' defines the font (of course)
		// and 'fill' refers to the font color.
        
        
        var logo = game.add.sprite(0, 0, 'menu-background');
        var nameLabel = game.add.text(game.width/2, 80, 'Simple Platformer',
                                    { font: '50px Arial', fill: '#ffffff', align:'center' });
        nameLabel.anchor.setTo(0.5, 0.5);
        
        // We give the player instructions on how to start the game
        var startLabel = game.add.text(game.width/2, game.world.height-80,
                                       'press the "UP" key to start',
                                       {font: '25px Arial', fill: '#ffffff', align:'center' });
        startLabel.anchor.setTo(0.5, 0.5);
        // We define the wkey as Phaser.Keyboard.W so that we can act
        // when the player presses it
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // When the player presses the W key, we call the start function
        wkey.onDown.addOnce(this.start, this);
    },
    
    // The start function calls the play state    
    start: function () {
        game.state.start('play');    
    },    
};