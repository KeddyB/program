let x = 120
let y = 105

window.onload = function(){
   canvas = document.querySelector(".canvas")
   ctx = canvas.getContext("2d")
   canvas.width = 800
   canvas.height = 200

   function update(){
      ctx.fillStyle = "black"
      ctx.fillRect(0,150, canvas.width, 100)

      ctx.fillStyle = "red"
      ctx.fillRect(x, y, 30,50)
      
      requestAnimationFrame(update)
   }
      
   setInterval(update, 100)
}
document.addEventListener("keyup", (e)=>{
   switch(e.key){
      case "ArrowUp":
         y -= 40
         console.log(e.code)
      break;
   }
})

