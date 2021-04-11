const initGame = () => {
  var canvas;
  var canvasContext;
  var ballX = 15;
  var ballY = 15;
  var ballSpeedX = 5;
  var ballSpeedY = 5;
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
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = "white";
    canvasContext.fillRect(canvas.width / 2, canvas.height / 2, 1, 5);

    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 1, 4, 25);

    canvasContext.fillStyle = "yellow";
    canvasContext.fillRect(ballX, ballY, 4, 3);
  }

  function moveGameBall() {
    changeDirection();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  }

  function changeDirection() {
    if (ballX > canvas.width - 10 || ballX < 10) {
      ballSpeedX *= -1;
    }
    if (ballY > canvas.height - 10 || ballY < 10) {
      ballSpeedY *= -1;
    }
  }
};

export { initGame };
