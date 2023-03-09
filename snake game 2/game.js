//board
var blockSize = 20;
var rows = 25;
var cols = 25;
var board; 
var context;

//snake head
var snakeX = blockSize * 12;
var snakeY = blockSize * 12;

//snake body
var snakeBody = [];

//snake speed
var velocityX = 0;
var velocityY = 0;

//food 
var foodX;
var foodY;

//game over
var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d")

    foodPos();
    document.addEventListener("keyup", changeDir);
    //update();
    setInterval(update, 100);
}
function update(){
    if(gameOver){
        return;
    }
    context.fillStyle ="black";
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle ="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (foodX == snakeX && foodY == snakeY){
        snakeBody.push([foodX, foodY])
        foodPos();
    }

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length){
        snakeBody[0]= [snakeX, snakeY]
    }
    
    context.fillStyle ="lime";
    snakeX +=velocityX * blockSize;
    snakeY +=velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //game over conditions
    //collision with walls
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 ||snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over: You ran into the wall");
    }
    
    //collision with body
    for(i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("GameOver: You bit yourself")
            removeEventListener("keyup", changeDir)
        }
    }
}
function changeDir(e){
    if (e.code =="ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}
function foodPos(){
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}