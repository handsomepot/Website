
// Here we use the 'official name' (bootState) when defining the state
var bootState = {
    
    preload: function(){
               
    },
    // The create function is a standard Phaser function, and is
    // automatically called
    create: function () {
		
        // Starting the physics system - in this case we are using the
        // simple (but effective) ARCADE physics engine
         
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.scale.pageAlignHorizontally = true;  //Align the game window to the center of the screen
        //game.scale.pageAlignVertically = true;
        
        // Calling the load state
        game.state.start('load');
    }   
};