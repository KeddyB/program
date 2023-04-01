let canvas
let ctx
let gBArrayHeight = 20
let gBArrayWidth = 12
let startX = 4
let startY = 0
let score = 0
let level = 1
let winOrLose = 'playing'
let tetrisLogo
let coordinateArray = [...Array(gBArrayHeight)].map(e=> Array(gBArrayWidth).fill(0))
let curTet = [[1,0],[0,1],[1,1],[2,1]]

let tetrominos = []
let tetrominoColors = ["purple", "cyan", "blue", "yellow", "orange", "green", "red"]

let curTetColor
let gameBoardArray = [...Array(gBArrayHeight)].map(e=> Array(gBArrayWidth).fill(0))

let stoppedShappedArray = [...Array(gBArrayHeight)].map(e=> Array(gBArrayWidth).fill(0))

let direction
let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}
class Coordinates{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}
document.addEventListener("DOMContentLoaded", SetupCanvas)

function CreateCoordArray(){
    let i = 0, j = 0
    for(let y = 9; y<=446; y+=23){
        for(let x = 11; x<=264; x+=23){
            coordinateArray[i][j] = new Coordinates(x, y)
            i++
        }
        j++
        i=0
    }
}
function SetupCanvas(){
    canvas = document.getElementById("canvas1")
    ctx = canvas.getContext("2d")
    canvas.width = 936
    canvas.height = 956

    ctx.scale(2,2)
    ctx.fillStyle = "white"
    ctx.fillRect(0,0, canvas.width, canvas.height)

    ctx.strokeStyle = "black"
    ctx.strokeRect(8, 8, 280, 462)
    
    document.addEventListener("keydown", (e)=>{
        if(winOrLose != "GameOver"){
            direction = DIRECTION.LEFT
            if(e.keyCode === 65){
                if(!HittingWall() && !checkForVerticalCollision()){
                DeleteTet()
                startX--
                DrawTetromino();
                }
            }
            else if(e.keyCode === 68){
                direction = DIRECTION.RIGHT
                if(!HittingWall() && !checkForVerticalCollision()){
                    DeleteTet()
                    startX++
                    DrawTetromino();
                }
            }
            else if(e.keyCode === 83){
                moveTetDown()
            }
        }
            
    })

    CreateTets()
    CreateTet()

    tetrisLogo = new Image()
    tetrisLogo.onload = DrawTetrisLogo
    tetrisLogo.src = "tetrislogo.jpg"

    ctx.fillStyle = "black"
    ctx.font = "21px Arial"
    ctx.fillText("Score", 300, 98)
    ctx.strokeRect(300, 107, 161, 24)

    ctx.fillText(score.toString(), 310, 127)

    ctx.fillText("LEVEL", 300, 157)
    ctx.strokeRect(300, 171, 161, 24)
    ctx.fillText(level.toString(), 310, 190)

    ctx.fillText("WIN / LOSE", 300, 223)
    ctx.fillText(winOrLose, 310, 261)
    ctx.strokeRect(300, 232, 161, 95)
    ctx.fillText("CONTROLS", 300, 354)
    ctx.strokeRect(300, 366, 161, 104)
    ctx.font = "19px Arial"
    ctx.fillText("A: Move Left", 310, 388)
    ctx.fillText("D: Move Right", 310, 413)
    ctx.fillText("S: Move Down", 310, 438)
    ctx.fillText("E: Rotate Left", 310, 463)

    CreateCoordArray()
    DrawTetromino()
}

function moveTetDown(){
    if(!checkForVerticalCollision()){ 
        direction = DIRECTION.DOWN
        DeleteTet()
        startY++
        DrawTetromino();
    }
}

function DrawTetrisLogo(){
    ctx.drawImage(tetrisLogo, 300, 8, 161, 54)
}
function DrawTetromino(){
    for(let i = 0; i < curTet.length; i++){
        let x = curTet[i][0] + startX
        let y = curTet[i][1] + startY
        gameBoardArray[x][y] = 1;
        let coorX = coordinateArray[x][y].x
        let coorY = coordinateArray[x][y].y
        ctx.fillStyle = curTetColor
        ctx.fillRect(coorX, coorY, 21, 21)
    }
}
function DeleteTet(){
    for(let i = 0; i < curTet.length; i++){
        let x = curTet[i][0] + startX
        let y = curTet[i][1] + startY
        gameBoardArray[x][y] = 0
        let coorX = coordinateArray[x][y].x
        let coorY = coordinateArray[x][y].y

        ctx.fillStyle = "white"
        ctx.fillRect(coorX, coorY, 21, 21)
    }
}
function CreateTets(){
    //push T
    tetrominos.push([[1,0],[0,1],[1,1],[2,1]])
    //push I
    tetrominos.push([[0,0],[1,0],[2,0],[3,0]])
    //push J
    tetrominos.push([[0,0],[0,1],[1,1],[2,1]])
    //push O
    tetrominos.push([[0,0],[1,0],[0,1],[1,1]])
    //push L
    tetrominos.push([[2,0],[0,1],[1,1],[2,1]])
    //push S
    tetrominos.push([[1,0],[2,0],[0,1],[1,1]])
    //push Z
    tetrominos.push([[0,0],[1,0],[1,1],[2,1]])
    
}
function CreateTet(){
    let randomTet = Math.floor(Math.random() * tetrominos.length)
    curTet = tetrominos[randomTet]
    curTetColor = tetrominoColors[randomTet]
}

function HittingWall(){
    for(let i = 0; i < curTet.length; i++){
        let newX = curTet[i][0] + startX
        if(newX <= 0 && direction === DIRECTION.LEFT){
            return true
        }
        else if(newX >= 11 && direction === DIRECTION.RIGHT){
            return true
        }
    }
    return false
}
function checkForVerticalCollision(){
    let tetrominoCopy = curTet
    let collision =false
    for(let i = 0; i < tetrominoCopy.length; i++){
        let square = tetrominoCopy[i];
        let x = square[0] + startX
        let y = square[0] + startY

        if(direction === DIRECTION.DOWN){
            y++
        }
        if(gameBoardArray[x][y+1]){
            if(typeof stoppedShappedArray[x][y+1] ==="string"){
                DeleteTet()
                startY++
                DrawTetromino()
                collision = true
                break;
            }
            if(y>=20){
                collision = true
                break;
            }
            if(collision){
                if(startY <= 2){
                    winOrLose = "GameOver"
                    ctx.fillStyle = "white"
                    ctx.fillRect(310, 242, 140, 30)
                    ctx.fillStyle = "black"
                    ctx.fillText(winOrLose, 310, 261)
                }
                else{
                    for(let i = 0; i < tetrominoCopy.length; i++){
                        let square = tetrominoCopy[i]
                        let x = square[0] + startX
                        let y = square[0] + startY
                        stoppedShappedArray[x][y] = curTetColor
                    }
                    CheckForCompletedRows()
                }
            }
        }
    }
}