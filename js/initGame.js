const initGame = () => {
  var canvas;
  var canvasContext;
  var ballX = 100;
  var ballY = 100;
  window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    drawBlackBackground(canvasContext);
    drawGameDivider(canvasContext);
    ballX = 100;
    ballY = 100;
    drawGameBall(canvasContext, ballX, ballY);
  };

  function drawBlackBackground(canvasContext) {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawGameDivider(canvasContext) {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(canvas.width / 2, canvas.height / 2, 1, 5);
  }

  function drawGameBall(canvasContext, ballX, ballY) {
    ballX += Math.floor(Math.random() * 100);
    ballY += Math.floor(Math.random() * 100);
    canvasContext.fillStyle = "yellow";
    canvasContext.fillRect(ballX, ballY, 4, 3);
  }
};

export { initGame };
