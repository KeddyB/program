let canvas
let ctx
let gBArrayHeight = 20
let gBArrayWidth = 12
let startX = 4
let startY = 0
let score = 0
let level = 1
let winOrLose = 'playing'
let coordinateArray = [...Array(gBArrayHeight)].map(e=> Array(gBArrayWidth).fill(0))
let curTet = [[1,0],[0,1],[1,1],[2,1]]

let tetrominos = []
let tetrominoColors = ["purple", "cyan", "blue", "yellow", "orange", "green", "red"]

let curTetColor
let gameBoardArray = [...Array(gBArrayHeight)].map(e=> Array(gBArrayWidth).fill(0))

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
        console.log(e.keyCode)
        direction = DIRECTION.LEFT
        if(e.keyCode === 65){
            if(!HittingWall()){
            DeleteTet()
            startX--
            DrawTetromino();
            }
        }
        else if(e.keyCode === 68){
            direction = DIRECTION.RIGHT
            if(!HittingWall()){
                DeleteTet()
                startX++
                DrawTetromino();
            }
        }
        else if(e.keyCode === 83){
            direction = DIRECTION.DOWN
            if(!HittingWall()){
                DeleteTet()
                startY++
                DrawTetromino();
            }
        }
    })

    CreateTets()
    CreateTet()

    CreateCoordArray()
    DrawTetromino()
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