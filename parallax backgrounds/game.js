const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'sprite animations/layer-1.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'sprite animations/layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'sprite animations/layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'sprite animations/layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'sprite animations/layer-5.png'

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = this.width + this.x - this.speed
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
const layer1 = new Layer(backgroundLayer1, 1)
const layer2 = new Layer(backgroundLayer2, 0.7)
const layer3 = new Layer(backgroundLayer3, 1.2)
const layer4 = new Layer(backgroundLayer4, .9)
const layer5 = new Layer(backgroundLayer5, .3)

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    layer1.update();
    layer2.update();
    layer3.update();
    layer4.update();
    layer5.update();
    layer1.draw();
    layer2.draw();
    layer3.draw();
    layer4.draw();
    layer5.draw();
    requestAnimationFrame(animate);
}
animate();