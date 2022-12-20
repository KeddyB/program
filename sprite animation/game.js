playerState = 'idle'
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value
})

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'sprite animations/shadow_dog.png'
const spriteWidth = 575;
const spriteHeight = 525;


//to slow the frames we create grame frame variable
let gameFrame = 0;
const staggerFrame = 5;

const spriteAnimation =[];
//create a container to hold all data and location of each corner of the picture to animate through it
const animationPos = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 7
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    }, 
    {
        name: 'bite',
        frames: 7
    }, 
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    },
];
animationPos.forEach((pos, index) =>{
    let frames = {
        loc: [],
    }
    for (let j = 0; j < pos.frames; j++){
        let PositionX = j * spriteWidth;
        let PositionY = index * spriteHeight;
        frames.loc.push({x: PositionX, y : PositionY})
    }
    spriteAnimation[pos.name] = frames;
})
console.log(spriteAnimation)
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position
    let frameY = spriteAnimation[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    gameFrame ++;
    requestAnimationFrame(animate)
}
animate()