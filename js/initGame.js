const initGame = () => {
  const wallBorderGap = 4;
  const paddleHeight = 100;
  var canvas;
  var canvasContext;
  var ballX = 15;
  var ballY = 15;
  var ballSpeedX = 5;
  var ballSpeedY = 5;
  var paddleWidth = 10;
  var userPaddle = 0;
  var computerPaddle = 0;

  window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var framesPerSecond = 30;
    setInterval(function () {
      moveGameBall();
      drawGameEverything();
    }, 1000 / framesPerSecond);
    canvas.addEventListener("mousemove", function (evt) {
      var mousePos = calculateMousePosition(evt);
      userPaddle = mousePos.y - paddleHeight / 2;
      computerPaddle = mousePos.y - paddleHeight / 2;
    });
  };

  function ballReset() {
    ballSpeedX *= -1;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  function calculateMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY,
    };
  }

  function drawGameEverything() {
    colorCanvasObject(0, 0, canvas.width, canvas.height, "black"); // black screen
    colorCanvasObject(0, userPaddle, paddleWidth, paddleHeight, "white"); // left user game paddle
    colorCanvasObject(
      canvas.width - paddleWidth,
      computerPaddle,
      paddleWidth,
      paddleHeight,
      "white"
    ); // right computer game paddle
    gameBall(ballX, ballY, 10, "yellow");
  }

  function colorCanvasObject(leftX, topY, width, height, objectColor) {
    canvasContext.fillStyle = objectColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }

  function gameBall(centerX, centerY, radius, ballColor) {
    canvasContext.fillStyle = ballColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }

  function moveGameBall() {
    changeDirection();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  }

  function changeDirection() {
    if (ballX < wallBorderGap) {
      if (ballY > userPaddle && ballY < userPaddle + paddleHeight) {
        ballSpeedX *= -1;
      } else {
        ballReset();
      }
    } else if (ballX > canvas.width - wallBorderGap) {
      if (ballY > computerPaddle && ballY < computerPaddle + paddleHeight) {
        ballSpeedX *= -1;
      } else {
        ballReset();
      }
    }
    if (ballY > canvas.height - wallBorderGap || ballY < wallBorderGap) {
      ballSpeedY *= -1;
    }
  }
};

export { initGame };
