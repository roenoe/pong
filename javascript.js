// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: -2
};

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 60;
let leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0,
    speed: 5
};
let rightPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0,
    speed: 5
};

// Score
let leftScore = 0;
let rightScore = 0;

// Event listeners for paddle movement
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "ArrowUp") {
        rightPaddle.dy = -rightPaddle.speed;
    } else if (e.key == "ArrowDown") {
        rightPaddle.dy = rightPaddle.speed;
    }
}

function keyUpHandler(e) {
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        rightPaddle.dy = 0;
    }
}

// Collision detection
function checkCollision() {
    // Wall collision
    if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }

    // Paddle collision
    if (
        ball.x + ball.dx > rightPaddle.x &&
        ball.x + ball.dx < rightPaddle.x + paddleWidth &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight
    ) {
        ball.dx = -ball.dx;
    }

    if (
        ball.x + ball.dx < leftPaddle.x + paddleWidth &&
        ball.x + ball.dx > leftPaddle.x &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + paddleHeight
    ) {
        ball.dx = -ball.dx;
    }

    // Score update
    if (ball.x + ball.dx > canvas.width) {
        leftScore++;
        resetBall();
    } else if (ball.x + ball.dx < 0) {
        rightScore++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
}

// Draw objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

    // Draw paddles
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

    // Draw scores
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Player 1: " + leftScore, 20, 20);
    ctx.fillText("Player 2: " + rightScore, canvas.width - 120, 20);
}

// Game loop
function gameLoop() {
  draw();
  moveBall(); // New addition: Call function to move the ball
  checkCollision();

  // Update paddle position
  rightPaddle.y += rightPaddle.dy;

  // Ensure paddles stay within canvas bounds
  if (rightPaddle.y < 0) {
      rightPaddle.y = 0;
  } else if (rightPaddle.y > canvas.height - paddleHeight) {
      rightPaddle.y = canvas.height - paddleHeight;
  }

  requestAnimationFrame(gameLoop);
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Start the game loop
gameLoop();

