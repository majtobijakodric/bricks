import rockUrl from '../assets/rock.png';
import { gameCanvas } from './canvas.ts';
import { bricks } from './bricks.ts';
import { ball, ballColor, pad, padColor } from './gameState.ts';

const rock = new Image();
rock.src = rockUrl;

export function renderScene() {
  if (!gameCanvas) {
    return;
  }

  const ctx = gameCanvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  renderBricks(ctx);

  // Pad
  ctx.fillStyle = padColor;
  ctx.fillRect(pad.x, pad.y, pad.width, pad.height);

  // Ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function renderBricks(ctx: CanvasRenderingContext2D) {
  bricks.forEach((brick) => {
    if (rock.complete && rock.naturalWidth > 0) {
      ctx.drawImage(rock, brick.x, brick.y, brick.width, brick.height);
      return;
    }

    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  });
}
