const gameBoard = document.getElementById("game-board");
const player = document.getElementById("player");
const score = document.getElementById("score");

let playerLeft = 50;
let playerSpeed = 10;
let isJumping = false;
let jumpSpeed = 20;
let isGameOver = false;
let scoreValue = 0;

function jump() {
  if (!isJumping) {
    isJumping = true;
    let jumpInterval = setInterval(() => {
      if (player.offsetTop <= 100) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(() => {
          if (player.offsetTop >= 0) {
            player.style.bottom = player.offsetTop - playerSpeed + "px";
          } else {
            clearInterval(fallInterval);
            isJumping = false;
          }
        }, 20);
      } else {
        player.style.bottom = player.offsetTop + jumpSpeed + "px";
      }
    }, 20);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = Math.random() * 80 + 10 + "%";
  gameBoard.appendChild(obstacle);
  let obstacleInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(obstacleInterval);
      return;
    }
    if (obstacle.offsetTop <= 0) {
      obstacle.remove();
      scoreValue++;
      score.textContent = "Score: " + scoreValue;
    } else if (
      obstacle.offsetLeft === playerLeft &&
      obstacle.offsetTop >= player.offsetTop - 50
    ) {
      clearInterval(obstacleInterval);
      isGameOver = true;
      alert("Game over! Your score is " + scoreValue);
      window.location.reload();
    } else {
      obstacle
    }
});
}    //