import { asteroidLayoutConfig, canvasConfig, colorConfig, featureConfig } from './config.ts';

export let canvasHeight = canvasConfig.height;
export let canvasWidth = canvasConfig.width;

export const rocketColor = colorConfig.rocket;
export const padColor = colorConfig.pad;
export const backgroundColor = colorConfig.background;
export const asteroidColor = colorConfig.asteroid;

export const ASTEROID_AREA_OFFSET_X = asteroidLayoutConfig.offsetX;
export const ASTEROID_AREA_OFFSET_Y = asteroidLayoutConfig.offsetY;

export let isPaused = false;
export let isGameOver = false;
export let fuel = featureConfig.maxFuel;
export let hasHandledBottomMiss = false;

export const pad = {
  x: canvasWidth / 2 - 25,
  y: canvasHeight - 50,
  width: 100,
  height: 20,
  speed: 4,
};

export const rocket = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 10,
  speed: 5,
  dx: 0,
  dy: 0,
};

export const input = {
  left: false,
  right: false,
};

export const cell = {
  width: asteroidLayoutConfig.cell.width,
  height: asteroidLayoutConfig.cell.height,
  marginLeftRight: asteroidLayoutConfig.cell.marginLeftRight,
  marginTop: asteroidLayoutConfig.cell.marginTop,
  padding: asteroidLayoutConfig.cell.padding,
};

export const rows = asteroidLayoutConfig.rows;
export const columns = asteroidLayoutConfig.columns;

// Resets the fixed canvas size.
export function resetCanvasSize() {
  canvasWidth = canvasConfig.width;
  canvasHeight = canvasConfig.height;
}

// Places the rocket just above the paddle.
export function resetRocketPosition() {
  rocket.x = pad.x + pad.width / 2;
  rocket.y = pad.y - rocket.radius - 5;
}

// Puts the paddle back at the bottom center.
export function resetPadPosition() {
  pad.x = canvasWidth / 2 - pad.width / 2;
  pad.y = canvasHeight - pad.height - 10;
}

export function setPaused(value: boolean) {
  isPaused = value;
}

export function setGameOver(value: boolean) {
  isGameOver = value;
}

export function loseFuel(amount = 1) {
  fuel = Math.max(0, fuel - amount);
}

export function resetFuel() {
  fuel = featureConfig.maxFuel;
}

export function resetBottomMissState() {
  hasHandledBottomMiss = false;
}

export function markBottomMissHandled() {
  hasHandledBottomMiss = true;
}

export function setRocketVelocity(x: number, y: number) {
  rocket.dx = x;
  rocket.dy = y;
}
