const initGame = () => {
  var canvas;
  var canvasContext;
  var ballX = 15;
  var ballY = 15;
  var ballSpeedX = 5;
  var ballSpeedY = 5;
  var wallBorderGap = 4;
  window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var framesPerSecond = 30;
    setInterval(function () {
      moveGameBall();
      drawGameEverything();
    }, 1000 / framesPerSecond);
  };

  function drawGameEverything() {
    colorCanvasObject(0, 0, canvas.width, canvas.height, "black"); // black screen
    // colorCanvasObject(canvas.width / 2, canvas.height / 2, 1, 5, "white"); // game screen divider
    colorCanvasObject(0, 0, 10, 100, "white"); // user game paddle
    colorCanvasObject(canvas.width - 4, canvas.height - 25, 4, 25, "white"); // user game paddle
    gameBall();
  }

  function colorCanvasObject(leftX, topY, width, height, objectColor) {
    canvasContext.fillStyle = objectColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }

  function gameBall() {
    canvasContext.fillStyle = "yellow";
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 8, 0, Math.PI * 2, true);
    canvasContext.fill();
  }

  function moveGameBall() {
    changeDirection();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  }

  function changeDirection() {
    if (ballX > canvas.width - wallBorderGap || ballX < wallBorderGap) {
      ballSpeedX *= -1;
    }
    if (ballY > canvas.height - wallBorderGap || ballY < wallBorderGap) {
      ballSpeedY *= -1;
    }
  }
};

export { initGame };
