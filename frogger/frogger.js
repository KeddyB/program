const displayTimeLeft = document.querySelector('#time-left')
const displayResult = document.querySelector('#result')
const startButton = document.querySelector('#start-pause')
const squares = document.querySelectorAll('.grid div')

const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsRight = document.querySelectorAll('.car-right')
const carsLeft = document.querySelectorAll('.car-left')
const width = 9
let timerId
let timerIdWinLose
let currentTime = 20

let frogPosition = 76
//to move frog
function moveFrog(e){
    squares[frogPosition].classList.remove('frog')
    switch(e.key){
        case 'ArrowLeft':
            if(frogPosition % width !==0) frogPosition -= 1
        break;
        case 'ArrowRight':
            if((frogPosition % width) < 8) frogPosition += 1
        break;
        case 'ArrowUp':
            if((frogPosition - width) >= 0) frogPosition -=width
        break;
        case 'ArrowDown':
            if((frogPosition+width) < 81)frogPosition+=width
        break;
    
    }
    squares[frogPosition].classList.add('frog')
}

function moveLogsLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
        break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
        break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
        break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
        break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
        break
   }
}



// for movning logs to the right

function moveLogsRight(logRight){
    switch(true){
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
        break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
        break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
        break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
        break
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
        break
   }
}


// function to move the cars left and right

function moveCarsLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
        break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
        break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
        break
   }
}

function moveCarsRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
        break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
        break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
        break
   }
}

//auto move logs and cars
function autoMoveElements(){
    currentTime--
    displayTimeLeft.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogsLeft(logLeft))
    logsRight.forEach(logRight => moveLogsRight(logRight))
    carsLeft.forEach(carLeft => moveCarsLeft(carLeft))
    carsRight.forEach(carRight => moveCarsRight(carRight))
}

//function for game over

function gameOver(){
    if 
    (
        squares[frogPosition].classList.contains('c1') || 
        squares[frogPosition].classList.contains('l4') || 
        squares[frogPosition].classList.contains('l5') ||
        (currentTime === 0)
    )
    {
        displayResult.textContent = 'Game Over'
        clearInterval(timerId)
        squares[frogPosition].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}
//check for win
function youWin(){
    if(squares[frogPosition].classList.contains('ending-block'))
        {
            displayResult.textContent = 'You WON'
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
}

//check for win or lose
function autoWinLose(){
    gameOver()
    youWin()
}
startButton.addEventListener('click', ()=>{
    if (timerId, timerIdWinLose){
        clearInterval(timerId)
        clearInterval(timerIdWinLose)
        timerId = null
        timerIdWinLose = null
        document.removeEventListener('keyup', moveFrog)
    }
    else {
        timerId = setInterval(autoMoveElements, 1000)
        timerIdWinLose = setInterval(autoWinLose, 10)
        document.addEventListener('keyup', moveFrog)
    }
})