import '../style/style.css';
import { initializeBackground } from './background.ts';
import './buttons.ts';
import { initializeRocketVelocity } from './rocket.ts';
import { gameCanvas, setupCanvasSize } from './canvas.ts';
import { initializeAsteroids } from './asteroids.ts';
import { setupEventListeners } from './events.ts';
import { startGameLoop } from './gameLoop.ts';
import { resetPadPosition, resetRocketPosition } from './gameState.ts';
import { renderScene } from './render.ts';
import { initializeUi } from './ui.ts';

initializeRocketVelocity();
initializeUi();

if (gameCanvas) {
  setupCanvasSize();
  resetPadPosition();
  resetRocketPosition();
  initializeBackground();
  initializeAsteroids();
  renderScene();
  startGameLoop();
}

setupEventListeners();
