
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .7

class Sprite{
    constructor({position,velocity, color = "red"}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150
        this.lastKey;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box
        ctx.fillStyle = "green"
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y>= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity
    }
}
1
const player = new Sprite({
    position: {
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    }
})

const enemy = new Sprite({
    position: {
        x:500,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    color: "blue"
})

const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    arrowRight:{
        pressed: false
    },
    arrowLeft:{
        pressed: false
    },
    arrowUp:{
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    if(keys.a.pressed && player.lastKey === "a"){
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastKey === "d"){
        player.velocity.x = 5
    }

    //enemy movement
    if(keys.arrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
        enemy.velocity.x = -5
    }else if (keys.arrowRight.pressed && enemy.lastKey === "ArrowRight"){
        enemy.velocity.x = 5
    }

    // collision detection
    if
    (
        player.attackBox.position.x + player.attackBox.width >=enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width && player.attackBox.position.y + player.attackBox.height >= enemy.position.y && player.attackBox.position.y <= enemy.position.y + enemy.height
    ){
        console.log("go")
    }
}
animate();

window.addEventListener('keydown', (e)=>{
    switch(e.key){
        case "d":
            keys.d.pressed = true
            player.lastKey="d"
        break
        case "a":
            keys.a.pressed = true
            player.lastKey="a"
        break
        case "w":
            player.velocity.y += -20
        break
        case "ArrowRight":
            keys.arrowRight.pressed = true
            enemy.lastKey = "ArrowRight"
        break
        case "ArrowLeft":
            keys.arrowLeft.pressed = true
            enemy.lastKey = "ArrowLeft"
        break
        case "ArrowUp":
            enemy.velocity.y -= 20
        break
    }
});

window.addEventListener('keyup', (e)=>{
    switch(e.key){
        case "d":
            keys.d.pressed = false
        break
        case "a":
            keys.a.pressed = false
        break
    }
    //enemy keys
    switch(e.key){
        case "ArrowRight":
            keys.arrowRight.pressed = false
        break
        case "ArrowLeft":
            keys.arrowLeft.pressed = false
        break
    }
})