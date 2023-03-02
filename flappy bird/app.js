//canvas
let canvas;
let ctx;
let canvasWidth = 360;
let canvasHeight = 640;

//bird
birdWidth = 34
birdHeight = 24
let birdX = canvasWidth/8
let birdY = canvasHeight/2

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
}

window.onload = function(){
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    //draw bird
    birdImg = new Image()
    birdImg.src = "./flappybird.png"
    birdImg.onload = function(){
        ctx.drawImage(birdImg, bird.x, bird.y,bird.width, bird.height)
    } 
}