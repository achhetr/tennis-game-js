const initGame = () => {
  var canvas;
  var canvasContext;
  window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    drawBlackBackground(canvasContext);
    drawGameDivider(canvasContext);
  };

  function drawBlackBackground(canvasContext) {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawGameDivider(canvasContext) {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(canvas.width / 2, canvas.height / 2, 1, 5);
  }
};

export { initGame };
