import './style.css';

const gameCanvas = document.querySelector<HTMLCanvasElement>('#gameCanvas');

let viewHeight = window.innerHeight;
let viewWidth = window.innerWidth;

// Game pad properties
let padSize = {
  x: viewWidth / 2 - 25,
  y: viewHeight - 50,
  width: 50,
  height: 20,
  speed: 20
};

if (gameCanvas) {
  gameCanvas.width = viewWidth;
  gameCanvas.height = viewHeight;
  gameCanvas.style.width = `${viewWidth}px`;
  gameCanvas.style.height = `${viewHeight}px`;
  gameCanvas.style.backgroundColor = 'lightgray';
  spawnPad(gameCanvas);
}

function spawnPad(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(padSize.x, padSize.y, padSize.width, padSize.height);
  }
}

function movePad(x: number) {
  if (!gameCanvas) {
    return;
  }

  padSize.x = Math.max(0, Math.min(viewWidth - padSize.width, x));
  spawnPad(gameCanvas);
}


addEventListener("keydown", (event) => {
  const step = padSize.speed;
  switch (event.key) {
    case "ArrowLeft": {
      const targetX = Math.max(0, padSize.x - step);
      movePad(targetX);
      break;
    }
    case "ArrowRight": {
      const targetX = Math.min(viewWidth - padSize.width, padSize.x + step);
      movePad(targetX);
      break;
    }
  }
});

addEventListener("resize", () => {

  // Update height and width variables
  viewHeight = window.innerHeight;
  viewWidth = window.innerWidth;

  // Set canvas to full screen
  if (gameCanvas) {
    gameCanvas.width = viewWidth;
    gameCanvas.height = viewHeight;
    gameCanvas.style.width = `${viewWidth}px`;
    gameCanvas.style.height = `${viewHeight}px`;
    spawnPad(gameCanvas);
  }
});
