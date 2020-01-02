var loadState= {
	
	// The preload function is another standard Phaser function that we
	// use to define and load our assets
    preload: function() {
        
        // Add a loading label on the screen
        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                         {font: '30px Courier', fill: '#ffffff'});        
        
        // Load all assets. The first parameter is the variable that 
        // will point to the image, and the second parameter is the
        // image file itsself.
        //game.load.image('player', '/files/theme/player.png');
        //game.load.image('win', '/files/theme/win.png');
        game.load.image('menu-background', 'assets/img/menu.png');
		game.load.image('game_background', 'assets/img/game_back.png');
		game.load.image('game_background', 'assets/img/grass32.png');
        
        game.load.spritesheet('player', 'assets/img/dude.png', 32, 48);
        game.load.spritesheet('playerDie', 'assets/img/dude.png', 32, 48);
		game.load.spritesheet('snail', 'assets/img/snail.png', 54, 31);
        
        
        game.load.spritesheet('flyEnemy', 'assets/img/fly.png', 72,36);
		game.load.spritesheet('jumpEnemy', 'assets/img/slime.png', 50, 28);
		game.load.spritesheet('groundEnemy', 'assets/img/penguin.png', 48, 48);
		game.load.spritesheet('monster', 'assets/img/monster.png', 48,48);
		game.load.spritesheet('coin', 'assets/img/spinning_coin_gold.png', 32, 32);
		game.load.spritesheet('star', 'assets/img/star2.png', 24, 22);
		
        
        this.game.load.tilemap('map1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-1', 'assets/img/grass32.png');	
    },
    
    create: function() {
        // Call the menu state
        game.state.start('menu');
        
    }    
};