canvas = document.querySelector(".canvas")
ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 200

var char = {
   x: 120,
   y: 105
}

ctx.fillRect(0,150, canvas.width, 100)

ctx.fillStyle = "red"
ctx.fillRect(char.x,char.y, 30,50)

function moveChar(){
   document.addEventListener(onkeydown, (e)=>{

      char.y += 2
   })
   requestAnimationFrame(moveChar)
}