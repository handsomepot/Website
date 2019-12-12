
preload.preload = function ()
{


            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(140, 270, 270, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
    
    

            this.load.image('starfield', 'assets/background.jpg');
            this.load.image('starship', 'assets/starship.png');

            this.load.image('enemy1', 'assets/enemy1.png');
            this.load.image('enemy2', 'assets/enemy2.png');
            this.load.image('bullet1', 'assets/bullet1.png');
            this.load.image('bullet2', 'assets/bullet2.png');
            this.load.image('bullet3', 'assets/bullet3.png');
            this.load.image('bullet4', 'assets/bullet4.png');
            this.load.image('bullet5', 'assets/bullet5.png');
            this.load.image('bullet6', 'assets/bullet6.png');
            this.load.image('b1', 'assets/b1.png');
            this.load.image('b2', 'assets/b2.png');
            this.load.image('b3', 'assets/b3.png');
            this.load.image('b4', 'assets/b4.png');
            this.load.image('b5', 'assets/b5.png');
            this.load.image('b6', 'assets/b6.png');
            this.load.image('b7', 'assets/b7.png');
            this.load.image('b8', 'assets/b8.png');
            this.load.image('boss', 'assets/boss.png');
            this.load.image('ufo5', 'assets/ufo5.png');
            this.load.image('ufo6', 'assets/ufo6.png');
            this.load.image('ufo7', 'assets/ufo7.png');
            this.load.image('ufo8', 'assets/ufo8.png');
    
    
            this.load.audio('battle1', 'assets/battle1.ogg');
            this.load.audio('battle2', 'assets/battle2.ogg');
            this.load.audio('battle3', 'assets/battle3.mp3');
            this.load.audio('music', 'assets/Mercury.wav');
            this.load.audio('explode', 'assets/laser1.wav');
            this.load.audio('explode1', 'assets/explosion07.wav');
            this.load.audio('explode2', 'assets/explosion01.wav');
            this.load.audio('menuMusic', 'assets/menu.ogg');
            this.load.audio('point', 'assets/point.mp3');
            this.load.audio('death', 'assets/death.wav');
            this.load.audio('boss1Music', 'assets/boss.wav');
    

            this.load.image('live', 'assets/live.png');
            this.load.image('up', 'assets/up.png');
            this.load.image('particle', 'assets/yellow.png');


            this.load.spritesheet("sprExplosion", "assets/sprExplosion.png", {
                frameWidth: 64,
                frameHeight: 64
            }); 
    
            this.load.spritesheet("sprExplosion2", "assets/sprExplosion2.png", {
                frameWidth: 50,
                frameHeight: 50
            });
    
            this.load.spritesheet("explode2", "assets/explode2.png", {
                frameWidth: 80,
                frameHeight: 80
            });
            this.load.spritesheet("explode3", "assets/explode3.png", {
                frameWidth: 50,
                frameHeight: 50
            });
            this.load.spritesheet("playergroup", "assets/playergroup.png", {
                frameWidth: 60     ,
                frameHeight: 60
            });
    
            this.load.spritesheet("playergroup2", "assets/playerAnimation2.png", {
                frameWidth: 65     ,
                frameHeight: 65
            });
    
            this.load.spritesheet("enemygroup1", "assets/enemygroup1.png", {
                frameWidth: 80,
                frameHeight: 55
            });
        
            this.load.spritesheet("enemygroup2", "assets/enemygroup2.png", {
                frameWidth: 96,
                frameHeight: 65
            });
    
            
            this.load.spritesheet("enemygroup3", "assets/enemygroup3.png", {
                frameWidth: 72,
                frameHeight: 72
            });
     
            this.load.spritesheet("enemygroup4", "assets/enemygroup4.png", {
                frameWidth: 72,
                frameHeight: 72
            });
    
           this.load.spritesheet("ufo1", "assets/ufo1.png", {
                frameWidth: 80,
                frameHeight: 40
            }); 
            
            this.load.spritesheet("ufo2", "assets/ufo2.png", {
                frameWidth: 80,
                frameHeight: 40
            }); 
    
            this.load.spritesheet("ufo4", "assets/ufo4.png", {
                frameWidth: 80,
                frameHeight: 40
            });
    
    
            this.load.spritesheet("crab", "assets/crab.png", {
                frameWidth: 110 ,
                frameHeight: 120
            });
    
            this.load.spritesheet("boss1", "assets/boss1.png", {
                frameWidth: 120 ,
                frameHeight: 125
            }); 
            
            this.load.spritesheet("frog", "assets/boss1.png", {
                frameWidth: 120 ,
                frameHeight: 125
            });
    
            this.load.spritesheet("boss3", "assets/boss3.png", {
                frameWidth: 170 ,
                frameHeight: 100
            });
    
            this.load.spritesheet("brick1", "assets/brick1.png", {
                frameWidth: 90 ,
                frameHeight: 80
            });
    
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(150, 280, 250 * value, 30);
            });
            
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });

            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });

},

preload.create = function ()
{
    
   preload.scene.start('menu');
}

