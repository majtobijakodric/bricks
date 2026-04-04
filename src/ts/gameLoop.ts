import { gameCanvas } from './canvas.ts';
import { handleAsteroidCollisions, handlePadCollision, handleWallCollisions, updateRocketPosition } from './rocket.ts';
import { featureConfig } from './config.ts';
import { fuel, input, isGameOver, isPaused, loseFuel, pad, setGameOver } from './gameState.ts';
import { movePadBy } from './pad.ts';
import { renderScene } from './render.ts';
import { showGameOverModal, updateFuelTankLevel } from './ui.ts';

let lastActiveTimestamp: number | null = null;

function animateFrame(timestamp: number) {
  if (!gameCanvas) {
    return;
  }

  if (isPaused) {
    lastActiveTimestamp = null;
    renderScene();
    requestAnimationFrame(animateFrame);
    return;
  }

  if (isGameOver) {
    lastActiveTimestamp = null;
    renderScene();
    return;
  }

  const deltaMs = lastActiveTimestamp === null ? 0 : Math.min(timestamp - lastActiveTimestamp, 100);
  lastActiveTimestamp = timestamp;

  if (deltaMs > 0) {
    loseFuel((deltaMs / 1000) * featureConfig.fuelBurnPerSecond);
  }

  if (input.left) {
    movePadBy(-pad.speed);
  }

  if (input.right) {
    movePadBy(pad.speed);
  }

  updateRocketPosition();
  handleWallCollisions();

  updateFuelTankLevel(fuel / featureConfig.maxFuel);

  if (fuel === 0) {
    setGameOver(true);
    renderScene();
    void showGameOverModal();
    return;
  }

  if (isGameOver) {
    renderScene();
    return;
  }

  handlePadCollision();
  handleAsteroidCollisions();

  renderScene();
  requestAnimationFrame(animateFrame);
}

export function startGameLoop() {
  requestAnimationFrame(animateFrame);
}
