import '../style/style.css'
import { setupPlanetBackground } from './background.js'
import { initializeAsteroids, resetPadPosition, resetRocketLaunchState } from './entities.js'
import { gameCanvas, setupCanvasSize } from './canvas.js'
import { startGameLoop } from './game.js'
import { renderScene } from './render.js'
import { initializeUi } from './ui.js'

initializeUi()
setupPlanetBackground()

if (gameCanvas) {
  setupCanvasSize()
  resetPadPosition()
  resetRocketLaunchState()
  initializeAsteroids()
  renderScene()
  startGameLoop()
}
