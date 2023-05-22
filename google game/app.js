// let gravity = 10
// let velocity = 2
// let char = {
//    x: 120,
//    y: 105,
// }
// let isJumping
// class Block{
//    constructor(x, y = 120){
//       this.x = x
//       this.y = y
//    }
// }

// let block1 = new Block(750)
// let block2 = new Block(800)

// window.onload = function(){
//    canvas = document.querySelector(".canvas")
//    ctx = canvas.getContext("2d")
//    canvas.width = 800
//    canvas.height = 200

//    update()
// }

// function update(){
//    requestAnimationFrame(update)
//    ctx.clearRect(0, 0, canvas.width, canvas.height)
//    ctx.fillStyle = "black"
//    ctx.fillRect(0,150, canvas.width, 100)

//    ctx.fillStyle = "red"
//    ctx.fillRect(char.x, char.y, 30,50)
   
//    ctx.fillStyle = "green"
//    ctx.fillRect(block1.x, block1.y, 20, 35)
//    ctx.fillRect(block2.x, block2.y, 20, 35)
//    block1.x -= 3
//    block2.x -= 3
//    if(char.y >= 65 && !isJumping){
//       char.y -= velocity
//    }
//    if(block1.x <= 0){
//       block1.x = 800
//    }
//    if(block2.x <= 0){
//       block2.x = 800
//    }
// }
canvas = document.querySelector(".canvas")
ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 200
// ctx.beginPath()
// ctx.setLineDash([50, 10])
// ctx.moveTo(0, 50)
// ctx.lineTo(800, 150)
// ctx.stroke()
function drawDashedLine(pattern){
   ctx.beginPath()
   ctx.setLineDash(pattern)
   ctx.moveTo(0, t)
   ctx.lineTo(800, t)
   ctx.stroke()
   t+=20
}
let t = 170 
drawDashedLine([15,3,3,3])
class Player{
   constructor(width,height, x, y){
      this.height = height
      this.width = width
      this.x = x
      this.y = y
   }
   draw(){
      ctx.fillStyle = "red"
      ctx.fillRect(this.x, this.y, this.width, this.height)
   }
   update(){
      this.draw()
      document.addEventListener("keydown", (e)=>{
         if(e.key == "ArrowUp"){
            this.y--
         }
      })
   }
}
class Obstacle{
   constructor(width, height, x, y = 800){
      this.height = height
      this.width = width
      this.x = x
      this.y = y
   }
   draw(){
      ctx.fillStyle = "blue"
      ctx.fillRect(this.x, this.y, this.width, this.height)
   }
   update(){
      this.draw()
   }
}

const obs = new Obstacle(30, 30, 105, 300)
obs.update()

const player = new Player(30, 30, 105, 140)
player.update()
