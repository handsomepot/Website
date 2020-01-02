var map;
var layer;
var player;
var facing = 'right';
var jumpTimer = 0;
var dieTimer = 0;
var cursors;
var jumpButton;
var bg;
var coins;
var groundEnemies;
var jumpEnemies;
var flyEnemies;
var die = false;
var dieFall = false;

var debug = false;
var score = 0;
var scoreText;


// extends Phaser.Sprite
// extends Phaser.Sprite
(function(s) {

    s.prototype.setMaxSpeedX = function(maxSpeedX) {
        this.maxSpeedX = maxSpeedX > 0 ? maxSpeedX : -maxSpeedX;
    };

    s.prototype.setMaxSpeedY = function(maxSpeedY) {
        this.maxSpeedY = maxSpeedY > 0 ? maxSpeedY : -maxSpeedY;
    };

    s.prototype.getMaxSpeedX = function() { return this.maxSpeedX; };

    s.prototype.getMaxSpeedY = function() { return this.maxSpeedY; };

    s.prototype.detectDistance = 500; // default value

    s.prototype.setDetectDistance = function(distance) { this.detectDistance = distance; };

    s.prototype.getDetectDistance = function() { return this.detectDistance; };

    s.prototype.detect = function(obj) { return Math.abs(this.body.x - obj.body.x) <= this.detectDistance; };

    s.prototype.getDirectionTo = function(obj) {
        if (!obj instanceof s)
            return null;
        if (this.body.x < obj.body.x)
            return 'right';
        else if (this.body.x > obj.body.x)
            return 'left';
        else
            return 'overlap';
    };

    s.prototype.go = function(direction) {
        // direction: 'left' | 'right' | 'up' | 'down'
        if (!this.facing) {
            this._go(direction);
            return;
        }

        if (this.facing === 'left') {
            if (direction === 'left') {
                this._go('left');
            }
            else if (direction === 'right') {
                this.animations.play('right');
                this._go('right');
            }
            else {
                console.warn('Implement this for the case of left-right-up-down sprites');
            }
        }
        else if (this.facing === 'right') {
            if (direction === 'right') {
                this._go('right');
            }
            else if (direction === 'left') {
                this.animations.play('left');
                this._go('left');
            }
            else {
                console.warn('Implement this for the case of left-right-up-down sprites');
            }
        }
        else if (this.facing === 'up') {
            if (direction === 'up')
                this._go('up');
            else if (direction === 'down')
                this._go('down');
            else {
                console.warn('Implement this for the case of left-right-up-down sprites');
            }
        }
        else if (this.facing === 'down') {
            if (direction === 'up')
                this._go('up');
            else if (direction === 'down')
                this._go('down');
            else {
                console.warn('Implement this for the case of left-right-up-down sprites');
            }
        }
        else {
            console.error('Error: unknown direction: ' + JSON.stringify(direction));
        }
    };

    s.prototype.goReverse = function() {
        if (this.facing === 'left')
            this.go('right');
        else if (this.facing === 'right')
            this.go('left');
        else if (this.facing === 'up')
            this.go('down');
        else if (this.facing === 'down')
            this.go('up');
        else {
            console.error('Error: unknown direction: ' + JSON.stringify(direction));
        }
    };

    s.prototype._go = function(direction) {
        this.facing = direction;
        if (direction === 'left') {
            this.body.velocity.x = -this.getMaxSpeedX();
        }
        else if (direction === 'right') {
            this.body.velocity.x = this.getMaxSpeedX();
        }
        else if (direction === 'up') {
            this.body.velocity.y = -this.getMaxSpeedY();
        }
        else if (direction == 'down') {
            this.body.velocity.y = this.getMaxSpeedY();
        }
        else {
            console.error('Error: unknown direction: ' + JSON.stringify(direction));
        }
    };

    s.prototype.moveTo = function(x, y) {
        // TODO
    };

    s.prototype._getStepPoint = function(x, y) {

    };

    s.prototype._moveInOneStepTo = function(x, y) {

    };

    s.prototype._isWithinOneStep = function(x, y) {

    };

    /**
	 * Returns the first "collision" tile below the sprite, returns null is there is none.
	 */
    s.prototype.getTileBelow = function() {
        var tileY = this._getTileY() + 1;
        var tileX = this._getTileX();
        var l = map.getLayer();
        var tile = map.getTile(tileX, tileY, l);
        while (tile === null && map.hasTile(tileX, tileY, l))
            tile = map.getTile(tileX, ++tileY, l);

        return tile;
    };

    /**
	 * Returns the first "collision" tile above the sprite, returns null is there is none.
	 */
    s.prototype.getTileAbove = function() {
        var tileY = this._getTileY();
        var tileX = this._getTileX();
        var l = map.getLayer();
        var tile = map.getTile(tileX, tileY, l);
        while (tile === null && map.hasTile(tileX, tileY, l))
            tile = map.getTile(tileX, --tileY, l);

        return tile;
    };

    /**
	 * Returns the first "collision" tile in the RHS of the sprite, returns null is there is none.
	 */
    s.prototype.getTileRight = function() {
        var tileY = this._getTileY();
        var tileX = this._getTileX();
        var l = map.getLayer();
        var tile = map.getTile(tileX, tileY, l);
        while (tile === null && map.hasTile(tileX, tileY, l))
            tile = map.getTile(++tileX, tileY, l);

        return tile;
    };

    /**
	 * Returns the first "collision" tile in the LHS of the sprite, returns null is there is none.
	 */
    s.prototype.getTileLeft = function() {
        var tileY = this._getTileY();
        var tileX = this._getTileX();
        var l = map.getLayer();
        var tile = map.getTile(tileX, tileY, l);
        while (tile === null && map.hasTile(tileX, tileY, l))
            tile = map.getTile(--tileX, tileY, l);

        return tile;
    };

    s.prototype._getTileX = function() {
        return Math.ceil((this.body.x - 0.5 * map.tileWidth) / map.tileWidth);
    };

    s.prototype._getTileY = function() {
        return Math.ceil((this.body.y + 0.5 * map.tileHeight) / map.tileHeight);
    };

})(Phaser.Sprite);

(function(t) {
    /**
	 * Returns the top-most tile above "this" tile.
	 */
    t.prototype.getTopTile = function() {
        var x = this.x;
        var y = this.y;
        var l = map.getLayer();

        var lastTile = this;
        var tile = this;
        while (tile !== null) {
            lastTile = tile;
            --y;

            // the top tile is on the "ceiling"
            if (y < 0 || !map.hasTile(x, y, l))
                break;

            tile = map.getTile(x, y, l);
        }

        return lastTile;
    };

    /**
	 * Returns the bottom-most tile below "this" tile.
	 */
    t.prototype.getBottomTile = function() {
        var x = this.x;
        var y = this.y;
        var l = map.getLayer();

        var lastTile = this;
        var tile = this;
        while (tile !== null) {
            lastTile = tile;
            ++y;

            // the bottom tile is on the "floor"
            if (y >= map.height || !map.hasTile(x, y, l))
                break;

            tile = map.getTile(x, y, l);
        }

        return lastTile;
    };

    /**
	 * Returns the right-most tile from "this" tile.
	 */
    t.prototype.getRightMostTile = function() {
        var x = this.x;
        var y = this.y;
        var l = map.getLayer();

        var lastTile = this;
        var tile = this;
        while (tile !== null) {
            lastTile = tile;
            ++x;

            // the right-most tile is on the right border
            if (x >= map.width || !map.hasTile(x, y, l))
                break;

            tile = map.getTile(x, y, l);
        }

        return lastTile;
    };

    /**
	 * Returns the left-most tile from "this" tile.
	 */
    t.prototype.getLeftMostTile = function() {
        var x = this.x;
        var y = this.y;
        var l = map.getLayer();

        var lastTile = this;
        var tile = this;
        while (tile !== null) {
            lastTile = tile;
            --x;

            // the left-most tile is on the left border
            if (x < 0 || !map.hasTile(x, y, l))
                break;

            tile = map.getTile(x, y, l);
        }

        return lastTile;
    };
})(Phaser.Tile);
var playState = { 
    preload: function() {				

    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#6C89FE';

        bg = game.add.tileSprite(0, 0, 800, 600, 'game_background');
        bg.fixedToCamera = true;

        map = game.add.tilemap('map1');
        map.addTilesetImage('grass32','tiles-1');
        map.setCollisionByExclusion([]);

        layer = map.createLayer('Tile Layer 1');

        if (debug)
            layer.debug = true;  //  Un-comment this on to see the collision tiles

        layer.resizeWorld();

        game.physics.arcade.gravity.y = 1200;
        player = game.add.sprite(32, 32, 'player');

        coins = game.add.group();
        coins.enableBody = true;

        winStars = game.add.group();
        winStars.enableBody = true;

        scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '20px',
            fill: '#fff'
        });
        scoreText.fixedToCamera = true;

        //  The baddies!
        groundEnemies = game.add.group();
        groundEnemies.enableBody = true;
        groundEnemies.physicsBodyType = Phaser.Physics.ARCADE;

        jumpEnemies = game.add.group();
        jumpEnemies.enableBody = true;
        jumpEnemies.physicsBodyType = Phaser.Physics.ARCADE;

        flyEnemies = game.add.group();
        flyEnemies.enableBody = true;
        flyEnemies.physicsBodyType = Phaser.Physics.ARCADE;

        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(jumpEnemies, Phaser.Physics.ARCADE);
        game.physics.enable(flyEnemies, Phaser.Physics.ARCADE);
        game.physics.enable(groundEnemies, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.2;
        player.animations.add('left', [0, 1, 2, 3,], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('die', [4], 10, true);


        game.camera.follow(player);// make the camera follow player

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // see: https://github.com/photonstorm/phaser/wiki/Graphics
        // var shape = game.add.graphics(0, 0);  //init rect
        // shape.beginFill(0xFFFF0B, .4) // color (0xFFFF0B), alpha (0 -> 1) // required settings
        // shape.drawRect(300, 380, 10, 10); // (x, y, w, h) 
        // shape.endFill();

        // start level
        this.restart();

    },

    update: function() {
        x = Math.ceil(player.body.x/32);
        y = Math.ceil(player.body.y/32) + 1;

        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(groundEnemies, layer);
        game.physics.arcade.collide(jumpEnemies, layer);
        game.physics.arcade.collide(flyEnemies, layer);
        game.physics.arcade.collide(coins, layer);
        game.physics.arcade.overlap(player, coins, this.collectCoin, null, this);
        game.physics.arcade.overlap(player, winStars, this.win, null, this);

        if(!die){
            game.physics.arcade.collide(player,groundEnemies, this.collisionHandler, null, this);
            game.physics.arcade.collide(player,jumpEnemies, this.collisionHandler, null, this);
            game.physics.arcade.collide(player,flyEnemies, this.collisionHandler, null, this);
        }


        if(die){
            
            this.stopAllActions();
            
            if(game.time.now > dieTimer + 100){
             
                player.animations.play('die',40,false,false);
                player.body.velocity.y = -400;
                //jumpTimer = game.time.now + 750;
            }
            
            console.log(player.body.x + " " + player.body.y);

            if(game.time.now > dieTimer + 1000){
                if(player){

                    player.kill();
                    player.reset(32,32);
                    player.revive();

                    //enemy.animation.start();
                    this.restart();
                    die = false;
                }
            }
        }
        
       
       // console.log("xy" + player.body.x + " " + player.body.y);
        if(dieFall){
            this.stopAllActions();
            if(game.time.now > dieTimer + 200){
                
                player.body.y = 500;
                 player.body.velocity.y = -400;
                player.animations.play('die',40,false,false);
               
            }
            
           
            if(game.time.now > dieTimer + 1500){
                if(player){

                    player.kill();
                    player.reset(32,32);
                    player.revive();

                    //enemy.animation.start();
                    this.restart();
                    dieFall = false;
                }
            }
            
        }
        
        if(player.body.y >600 && !dieFall){
            dieFall = true;
            dieTimer = game.time.now;
        }


        player.body.velocity.x = 0;
        if (cursors.left.isDown && !die){
            player.body.velocity.x = -180;

            if (facing != 'left'){
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown && !die){
            player.body.velocity.x = 180;

            if (facing != 'right'){
                player.animations.play('right');
                facing = 'right';
            }
        }
        else{
            if (facing != 'idle'){
                player.animations.stop();

                if (facing == 'left'){
                    player.frame = 0;
                }
                else{
                    player.frame = 5;
                }
                facing = 'idle';
            }
        }

        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer && !die){

            player.body.velocity.y = -600;
            jumpTimer = game.time.now + 750;
        }

        // draw debug info
        if (debug)
            game.debug.spriteCoords(player, 0, 10, 'rgb(100, 100, 100)');

        // game.debug.spriteInfo(player, 0, 100, 'rgb(100, 100, 100)');

        // this.jumpEnemyFn();
        this.jumpEnemyAI();
        // this.groundEnemyFn();
        this.groundEnemyAI();
        this.flyEnemyAI();

    },

    win: function(player, star) {
        star.kill();
        console.log(game.camera.x);
        var victory = game.add.text(game.width/2, 200, 'Victory!\nPress Ctrl+r to restart', { fill : '#ff7907', align: "center" } );
       
        victory.anchor.setTo(0.5, 0.5);
        victory.fixedToCamera = true;
        this.stopAllActions();
        
    },

    stopAllActions: function(){ // stop all actions when the player dies
        groundEnemies.forEachAlive(function(enemy){
            enemy.body.moves = false;
            enemy.animations.stop();
        });

        flyEnemies.forEachAlive(function(enemy){
            enemy.body.moves = false;
            enemy.animations.stop();
        });

        jumpEnemies.forEachAlive(function(enemy){
            enemy.body.moves = false;
            enemy.animations.stop();
        });
    },

    collectCoin: function(player, coin) {
        coin.kill();
        this.addScore(10);
    },

    addScore: function(increment) {
        score += 10;
        scoreText.text = 'Score: ' + score;
    },

    createCoins: function(){
        var coinPositions = [
            [6, 14], [7, 14], [8, 14],
            [15, 12], [16, 12],
            [21, 12], [22, 12], [23, 12],
            [26, 7], [26, 6], [26, 5],
            [34, 16], [34, 15], [34, 14],
            [49, 12], [50, 12],
            [72, 10], [73, 10],
            [81, 7], [82, 7],
            [87, 3], [88, 4],
            [129, 13], [130, 13], [131, 13],
            [132, 7],
            [155, 4], [155, 5], [155, 6], [155, 8]
        ];

        for (var i = 0; i < coinPositions.length; ++i)
            this.createCoinAtPos(coinPositions[i][0], coinPositions[i][1]);

    },

    createCoinAtPos: function(x, y) {
        var coin = coins.create(x << 5, y << 5, 'coin');
        coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        coin.animations.play('spin');
        coin.body.allowGravity = false;
    },

    createWinStar: function() {
        var winStar = winStars.create(194 << 5, 11 << 5, 'star');
        winStar.body.allowGravity = false;
    },

    createEnemies: function(){
        var levelAssets = [
            ["GroundEnemy", {x: 15, y: 16, asset: "groundEnemy", facing: "left"}],
            ["GroundEnemy", {x: 30, y: 16, asset: "groundEnemy", facing: "left"}],
            ["GroundEnemy", {x: 49, y: 16, asset: "groundEnemy", facing: "left"}],
            ["GroundEnemy", {x: 108, y: 16, asset: "groundEnemy", facing: "left"}],
            ["GroundEnemy", {x: 137, y: 16, asset: "groundEnemy", facing: "left"}],
            ["GroundEnemy", {x: 145, y: 16, asset: "groundEnemy", facing: "left"}],

            ["JumpEnemy", {x: 20, y: 16, asset: "jumpEnemy", facing: "left"}],
            ["JumpEnemy", {x: 60, y: 16, asset: "jumpEnemy", facing: "left"}],
            ["JumpEnemy", {x: 79, y: 16, asset: "jumpEnemy", facing: "left"}],
            ["JumpEnemy", {x: 95, y: 16, asset: "jumpEnemy", facing: "left"}],
            ["JumpEnemy", {x: 105, y: 16, asset: "jumpEnemy", facing: "left"}],
            ["JumpEnemy", {x: 115, y: 16, asset: "jumpEnemy", facing: "left"}],

            ["flyEnemy", {x: 34, y: 10, asset: "flyEnemy", facing: "up"}],
            ["flyEnemy", {x: 60, y: 10, asset: "flyEnemy", facing: "up"}],
            ["flyEnemy", {x: 86, y: 10, asset: "flyEnemy", facing: "up"}]
        ];

        for(var i = 0; i < levelAssets.length; i++){
            if(levelAssets[i][0] == 'GroundEnemy'){
                var x = levelAssets[i][1]["x"];
                var y = levelAssets[i][1]["y"];
                var asset = levelAssets[i][1]["asset"];
                var facing = levelAssets[i][1]["facing"];
                var groundEnemy = groundEnemies.create(x * 32, 400,  asset);

                groundEnemy.animations.add('left', [0, 1, 2, 3], 10, true);
                groundEnemy.animations.add('right', [4,5,6,7], 10, true);
                groundEnemy.animations.add('die', [8,9,10,11,12,13,14,15], 2, true);
                groundEnemy.setMaxSpeedX(100);
                groundEnemy.facing = facing;
                groundEnemy.start = false;
                groundEnemy.die = false;
                groundEnemy.go('left');
            }
            else if(levelAssets[i][0] == 'JumpEnemy'){

                var x = levelAssets[i][1]["x"];
                var y = levelAssets[i][1]["y"];
                var asset = levelAssets[i][1]["asset"];
                var facing = levelAssets[i][1]["facing"];
                var jumpEnemy = jumpEnemies.create(x * 32, (y * 32),  asset);

                jumpEnemy.animations.add('left', [0, 1], 10, true);
                jumpEnemy.animations.add('right', [2,3], 10, true);
                jumpEnemy.animations.add('die', [4,5,6,7,8,9,10,11], 10, true);
                jumpEnemy.animations.play('left');
                jumpEnemy.setMaxSpeedX(100);
                jumpEnemy.facing = facing;
                jumpEnemy.start = false;
                jumpEnemy.die = false;
            }
            else{
                var x = levelAssets[i][1]["x"];
                var y = levelAssets[i][1]["y"];
                var asset = levelAssets[i][1]["asset"];
                var facing = levelAssets[i][1]["facing"];
                var flyEnemy = flyEnemies.create(x * 32, (y * 32),  asset);

                flyEnemy.animations.add('fly', [0, 1], 10, true);
                flyEnemy.animations.play('fly');
                flyEnemy.setMaxSpeedY(250);
                flyEnemy.facing = facing;
                flyEnemy.start  = false;
                flyEnemy.die  = false;
            }
        }
    },

    collisionHandler: function (player, enemy) {
        if (enemy.body.touching.up) {
            if (enemy.die) {
                console.log('again');
                return;
            }
            console.log('die');
            enemy.die = true;
            enemy.play('die',40,false,true);
            enemy.events.onAnimationComplete.add(function() {
                enemy.kill();
                this.addScore(10);
            }, this);
        }
        else {
            die = true;
            dieTimer = game.time.now;


        }
    },

    restart: function(){

        groundEnemies.removeAll();
        jumpEnemies.removeAll();
        flyEnemies.removeAll();
        coins.removeAll();

        flyEnemies.enableBody = true;
        jumpEnemies.enableBody = true;
        groundEnemies.enableBody = true;

        this.createEnemies();
        this.createCoins();
        this.createWinStar();
        score = 0;
        facing = 'right';
        /*
		// debug drawing:

		// remove previous debug object
		if (debug)
			game.world.remove(this.breadcrumb);

		// add new debug object
		if (debug)
			this.breadcrumb = game.add.graphics(0, 0); */
    },

    groundEnemyFn:function(){
        groundEnemies.forEachAlive(function(groundEnemy){
            if(Math.abs(groundEnemy.body.x - player.body.x) <= 500 && !groundEnemy.start){
                groundEnemy.start = true;
                if(groundEnemy.facing == 'left'){
                    groundEnemy.body.velocity.x = -100;
                    groundEnemy.animations.play('left');
                }
                else{
                    groundEnemy.body.velocity.x = 100;
                    groundEnemy.animations.play('right');
                }
            }
            if(groundEnemy.start){
                if(groundEnemy.body.onWall()){
                    if(groundEnemy.facing == 'left'){
                        groundEnemy.animations.play('right');
                        groundEnemy.facing = 'right';
                        groundEnemy.body.velocity.x = 70;
                    }
                    else{
                        groundEnemy.animations.play('left');
                        groundEnemy.facing = 'left';
                        groundEnemy.body.velocity.x = -70;
                    }
                }
            }

        });
    },

    groundEnemyAI:function(){
        var self = this;
        groundEnemies.forEachAlive(function(groundEnemy){
            if (groundEnemy.die)
                return;

            if(Math.abs(groundEnemy.body.x - player.body.x) <= 500 && !groundEnemy.start){
                groundEnemy.start = true;
                if(groundEnemy.facing == 'left'){
                    groundEnemy.body.velocity.x = -100;
                    groundEnemy.animations.play('left');
                }
                else{
                    groundEnemy.body.velocity.x = 100;
                    groundEnemy.animations.play('right');
                }
            }
            if(groundEnemy.start){
                if(groundEnemy.body.onWall()){
                    if(groundEnemy.facing == 'left'){
                        groundEnemy.animations.play('right');
                        groundEnemy.facing = 'right';
                        groundEnemy.body.velocity.x = 70;
                    }
                    else{
                        groundEnemy.animations.play('left');
                        groundEnemy.facing = 'left';
                        groundEnemy.body.velocity.x = -70;
                    }
                }

                var dx = groundEnemy.body.x - player.body.x;

                // buffer distance
                if (Math.abs(dx) < 10) {
                    return true;
                }

                if (groundEnemy.getDirectionTo(player) !== groundEnemy.facing)
                    groundEnemy.goReverse();
            }

        });
    },

    flyEnemyAction:function(flyEnemy){
        if(flyEnemy.die){
            flyEnemy.kill();
            this.addScore(10);
        }

        if(flyEnemy.body.y <= 32){
            flyEnemy.facing = 'down';
        }
        if(flyEnemy.body.onFloor()){
            flyEnemy.facing = 'up';
        }

        if(flyEnemy.facing == 'up'){
            flyEnemy.allowGravity = false;
            flyEnemy.body.velocity.y = -200;
        }
        else{
            flyEnemy.allowGravity = false;
            flyEnemy.body.velocity.y = 200;
        }
    },

    flyEnemyFn:function(){

        var t = this;
        flyEnemies.forEachAlive(function (flyEnemy){
            t.flyEnemyAction(flyEnemy);
        });
    },

    flyEnemyAI:function(flyEnemy){
        t = this;
        var self = this;

        flyEnemies.forEachAlive(function(flyEnemy){
            if (flyEnemy.die) {
                flyEnemy.kill();
                self.addScore(10);
                return;
            }

            var dx = flyEnemy.body.x - player.body.x;
            var dy = flyEnemy.body.y - player.body.y;

            if(flyEnemy.dist && (dx*dx) < flyEnemy.dist)
                flyEnemy.near = true;
            else if(flyEnemy.dist && (dx*dx) == flyEnemy.dist)
                flyEnemy.idle = true;
            else
            {
                flyEnemy.near = false;
                flyEnemy.idle = false;
            }

            if(flyEnemy.die){
                flyEnemy.kill();
            }

            if(flyEnemy.near){
                if(flyEnemy.body.y - player.body.y > 20)
                    flyEnemy.body.velocity.y = -250;
                else if(player.body.y-flyEnemy.body.y  > 20)
                    flyEnemy.body.velocity.y = 250;
            }

            else{
                t.flyEnemyAction(flyEnemy);
            }

            dx = flyEnemy.body.x - player.body.x;
            dy = flyEnemy.body.y - player.body.y;
            flyEnemy.dist = dx*dx;

        });
    },

    jumpEnemyFn: function(){
        jumpEnemies.forEachAlive(function(jumpEnemy){
            if (jumpEnemy.die)
                return;

            if(jumpEnemy.detect(player) && !jumpEnemy.start){
                jumpEnemy.start = true;
                jumpEnemy.body.velocity.x = -100;
            }

            if(jumpEnemy.start){
                if(jumpEnemy.body.onFloor()){
                    jumpEnemy.body.velocity.y = -550;
                }
                if(jumpEnemy.body.onWall()){
                    if(jumpEnemy.facing == 'left'){
                        jumpEnemy.animations.play('right');
                        jumpEnemy.facing = 'right';
                        jumpEnemy.body.velocity.x = 80;
                    }
                    else{
                        jumpEnemy.animations.play('left');
                        jumpEnemy.facing = 'left';
                        jumpEnemy.body.velocity.x = -80;
                    }
                }
            }
        });
    },

    jumpEnemyAI: function(){
        jumpEnemies.forEachAlive(function(jumpEnemy){
            if (jumpEnemy.die)
                return;
            // get enemy offset and size
            var x = jumpEnemy.body.x;
            var y = jumpEnemy.body.y;
            var w = jumpEnemy.body.width;
            var h = jumpEnemy.body.height;

            // place a small rectangle at the current position
            if (debug) {
                this.breadcrumb.beginFill(0xFFFF0B, .4) // color (0xFFFF0B), alpha (0 -> 1)
                this.breadcrumb.drawRect(x + w/2, y + h/2, 5, 5); // (x, y, w, h) 
                this.breadcrumb.endFill();	
            }


            if(jumpEnemy.detect(player) && !jumpEnemy.start){
                jumpEnemy.start = true;
                jumpEnemy.go('left');
            }

            if(jumpEnemy.start){
                if(jumpEnemy.body.onFloor()){
                    jumpEnemy.body.velocity.y = -550;
                }
                if(jumpEnemy.body.onWall()){
                    if(jumpEnemy.facing == 'left')
                        jumpEnemy.go('right');
                    else
                        jumpEnemy.go('left');
                }

                var dx = jumpEnemy.body.x - player.body.x;

                // buffer distance
                if (Math.abs(dx) < 10) {
                    return true;
                }

                if (jumpEnemy.getDirectionTo(player) !== jumpEnemy.facing)
                    jumpEnemy.goReverse();

                // check if player.getTileBelow() === jumpEnemy.getTileBelow()
                // if so, find a way to jump up (check the max. jump height & find step stones to jump up)
                // otherwise, keep following on x
            }
        }.bind(this));
    }
};
