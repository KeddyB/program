//board
var blockSize = 20;
var rows = 25;
var cols = 25;
var board; 
var context;

//snake head
var snakeX = blockSize * 12;
var snakeY = blockSize * 12;

//snake speed
var velocityX = 0
var velocityY = 0

//food 
var foodX;
var foodY;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize
    context = board.getContext("2d")

    foodPos();
    document.addEventListener("keyup", changePos())
    update();
    setInterval(update, 100)
}
function update(){
    context.fillStyle ="black";
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle ="lime";
    snakeX += velocityX
    snakeX += velocityY
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle ="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}
function changePos(e){
    if (e.code =="ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowRight"){
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == "ArrowLeft"){
        velocityX = 1;
        velocityY = 0;
    }
}
function foodPos(){
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
 
}