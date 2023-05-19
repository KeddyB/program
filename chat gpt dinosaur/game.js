// Game variables
let isJumping = false;
let isGameOver = false;
let score = 0;

// Elements
const dinosaur = document.getElementById('dinosaur');
const obstacle = document.getElementById('obstacle');

// Keyboard event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
  if (event.code === 'Space' && !isJumping && !isGameOver) {
    isJumping = true;
    jump();
  }
}

function handleKeyUp(event) {
  if (event.code === 'Space') {
    isJumping = false;
  }
}

// Jump function
function jump() {
  let position = 100;
  let timerId = setInterval(function () {
    // Move up
    if (position === 150) {
      clearInterval(timerId);
      let downTimerId = setInterval(function () {
        // Move down
        if (position === 100) {
          clearInterval(downTimerId);
          isJumping = false;
        }
        position -= 10;
        dinosaur.style.bottom = position + 'px';
      }, 20);
    }
    position += 10;
    dinosaur.style.bottom = position + 'px';
  }, 20);
}

// Game loop
function gameLoop() {
  if (!isGameOver) {
    // Move the obstacle
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    obstacle.style.left = (obstacleLeft - 4) + 'px';

    // Check collision
    if (obstacleLeft > 0 && obstacleLeft < 60 && parseInt(window.getComputedStyle(dinosaur).getPropertyValue('bottom')) < 56) {
      isGameOver = true;
      alert('Game Over! Your score: ' + score);
    }

    // Increase score
    if (obstacleLeft < -10) {
      score++;
    }

    // Repeat the game loop
    requestAnimationFrame(gameLoop);
  }
}

// Start the game loop
gameLoop();
