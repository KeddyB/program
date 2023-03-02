let img = new Image ()
img.src = "./flappybird.png"
window.onload = function(){
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    
    canvas.width = 360;
    canvas.height = 640;
    animate()
}
function animate(){
    ctx.fillStyle = "green"
    ctx.drawImage(img, 50, 320, 40, 28)
}