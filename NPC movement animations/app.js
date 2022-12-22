/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let CANVAS_WIDTH = canvas.width = 350;
let CANVAS_HEIGTH = canvas.height = 700;
const numberOfEnemies = 100;
const enemiesArray = []

const enemyImage = new Image()
enemyImage.src ='sprite animations/enemy1.png'

class Enemy{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 4 - 2
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth/3;
        this.height = this.spriteHeight/3;
        this.frame = 0;
    }
    update(){
        this.x += this.speed;
        this.y += this.speed;
    }
    draw(){
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(enemyImage,this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height)
        if (this.frame>4) this.frame = 0
        else this.frame++;
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
    requestAnimationFrame(animate);
}
animate()