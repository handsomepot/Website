var score1 = 0;
var score2 = 0;
var total = 0;
var timer;
var timerLock = false;
var countdownLock = false;
var scoreText1,scoreText2;
var gameState = 'init';
var count = 4;
var serve = true; // serve the ball
var ball;
var colors = ['#2c3e50', '#e25409', '#043112'];
var offset = [80, 80, 80];
var velocity = [300,400,450];
var vx = [250,300,350];
var vy = [300,350,400];
var scaleY = [1.5,1.25,1];
var level = 0;
let sfx, sfx2;
// background color #2c3e50
// background color #2c3e50
level1.preload = function ()
{


},

level1.create = function ()
{


    this.cameras.main.setBackgroundColor(colors[level]);
    player = this.physics.add.sprite(
    offset[level], // x position
    worldY/2, // y position
    'paddle', // key of image for the sprite
  );
    
    computer = this.physics.add.sprite(
    worldX-offset[level], // x position
    worldY/2, // y position
    'paddle', // key of image for the sprite
  );
 
    ball = this.physics.add.sprite(
    worldX/2, // x position
    worldY/2, // y position
    'ball', // key of image for the sprite
  );
    
  player.scaleY = scaleY[level];
  computer.scaleY = scaleY[level];
  ball.visible = false;

  computer.setCollideWorldBounds(true); //player can't leave the screen
  player.setCollideWorldBounds(true); //player can't leave the screen
  ball.setCollideWorldBounds(true); //ball can't leave the screen
  ball.setBounce(1, 1);
  player.setImmovable(true);
  computer.setImmovable(true);
  this.physics.world.checkCollision.left = false;
  this.physics.world.checkCollision.right = false;



  
  
  // add collision detection
  this.physics.add.collider(ball, player, hitPaddle, null, this);
  this.physics.add.collider(ball, computer, hitComputer, null, this);
  //this.physics.add.collider(ball, this.physics.world, hitWorld, null, this);
  
  
  this.input.keyboard.on('keydown', function (event) {

        if(gameState == 'running'){
            
            if(event.key == 'ArrowDown'){
                player.setVelocityY(360);
            }
            else if(event.key == 'ArrowUp'){
                player.setVelocityY(-360);
            }
        }

    });

    this.input.keyboard.on('keyup', function (event) {

        player.setVelocityY(0);

    });

   //
    
   var line = this.physics.add.group({
    key: 'line',
    repeat: 16,
    immovable: true,
    setXY: {
      x: worldX/2,
      y: 100,
      stepY: 20
    }
  });

    
    scoreText1 = this.add.text(
    this.physics.world.bounds.width / 4,
    50,
    '0',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '30px',
      fill: '#fff',

    },
  );
    
    scoreText1.setOrigin(0.5);

    scoreText2 = this.add.text(
    this.physics.world.bounds.width / 4 *3,
    50,
    '0',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '30px',
      fill: '#fff',

    },
  );

    scoreText2.setOrigin(0.5);


    coutdownText = this.add.text(
    this.physics.world.bounds.width / 2,
    60,
    count + '',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '60px',
      fill: '#ff0',
    },
  );

    coutdownText.setOrigin(0.5);
    coutdownText.visible = false;
    
    
    clearText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Level Clear',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '60px',
      fill: '#ff0',
    },
  );

    clearText.setOrigin(0.5);
    clearText.visible = false;
    
    
    levelText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height -30,
    'Round ' + (level+1),
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '16px',
      fill: '#5f5f5f',
    },
  );

    levelText.setOrigin(0.5);
    

    
    
    overText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Game Over',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '80px',
      fill: '#ff0',
    },
  );

    overText.setOrigin(0.5);
    overText.visible = false;
    
    
        
    winText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'You Win',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '80px',
      fill: '#ff0',
    },
  );

    winText.setOrigin(0.5);
    winText.visible = false;
    
    sfxBeep = this.sound.add('beep');
    sfxScore = this.sound.add('score');
    sfxExplode = this.sound.add('explode');
    
    
    
       
},

resetBall = function(){
    ball.body.x = worldX/2;
    
    if(Math.random() >= 0.5)
        ball.body.y = 50;
    else
        ball.body.y = 450;
    ball.setVelocityX(0);
    ball.setVelocityY(0);

    ball.visible = false;
}
    
setRandomDirection = function(){

    if(Math.random() >= 0.5)
        ball.setVelocityX(-vx[level]);
    else
        ball.setVelocityX(vx[level]);
    
    if(Math.random() >= 0.5)
        ball.setVelocityY(-vy[level]);
    else
        ball.setVelocityY(vy[level]);

    ball.visible = true;

}

function resetAll(){
    resetBall();
    level++;
    score1 = 0;
    score2 = 0;
    count = 3;
    clearText.visible = false;
    ball.visible = false;
    gameState = 'init';
    player.setX(offset[level]);
    player.setY(worldY/2);
    computer.setX(worldX - offset[level]);
    computer.setY(worldY/2);
    player.scaleY = scaleY[level];
    computer.scaleY = scaleY[level];
    scoreText1.text = score1 +'';
    scoreText2.text = score2 +'';
    levelText.text = 'Round ' + (level+1); 

}

function diaplayclearText(){

    resetAll();
    console.log(level);
    this.cameras.main.setBackgroundColor(colors[level]);
    timerLock = false;

}

function delay1(){
    //console.log( ball.body.y);

    setRandomDirection();
    timerLock = false;
}

countdown = function (){
    if(count == 4){
        coutdownText.text = 'Ready';
        coutdownText.visible = true;
        count--;
    }
    else{
        coutdownText.text = (count--) + '';
        coutdownText.visible = true;
    }
    countdownLock = 0;
}

hitPaddle = function(){

    sfxBeep.play();
}

hitComputer = function(){

    sfxBeep.play();
}





level1.update = function ()
{
    if(score1 ==5){
        gameState = 'win'
    }
    if(score2 == 5){
        gameState = 'lose';
    }
    if(gameState == 'init'){
        if(count >= 0 && countdownLock == 0) {
            timer = this.time.addEvent({ delay: 1000, callback: countdown, callbackScope: this, loop: false });
            countdownLock = 1;
        }
        if(count < 0){
            coutdownText.visible = false;
            gameState = 'ready';
        }
    }
    else if(gameState == 'ready'){
        setRandomDirection();
        gameState = 'running';
    }
    else if(gameState == 'win'){
        

        if(level==2){
            winText.visible = true;
            gameState = 'Final'
            resetBall();
        }
        else{
            resetBall();
            clearText.visible = true;
            if(!timerLock){
                timer = this.time.addEvent({ delay: 1000, callback: diaplayclearText, callbackScope: this, loop: false });
                timerLock = true;
            }
        }
        
        

    }
    else if(gameState == 'lose'){
        resetBall();
        overText.visible = true;
    }
    else if(gameState == 'running'){
        if(ball.body.x + 32 < 0){
            sfxExplode.play();
            score2++;
            resetBall();
            
            scoreText2.text = score2 + '';
            console.log(ball.body.y);
            timer = this.time.addEvent({ delay: 1500, callback: delay1, callbackScope: this, loop: false });
            timerLock = true;
            serve = true;
        }

        if(ball.body.x >= worldX + 32){
            score1 ++;
            sfxScore.play();
            resetBall();
            
            scoreText1.text = score1 + '';

            timer = this.time.addEvent({ delay: 1500, callback: delay1, callbackScope: this, loop: false });
            timerLock = true;
            serve = true;

        }
            if(timerLock){
               computer.setVelocityY(0);
            }
            else{

                
                if((computer.body.y - ball.body.y) >= 10){
                    if(computer.body.x - ball.body.x >=40)
                        computer.setVelocityY(-velocity[level]);
                    else if(computer.body.x - ball.body.x >=10)
                        computer.setVelocityY(-velocity[level]-50);
                    else
                        computer.setVelocityY(0);

                }
                else if((computer.body.y - ball.body.y) < -10){
        
                    if(computer.body.x - ball.body.x >=40)
                        computer.setVelocityY(velocity[level]);
                    else if(computer.body.x - ball.body.x >=10)
                        computer.setVelocityY(velocity[level]+50);
                    else
                        computer.setVelocityY(0);

                }
                else{

                    computer.setVelocityY(0);

                }
            }

            
    }
       
}
    
