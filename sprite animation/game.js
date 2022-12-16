const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src =''


function animate(){
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "red"
    ctx.fillRect( x, 45, 100, 100);
    
    requestAnimationFrame(animate)
}
animate()