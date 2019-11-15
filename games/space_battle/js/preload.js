
preload.preload = function ()
{


            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
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
    
    

            this.load.image('starfield', '../assets/starfield.png');
            this.load.image('starship', '../assets/player.png');

            this.load.image('enemy1', '../assets/enemy1.png');
            this.load.image('enemy2', '../assets/enemy2.png');
            this.load.image('ufo', '../assets/ufo.png');
            this.load.image('bullet1', '../assets/bullet1.png');
            this.load.image('bullet2', '../assets/bullet2.png');
            this.load.image('bullet3', '../assets/bullet3.png');
            this.load.image('bullet4', '../assets/bullet4.png');
            this.load.image('boss', '../assets/boss.png');
            this.load.spritesheet("sprExplosion", "../assets/sprExplosion.png", {
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("explode2", "../assets/explode2.png", {
                frameWidth: 80,
                frameHeight: 80
            });
            this.load.spritesheet("explode3", "../assets/explode3.png", {
                frameWidth: 80,
                frameHeight: 80
            });
            this.load.spritesheet("playergroup", "../assets/playergroup.png", {
                frameWidth: 60     ,
                frameHeight: 60
            });
    
            this.load.spritesheet("enemygroup1", "../assets/enemygroup1.png", {
                frameWidth: 80,
                frameHeight: 55
            });
        
            this.load.spritesheet("enemygroup2", "../assets/enemygroup2.png", {
                frameWidth: 96,
                frameHeight: 65
            });
    
            
            this.load.spritesheet("enemygroup3", "../assets/enemygroup3.png", {
                frameWidth: 96,
                frameHeight: 66
            });
     
            this.load.spritesheet("enemygroup4", "../assets/enemygroup4.png", {
                frameWidth: 72,
                frameHeight: 72
            });
    
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
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
            this.load.audio('music', '../assets/Mercury.wav');
            this.load.audio('explode', '../assets/laser1.wav');
            this.load.audio('explode2', '../assets/explosion07.wav');
            this.load.audio('explode1', '../assets/explosion01.wav');
    




},

preload.create = function ()
{
    
   preload.scene.start('menu');
}

