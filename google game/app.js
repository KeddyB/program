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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0,150, canvas.width, 100)

      ctx.fillStyle = "red"
      ctx.fillRect(char.x, char.y, 30,50)
      
      ctx.fillStyle = "green"
      ctx.fillRect(block1.x, block1.y, 20, 40)
      ctx.fillRect(block2.x, block2.y, 20, 40)
      block1.x -= .5
      block2.x -= .5
      if(block1.x == 0){
         block1.x = 750
      }
      if(block2.x == 0){
         block2.x = 800
      }
      requestAnimationFrame(update)
   }
      
   setInterval(update, 1000)
}

document.addEventListener("keyup", (e)=>{
   let up = false
   switch(e.key){
      case "ArrowUp":
         char.y -= char.velocity
         up = true
         console.log(e.code)
      break;
   }
})