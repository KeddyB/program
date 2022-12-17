const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'sprite animations/shadow_dog.png'
const spriteWidth = 575;
const spriteHeight = 525;

let frameX = 1;
let frameY = 5;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillStyle = "red"
    //ctx.fillRect( 45, 45, 100, 100);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    if(frameX < 6)frameX++;
    else frameX = 0
    requestAnimationFrame(animate)
}
animate()
console.log(animate())