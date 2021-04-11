const initGame = () => {
  const wallBorderGap = 4;
  const paddleHeight = 100;
  const winningScore = 10;
  const defaultBallSpeedX = 5;
  const defaultBallSpeedY = 4;
  const yRatioSpeedWhenHit = 0.1;
  var canvas;
  var restartBtn;
  var canvasContext;
  var ballX = 15;
  var ballY = 15;
  var ballSpeedX = defaultBallSpeedX;
  var ballSpeedY = defaultBallSpeedY;
  var paddleWidth = 10;
  var userPaddle = 0;
  var computerPaddle = 0;
  var playerScore = 0;
  var computerScore = 0;
  var gamePlayMode = true;

  window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    restartBtn = document.querySelector(".game-restart");
    restartBtn.classList.add("hide");
    canvasContext = canvas.getContext("2d");
    var framesPerSecond = 30;
    setInterval(function () {
      if (gamePlayMode) {
        computerMovement();
        moveGameBall();
        drawGameEverything();
      }
    }, 1000 / framesPerSecond);
    canvas.addEventListener("mousemove", function (evt) {
      var mousePos = calculateMousePosition(evt);
      userPaddle = mousePos.y - paddleHeight / 2;
    });
  };

  function ballReset() {
    if (playerScore === winningScore || computerScore === winningScore) {
      playerScore = 0;
      computerScore = 0;
      gamePlayMode = false;
      restartBtn.classList.remove("hide");
    }

    ballSpeedX = defaultBallSpeedX;
    ballSpeedY = defaultBallSpeedY;
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
    var checkWinner = playerScore > computerScore;
    var playerScoreLabel =
      checkWinner && !gamePlayMode ? "Winner" : playerScore;
    var computerScoreLabel =
      !checkWinner && !gamePlayMode ? "Winner" : computerScore;

    colorCanvasObject(0, 0, canvas.width, canvas.height, "black"); // black screen
    colorCanvasObject(0, userPaddle, paddleWidth, paddleHeight, "white"); // left user game paddle
    colorCanvasObject(
      canvas.width - paddleWidth,
      computerPaddle,
      paddleWidth,
      paddleHeight,
      "white"
    ); // right computer game paddle
    gameBall(ballX, ballY, 10, "yellow"); // game ball
    canvasContext.font = "48px serif";
    canvasContext.fillText(playerScoreLabel, 100, canvas.height / 2);
    canvasContext.fillText(
      computerScoreLabel,
      canvas.width - 100,
      canvas.height / 2
    );
    drawNet();
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

  function computerMovement() {
    var computerPaddleCenterY = computerPaddle + paddleHeight / 2;
    if (computerPaddleCenterY < ballY - 35) {
      computerPaddle += 6;
    } else if (computerPaddleCenterY > ballY + 35) {
      computerPaddle -= 6;
    }
  }

  function changeDirection() {
    if (ballY > canvas.height - wallBorderGap || ballY < wallBorderGap) {
      ballSpeedY *= -1;
    }

    if (ballX < wallBorderGap) {
      if (ballY > userPaddle && ballY < userPaddle + paddleHeight) {
        ballSpeedX *= -1;
        var ballPositionRelativeToPaddle =
          (ballY - (userPaddle + paddleHeight / 2)) * yRatioSpeedWhenHit;
        ballSpeedY += ballPositionRelativeToPaddle;
      } else {
        computerScore++;
        ballReset();
      }
    } else if (ballX > canvas.width - wallBorderGap) {
      if (ballY > computerPaddle && ballY < computerPaddle + paddleHeight) {
        ballSpeedX *= -1;
        var ballPositionRelativeToPaddle =
          (ballY - (computerPaddle + paddleHeight / 2)) * yRatioSpeedWhenHit;
        ballSpeedY += ballPositionRelativeToPaddle;
      } else {
        playerScore++;
        ballReset();
      }
    }
  }

  function drawNet() {
    for (let index = 0; index < canvas.height; index += 40) {
      colorCanvasObject(canvas.width / 2 - 1, index, 2, 20, "white");
    }
  }
};

export { initGame };
