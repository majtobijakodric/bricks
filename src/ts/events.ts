import { initializeBallVelocity } from './ball.ts';
import { gameCanvas, setupCanvasSize } from './canvas.ts';
import { initializeBricks } from './bricks.ts';
import { ball, input, pad, setViewportSize, canvasHeight, canvasWidth } from './gameState.ts';
import { movePad } from './pad.ts';
import { renderScene } from './render.ts';

export function setupEventListeners() {
  addEventListener('keydown', (event) => {
    const step = pad.speed;

    switch (event.key) {
      case 'ArrowLeft': {
        movePad(pad.x - step);
        input.left = true;
        renderScene();
        break;
      }
      case 'ArrowRight': {
        movePad(pad.x + step);
        input.right = true;
        renderScene();
        break;
      }
    }
  });

  addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') input.left = false;
    if (event.key === 'ArrowRight') input.right = false;
  });

  addEventListener('resize', () => {
    setViewportSize();
    setupCanvasSize();
    initializeBricks();

    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
    pad.x = canvasWidth / 2 - pad.width / 2;
    pad.y = canvasHeight - pad.height - 10;

    initializeBallVelocity();

    if (gameCanvas) {
      renderScene();
    }
  });
}
