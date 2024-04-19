// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Difficulty and game length
let startSpeed = 3
let xInc = 0.5
let yInc = 0.2
//let endPoint = 11

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: startSpeed,
  dy: -startSpeed
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
  if (e.key == "o") {
    rightPaddle.dy = -rightPaddle.speed;
  } else if (e.key == "l") {
    rightPaddle.dy = rightPaddle.speed;
  }
  if (e.key == "w") {
    leftPaddle.dy = -leftPaddle.speed;
  } else if (e.key == "s") {
    leftPaddle.dy = leftPaddle.speed;
  }
}

function keyUpHandler(e) {
  if (e.key == "o" || e.key == "l") {
    rightPaddle.dy = 0;
  }
  if (e.key == "w" || e.key == "s") {
    leftPaddle.dy = 0;
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
    if (ball.dx < 0) {ball.dx = ball.dx - xInc} else {ball.dx = ball.dx + xInc}
    if (ball.dy < 0) {ball.dy = ball.dy - yInc} else {ball.dy = ball.dy + yInc}
    ball.dx = -ball.dx;
  }

  if (
    ball.x + ball.dx < leftPaddle.x + paddleWidth &&
    ball.x + ball.dx > leftPaddle.x &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + paddleHeight
  ) {
    if (ball.dx < 0) {ball.dx = ball.dx - xInc} else {ball.dx = ball.dx + xInc}
    if (ball.dy < 0) {ball.dy = ball.dy - yInc} else {ball.dy = ball.dy + yInc}
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
  if (ball.dx < 0) {ball.dx = startSpeed} else {ball.dx = -startSpeed}
  if (ball.dy > 0) {ball.dy = startSpeed} else {ball.dy = -startSpeed}
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

// Check to ensure paddles stay within bounds
function checkPaddleOOB() {
  if (rightPaddle.y < 0) {
    rightPaddle.y = 0;
  } else if (rightPaddle.y > canvas.height - paddleHeight) {
    rightPaddle.y = canvas.height - paddleHeight;
  }

  if (leftPaddle.y < 0) {
    leftPaddle.y = 0;
  } else if (leftPaddle.y > canvas.height - paddleHeight) {
    leftPaddle.y = canvas.height - paddleHeight;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Game loop
function gameLoop() {
  draw();
  moveBall(); 
  checkCollision();

  // Update paddle position
  rightPaddle.y += rightPaddle.dy;
  leftPaddle.y += leftPaddle.dy;
  checkPaddleOOB()

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

