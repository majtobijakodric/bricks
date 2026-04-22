import '../style/style.css'
import { setupPlanetBackground } from './background.js'
import { initializeAsteroids, resetPadPosition, resetRocketLaunchState } from './entities.js'
import { gameCanvas, setupCanvasSize } from './canvas.js'
import { startGameLoop } from './game.js'
import { renderScene } from './render.js'
import { ensurePlayerNameBeforeFirstPlay } from './score-history.js'
import { initializeUi } from './ui.js'

async function bootstrapGame() {
  initializeUi()
  setupPlanetBackground()
  await ensurePlayerNameBeforeFirstPlay()

  if (gameCanvas) {
    setupCanvasSize()
    resetPadPosition()
    resetRocketLaunchState()
    initializeAsteroids()
    renderScene()
    startGameLoop()
  }
}

void bootstrapGame()
