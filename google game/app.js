let x = 120
let y= 105

window.onload = function(){
   canvas = document.querySelector(".canvas")
   ctx = canvas.getContext("2d")

   canvas.width = 800
   canvas.height = 200
   ctx.fillRect(0,150, canvas.width, 100)

   function moveChar(){
      document.addEventListener("keydown", (e)=>{
         if(e.key == "ArrowUp" || e.key == "Spaace"){
            y -= 10
            console.log(e.key)
         }
      })
   }
   function update(){
      requestAnimationFrame(update)
      ctx.fillStyle = "red"
      ctx.fillRect(x, y, 30,50)
      moveChar()
   }
   update()
}

