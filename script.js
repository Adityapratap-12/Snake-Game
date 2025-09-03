let board = document.querySelector(".board");
let scoreDisplay = document.getElementById("score");

let foodX, foodY;
let snake = [{ x: 7, y: 7 }]; // start in middle
let velocityX = 0;
let velocityY = 0;
let score = 0;
let gameInterval;
let gameStarted = false;

function randomPosition() {
  foodX = Math.floor(Math.random() * 14) + 1;
  foodY = Math.floor(Math.random() * 14) + 1;
}

function changeDirection(dir) {
  if (!gameStarted) {
    gameInterval = setInterval(main, 200); // start moving only after first input
    gameStarted = true;
  }

  if (dir === "Up" && velocityY !== 1) {
    velocityX = 0; velocityY = -1;
  }
  else if (dir === "Down" && velocityY !== -1) {
    velocityX = 0; velocityY = 1;
  }
  else if (dir === "Left" && velocityX !== 1) {
    velocityX = -1; velocityY = 0;
  }
  else if (dir === "Right" && velocityX !== -1) {
    velocityX = 1; velocityY = 0;
  }
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") changeDirection("Up");
  if (e.key === "ArrowDown") changeDirection("Down");
  if (e.key === "ArrowLeft") changeDirection("Left");
  if (e.key === "ArrowRight") changeDirection("Right");
});

function main() {
  let head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

  // Game over if snake hits wall
  if (head.x <= 0 || head.x > 14 || head.y <= 0 || head.y > 14) {
    return gameOver();
  }

  // Game over if snake hits itself
  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) {
      return gameOver();
    }
  }

  snake.unshift(head);

  // If snake eats food
  if (head.x === foodX && head.y === foodY) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    randomPosition();
  } else {
    snake.pop(); // remove tail
  }

  drawBoard();
}

function drawBoard() {
  let setHtml = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
  snake.forEach((part, index) => {
    setHtml += `<div class="${index === 0 ? "snake-head" : "snake"}" style="grid-area: ${part.y}/${part.x};"></div>`;
  });
  board.innerHTML = setHtml;
}

function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Final Score: " + score);
  location.reload();
}

// Start setup
randomPosition();
drawBoard();
