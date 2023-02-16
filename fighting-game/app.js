
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
        x:100,
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
        },
        fall:{
            imgSrc: "./img/samuraiMack/fall.png",
            frameMax: 2
        },
        attack1:{
            imgSrc: "./img/samuraiMack/attack1.png",
            frameMax: 6
        },
        takeHit:{
            imgSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
            frameMax: 4
        },
        death:{
            imgSrc: "./img/samuraiMack/death.png",
            frameMax: 6
        }
    },
    attackBox:{
        offset:{
            x:100,
            y: 50
        },
        width: 157,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x:800,
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
    },
    imgSrc: "./img/Kenji/idle.png",
    frameMax: 4,
    scale: 2.5,
    offset:{
        x: 215,
        y: 168
    },
    sprites:{
        idle:{
            imgSrc: "./img/kenji/idle.png",
            frameMax: 4
        },
        run:{
            imgSrc: "./img/kenji/run.png",
            frameMax: 8
        },
        jump:{
            imgSrc: "./img/kenji/jump.png",
            frameMax: 2
        },
        fall:{
            imgSrc: "./img/kenji/fall.png",
            frameMax: 2
        },
        attack1:{
            imgSrc: "./img/kenji/Attack1.png",
            frameMax: 4
        },
        takeHit:{
            imgSrc: "./img/kenji/Take Hit.png",
            frameMax: 3
        },
        death:{
            imgSrc: "./img/kenji/death.png",
            frameMax: 7
        }
    },
    attackBox:{
        offset:{
            x:-173,
            y: 50
        },
        width: 165,
        height: 50
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    if(keys.a.pressed && player.lastKey === "a"){
        player.velocity.x = -5
        player.switchSprite("run")
    }else if (keys.d.pressed && player.lastKey === "d"){
        player.velocity.x = 5
        player.switchSprite("run")
    }
    else{
        player.switchSprite("idle")
    }
    //player jumping
    if(player.velocity.y < 0){
        player.switchSprite("jump");
    }else if(player.velocity.y > 0){
        player.switchSprite("fall");
    }
    //enemy movement
    if(keys.arrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
        enemy.velocity.x = -5
        enemy.switchSprite("run")
    }else if (keys.arrowRight.pressed && enemy.lastKey === "ArrowRight"){
        enemy.velocity.x = 5
        enemy.switchSprite("run")
    }
    else{
        enemy.switchSprite("idle")
    }
    //enemy jumping
    if(enemy.velocity.y < 0){
        enemy.switchSprite("jump");
        enemy.img = enemy.sprites.jump.img
    }else if(enemy.velocity.y > 0){
        enemy.switchSprite("fall");
        enemy.img = enemy.sprites.fall.img
    }

    // collision detection for player
    if
    (
        rectCol({
            rect1: player,
            rect2: enemy
        }) && 
        player.isAttacking && player.currentFrame == 4
    ){
        enemy.takeHit()
        player.isAttacking = false
        //document.querySelector("#enemyHealth").style.width = enemy.health + "%"
        gsap.to("#enemyHealth",{
            width: enemy.health + "%"
        })
    }

    //player misses
    if(player.isAttacking && player.currentFrame === 4){
        player.isAttacking = false
    }
     
    //collision detection for enemy
    if
    (
        rectCol({
            rect1: enemy,
            rect2: player
        }) && 
        enemy.isAttacking && 
        enemy.currentFrame === 2
    ){
        player.takeHit()
        enemy.isAttacking = false
        //document.querySelector("#playerHealth").style.width = player.health + "%"
        gsap.to("#playerHealth",{
            width: player.health + "%"
        })
    }
    //enemy misses
    if(enemy.isAttacking && enemy.currentFrame === 2){
        enemy.isAttacking = false
    }
    
    //end game based on health
    if(enemy.health <= 0 || player.health <= 0){
        winner({player, enemy, timerId})
        
    }
}
animate();

window.addEventListener('keydown', (e)=>{
    if(!player.dead){
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
            case " ":
                player.attack();
            break
        }
    }
    if(!enemy.dead){
        switch(e.key){
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
            case "ArrowDown":
                enemy.attack()
            break
        }
    }else if (enemy.dead || player.dead || timer <= 0){
        switch(e.key){
            case "Enter":
                console.log("enter")
                restartGame();
                break;
        }
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