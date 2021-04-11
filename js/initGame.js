const initGame = () => {
  var canvas;
  var canvasContext;
  var ballX = 0;
  var ballY = 0;
  var ballSpeedX = 5;
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
  }

  function changeDirection() {
    if (ballX > canvas.width || ballX < 0) {
      ballSpeedX *= -1;
    }
  }
};

export { initGame };
