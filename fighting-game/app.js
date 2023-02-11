
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);
const gravity = .7

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imgSrc: "./img/background.png"
})
const shop = new Sprite({
    position: {
        x:600,
        y:128
    },
    imgSrc: "./img/shop.png",
    scale: 2.75,
    frameMax: 6
})
const player = new Fighter({
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
    },
    imgSrc: "./img/samuraiMack/idle.png",
    frameMax: 8,
    scale: 2.5,
    offset:{
        x: 215,
        y: 157
    },
    sprites:{
        idle:{
            imgSrc: "./img/samuraiMack/idle.png",
            frameMax: 8
        },
        run:{
            imgSrc: "./img/samuraiMack/run.png",
            frameMax: 8
        },
        jump:{
            imgSrc: "./img/samuraiMack/jump.png",
            frameMax: 2
        }
    }
})

const enemy = new Fighter({
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

deTimer()
function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    //enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    player.img = player.sprites.idle.img
    if(keys.a.pressed && player.lastKey === "a"){
        player.img = player.sprites.run.img
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastKey === "d"){
        player.img = player.sprites.run.img
        player.velocity.x = 5
    }

    if(player.velocity.y < 0){
        player.img = player.sprites.jump.img
        player.frameMax = player.sprites.jump.frameMax
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
    if(enemy.health <= 0 || player.health <= 0){
        winner({player, enemy, timerId})
        
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