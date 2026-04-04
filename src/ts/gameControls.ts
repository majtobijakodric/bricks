import { initializeRocketVelocity } from './rocket.ts';
import { initializeAsteroids } from './asteroids.ts';
import { startGameLoop } from './gameLoop.ts';
import { renderScene } from './render.ts';
import { input, resetRocketPosition, resetBottomMissState, resetFuel, resetPadPosition, setGameOver, setPaused } from './gameState.ts';
import { resetGameOverModalState, updateFuelTankLevel } from './ui.ts';

export function pauseGame() {
  setPaused(true);
  input.left = false;
  input.right = false;
}

export function resumeGame() {
  setPaused(false);
}

export function restartGame() {
  setGameOver(false);
  setPaused(false);
  input.left = false;
  input.right = false;

  resetFuel();
  resetBottomMissState();
  resetPadPosition();
  resetRocketPosition();
  initializeAsteroids();
  initializeRocketVelocity();
  resetGameOverModalState();
  updateFuelTankLevel(1);

  renderScene();
  startGameLoop();
}
