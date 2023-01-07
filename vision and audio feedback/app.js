const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
canvas.width = 320;
canvas.height = 500;
const explosions = []
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.image = new Image()
        this.image = 'sprite animations/boom.png'
        this.frame = 0;
    }
    update(){
        this.frame++;
    }
    draw(){
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y,this.width, this.heigth)
    }
}
window.addEventListener('click', function(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY))
});


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();
    }
    requestAnimationFrame(animate)
}
animate()