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
//pipes
let pipeArray = [];
let pipeWidth = 64
let pipeHeight = 512
let pipeX = canvasWidth;
let pipeY = 0

let topPipeImg;
let bottomPipeImg

//physics
let velocityX = -2
let velocityY = 0
let gravity = .5

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
    //drawpipes
    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png"
    bottomPipeImg = new Image()
    bottomPipeImg.src = "./bottompipe.png"

    requestAnimationFrame(update)
    setInterval(placePipes, 1500)

    document.addEventListener("keydown", (e)=>{
        if(e.code == "Space" || e.code == "ArrowUp"){
            velocityY = -6
        }
    })
}
function update(){
    requestAnimationFrame(update)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    velocityY += gravity

    bird.y = Math.max(bird.y + velocityY, 0)
    ctx.drawImage(birdImg, bird.x, bird.y,bird.width, bird.height)

    //pipes
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i]
        pipe.x += velocityX;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
    }
}

function placePipes(){
    let randomPipeY = pipeY - pipeHeight/4 - Math.floor(Math.random() * (pipeHeight/2))
    let opening = canvasHeight/4
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe)

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + opening + pipeHeight,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe)
}
