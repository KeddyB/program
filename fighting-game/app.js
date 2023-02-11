
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);
const gravity = .7

class Sprite{
    constructor({position,velocity, color = "red", offset}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box
        if(this.isAttacking){
            ctx.fillStyle = "green"
            ctx.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height
            )
        }
    }

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y>= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity

    }
    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
    position: {
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
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
    color: "blue",
    offset:{
        x: -50,
        y:0
    }
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

function rectCol({rect1, rect2}){
    return(
        rect1.attackBox.position.x + rect1.attackBox.width >=rect2.position.x && 
        rect1.attackBox.position.x <= rect2.position.x + rect2.width && 
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y && 
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    )
}
let timer = 10;
function deTimer(){
    if(timer > 0){
        setTimeout(deTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer
    }
    if(player.health === enemy.health){
        console.log("a tie")
    }
}
deTimer()
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
        rectCol({
            rect1: player,
            rect2: enemy
        }) && 
        player.isAttacking
    ){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector("#enemyHealth").style.width = enemy.health + "%"
    }
    if
    (
        rectCol({
            rect1: enemy,
            rect2: player
        }) && 
        enemy.isAttacking
    ){
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector("#playerHealth").style.width = player.health + "%"
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
        case " ":
            player.attack();
        break
        case "ArrowDown":
            enemy.attack()
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