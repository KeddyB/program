/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let CANVAS_WIDTH = canvas.width = 350;
let CANVAS_HEIGTH = canvas.height = 700;
const numberOfEnemies = 40;
const enemiesArray = []

let gameFrame = 0;

class Enemy{
    constructor(){
        this.image = new Image()
        this.image.src = 'sprite animations/enemy4.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth/3;
        this.height = this.spriteHeight/3;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.interval = Math.floor(Math.random() * 200 + 50)
    }
    update(){
        if(gameFrame % this.interval === 0){
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height)
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY
        this.x -= dx/20
        this.y -= dy/30
        if(this.x + this.width < 0){
            this.x = canvas.width
        }
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height) 
    }
};

for(let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy())
}
console.log(enemiesArray)
function animate (){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGTH)
    //enemy1.update();
    //enemy1.draw();
    enemiesArray.forEach(enemy => {
        enemy.update()
        enemy.draw();
    })
    gameFrame++
    requestAnimationFrame(animate);
}
animate()