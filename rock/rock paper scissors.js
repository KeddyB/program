const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))
function generateComputerChoice(){
    const randomNumber = Math.floor(Math.random() * possibleChoices.length ) + 1 //since the possible choices is 3 you can just change the possible choice to 3

    if (randomNumber === 1){
    computerChoice = 'rock'
    } 
    if(randomNumber === 2){
    computerChoice = 'paper'
    }
    if(randomNumber ===3) {
    computerChoice = 'scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}
function getResult(){
    if (computerChoice===userChoice){
        result = 'its a draw'
    }
    if (computerChoice==='rock' && userChoice==="paper"){
        result = 'User wins'
    }
    if (computerChoice==='rock' && userChoice==="scissors"){
        result = 'computer wins'
    }
    if (computerChoice==='paper' && userChoice==="rock"){
        result = 'computer wins'
    }
    if (computerChoice==='paper' && userChoice==="scissors"){
        result = 'user wins'
    }
    if (computerChoice==='scissors' && userChoice==="rock"){
        result = 'user wins'
    }
    if (computerChoice==='scissors' && userChoice==="paper"){
        result = 'computer wins'
    }
    resultDisplay.innerHTML = result   
}