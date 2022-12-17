const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'sprite animations/shadow_dog.png'
const spriteWidth = 575;
const spriteHeight = 525;

//this frame help to pick the pictures of the frames to display ensuring an animation
let frameX = 0;
let frameY = 0;

//to slow the frames we create grame frame variable
let gameFrame = 0;
const staggerFrame = 5;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let Position = Math.floor(gameFrame/staggerFrame) % 6;
    frameX = spriteWidth * Position
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    //if (gameFrame % staggerFrame == 0){
    //    if(frameX < 9)frameX++;
    //    else frameX = 0
    //}
    gameFrame ++;
    requestAnimationFrame(animate)
}
animate()