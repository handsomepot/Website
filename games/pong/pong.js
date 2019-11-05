var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 500;

var score1=0;
var score2=0;

var keys = {};
var gameState = 0; // 0: initial, 1: running, 2: idle, 3: win, 4:over

 
document.addEventListener('keydown', function (e) {
    if(gameState == 0){
        if(32 == e.keyCode)
            gameState = 1;
    }
    
    if(gameState == 3 || gameState == 4){
        if(32 == e.keyCode)
            gameState = 0;
    }

    keys[e.keyCode] = true;
    e.preventDefault();
});

document.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
});

function input() {
    
    if (38 in keys) { //If the up arrow key is pressed
        if (player1.y - player1.gravity > 0) {
            player1.y -= player1.gravity;
        }
    } else if (40 in keys) { //If the down arrow key is pressed
        if (player1.y + player1.height + player2.gravity < canvas.height) {
            player1.y += player1.gravity;
        }
    }

}

function movePlayer2(){
    
    if(theBall.y < player2.y){
        if (player2.y - player2.gravity > 0) {
            player2.y -= player2.gravity;
        }
    }
    else{
        if (player2.y + player2.height + player2.gravity < canvas.height) {
            player2.y += player2.gravity;
        }
    }
}

function Box(options){ /*Constructor of Box object*/
    this.x = options.x || 10;
    this.y = options.y || 10;
    this.width = options.width || 40;
    this.height = options.height || 50;
    this.color = options.color || '#FFFFFF';
    this.speed = options.speed || 2;
    this.gravity = options.gravity || 2;

}

var player1 = new Box({ /*player paddle*/
    x: 10,
    y: 200,
    width: 15,
    height: 90,
    color: '#FFFFFF',
    gravity: 4
});

var player2 = new Box({ /*player paddle*/
    x: 675,
    y: 100,
    width: 15,
    height: 90,
    color: '#FFFFFF',
    gravity: 2
});

var midLine = new Box({ /*The net*/
    x: (canvas.width/2)-2.5,
    y: 20,
    width: 5,
    height: canvas.height-40,
    color: '#FFFFFF'
});

var theBall = new Box({
    x: (canvas.width / 2),
    y: (canvas.height / 2),
    width: 15,
    height: 15,
    color: '#FF0000',
    speed: 2,
    gravity: 2
});

function createNewBall(){
    
    theBall.x = (canvas.width / 2 - 7.5);
    theBall.y = (canvas.height / 2);
    theBall.width = 15;
    theBall.height = 15;
    theBall.color = '#FF0000';
    
    var s = Math.floor((Math.random() * 2) ) * 2;
    var g = Math.floor((Math.random() * 2) ) * 2;
    s = (s == 0 ? -2 : s);
    g = (g == 0 ? -2 : g);
    theBall.speed = s;
    theBall.gravity = g;
    
}

function ballCollision() {
    // player1 collision
    
    if (theBall.x <= player1.x + player1.width && theBall.x + theBall.width >= player1.x ) {
        if (theBall.y + theBall.height >= player1.y  && theBall.y <= player1.y + player1.height) {
            theBall.x = (player1.x + theBall.width);
            theBall.speed *= (-1);
        }
        
    }
    
    if (theBall.x + theBall.width >= player2.x && theBall.x + theBall.width <= player2.x + player2.width) {
        if (theBall.y + theBall.height >= player2.y  && theBall.y <= player2.y + player2.height) {
            theBall.x = (player2.x - theBall.width);
            theBall.speed *= (-1);
        }
        
    }
    
    
    if (theBall.x + theBall.width < player1.x - 5) {
        score2 += 1;
        gameState = 2;
    } else if (theBall.x > player2.x + player2.width + 5) {
        score1 += 1;
        gameState = 2;
    } else {
        theBall.x += theBall.speed;
        theBall.y += theBall.gravity;
    }
    if(gameState==2){
        createNewBall();
    }
    if(score2 >= 5){
        gameState = 3;
    }
    if(score1 >= 5){
        gameState = 4;
    }
    draw();
}

function ballBounce() { /* Check if the ball will hit the top or bottom of the canvas */
    if (((theBall.y+theBall.gravity) <= 0) || ((theBall.y+theBall.gravity+theBall.height) >= canvas.height)){
        theBall.gravity = (theBall.gravity) * (-1); /*If it does, change the gravity value to move in the opposite direction*/
        theBall.y += theBall.gravity; // Move theBall
        theBall.x += theBall.speed;
    } else { // If the ball doesn’t hit the top or bottom, then move theBall as normal
        theBall.x += theBall.speed;
        theBall.y += theBall.gravity
    }
    
    ballCollision(); //Call the ballCollision function next
}




function drawBox(box) { /* draw each box*/
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function displayScore1() { /* play1 score*/
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    var str1 = score1;
    ctx.fillText(str1, (canvas.width/2) - 50, 30);
}

function displayScore2() { /*player2 score*/
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    var str2 = score2;
    ctx.fillText(str2, (canvas.width / 2) + 50, 30);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    displayScore1();
    displayScore2();
    drawBox(player1);
    drawBox(player2);
    drawBox(midLine);

    
    if(gameState==0){

        drawStartMenu();
    }
    if(gameState==1 || gameState==2){ // running

        drawBox(theBall);
    }
    if(gameState==3){

        drawOverMenu();
    }
    if(gameState==4){
        drawWinMenu();
    }

}

function drawStartMenu(){
    ctx.font="30px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.clearRect(canvas.width/2-10,canvas.height/2-40, 20,60);
    ctx.fillText("Press spacebar to start", canvas.width/2, canvas.height/2);
}

function drawOverMenu(){
    ctx.font="30px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
    ctx.fillText("Press spacebar to restart", canvas.width/2, canvas.height/2 + 40);

}

function drawWinMenu(){
    ctx.font="30px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("You Win", canvas.width/2, canvas.height/2);
    ctx.fillText("Press spacebar to restart", canvas.width/2, canvas.height/2 + 40);
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function init(){
    score1 = 0;
    score2 = 0;
    createNewBall();
}

function loop() { /*The loop function will continuously call the draw function and update our screen*/
    if(gameState == 0){
        init();
    }
    
    draw();
    if(gameState == 1){
        ballBounce();
        input(player1);
        movePlayer2();
        
    }
    else if(gameState == 2){
        sleep(1000);
        gameState = 1;
    }
    
    requestAnimationFrame(loop);
}

loop();