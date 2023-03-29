let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")
let gBArrayHeight = 20
let gBArrayWidth = 12
let startX = 4
let startY = 0
let coordinateArray = [...Array(gBArrayHeight)].map(e=> Array(gBArrayWidth).fill(0))
let curTet = [[1,o],[0,1],[1,1],[2,1]]

class Coordinates{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}