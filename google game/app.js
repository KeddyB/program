let x = 120
let y = 105

window.onload = function(){
   canvas = document.querySelector(".canvas")
   ctx = canvas.getContext("2d")
   canvas.width = 800
   canvas.height = 200

   function update(){
      requestAnimationFrame(update)
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0,150, canvas.width, 100)

      ctx.fillStyle = "red"
      ctx.fillRect(x, y, 30,50)
      
      moveChar()
   }
   function moveChar(){
      document.addEventListener("keydown", (e)=>{
         if(e.key == "ArrowUp" || e.key == "Spaace"){
            y -= 10
            console.log(e.key)
         }
      })
      
   }
   setInterval(update, 100)
}

