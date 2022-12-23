/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let CANVAS_WIDTH = canvas.width = 350;
let CANVAS_HEIGTH = canvas.height = 700;
const numberOfEnemies = 20;
const enemiesArray = []

let gameFrame = 0;
class Enemy{
    constructor(){
        this.image = new Image()
        this.image.src = 'sprite animations/enemy2.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth/3;
        this.height = this.spriteHeight/3;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.angle = 0
        this.angleSpeed = Math.random() * .2;
        this.curve = Math.random() *8;
    }
    update(){
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed
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