const gameBoard = document.getElementById("gameBoard")
const ctx = gameBoard.getContext("2d")
const resetBtn = document.getElementById("resetBtn")
const scoreText = document.getElementById("scoreText")
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = "forestgreen"
const paddlecolor1 = "lightblue"
const paddlecolor2 = "red"
const paddleBorder = "black"
const ballColor = "yellow"
const ballBorderColor = "black"
const ballRadius = 12.5
const paddleSpeed = 50
let intervalID;
let ballSpeed = 1
let ballX = gameWidth/2
let ballY = gameHeight/2
let ballXDirection = 0
let ballYDirection = 0
let player1Score = 0
let player2Score = 0
let paddle1 = {
   width: 25,
   height: 100,
   x: 0,
   y: 0
}