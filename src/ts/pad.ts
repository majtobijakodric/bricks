import { pad, canvasWidth } from './gameState.ts';

export function movePad(x: number) {
  pad.x = Math.max(0, Math.min(canvasWidth - pad.width, x));
}

export function movePadBy(x: number) {
  movePad(pad.x + x);
}

export function setPadSpeed(speed: number) {
  pad.speed = speed;
}
