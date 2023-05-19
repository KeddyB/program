let gravity = 0.6
let jumpStrength = 12
let jumpForce = 0
let isJumping = false

let char = {
   x: 120,
   y: 105,
   velocity: 4
}
class Block{
   constructor(x, y = 115){
      this.x = x
      this.y = y
   }
}

let block1 = new Block(750)
let block2 = new Block(800)

window.onload = function(){
   canvas = document.querySelector(".canvas")
   ctx = canvas.getContext("2d")
   canvas.width = 800
   canvas.height = 200

   function update(){
      requestAnimationFrame(update)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if(isJumping){
         jumpForce+=gravity
         char.y += jumpForce
         if(char.y >= canvas.width - 20){
            char.y = canvas.width - 20
            isJumping = false
         }
      }
      ctx.fillStyle = "black"
      ctx.fillRect(0,150, canvas.width, 100)

      ctx.fillStyle = "red"
      ctx.fillRect(char.x, char.y, 30,50)
      
      ctx.fillStyle = "green"
      ctx.fillRect(block1.x, block1.y, 20, 40)
      ctx.fillRect(block2.x, block2.y, 20, 40)
      // block1.x -= 1
      // block2.x -= 1
      // if(block1.x == 0){
      //    block1.x = 750
      // }
      // if(block2.x == 0){
      //    block2.x = 800
      // }
   }
   update()
}

document.addEventListener("keyup", (e)=>{
   if(e.keyCode == "ArrowUp" || e.keyCode == "Space"){
      isJumping = true
      jumpForce = -jumpStrength
   }
   if(e.keyCode == "ArrowDown" || e.keyCode == "Space" && jumpForce < -4){
      jumpForce = -4
   }
})