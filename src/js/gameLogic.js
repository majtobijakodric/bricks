export function countEffectFrames(state, ui, updateSpeeds) {
  // ability effects use frame counters instead of timeout ids.
  if (state.redPulse > 0) state.redPulse -= 1
  if (state.bluePulse > 0) state.bluePulse -= 1
  if (state.messageFrames > 0) state.messageFrames -= 1
  if (state.fuelPause > 0) state.fuelPause -= 1

  if (state.fuelDrainFrames > 0) state.fuelDrainFrames -= 1
  else state.fuelDrain = 1

  if (state.padSpeedFrames > 0) state.padSpeedFrames -= 1
  else state.padBoost = 1

  if (state.rocketSpeedFrames > 0) state.rocketSpeedFrames -= 1
  else state.rocketBoost = 1

  updateSpeeds()
  updateAbilities(state, ui)
}

export function burnFuel(state, fuelFill, maxFuel) {
  if (state.rocketStarted && state.fuelPause === 0) state.fuel -= 0.0017 * state.fuelDrain
  if (state.fuel < 0) state.fuel = 0
  fuelFill.style.transform = 'scaleY(' + state.fuel / maxFuel + ')'
}

export function checkAsteroids(state, rocket, maxFuel, ui) {
  for (let i = 0; i < state.asteroids.length; i += 1) {
    if (rocketTouches(state, rocket, state.asteroids[i])) {
      bounceFromAsteroid(rocket, state.asteroids[i])
      collectReward(state, state.asteroids[i], maxFuel)
      state.asteroids.splice(i, 1)
      updateScore(state, ui.scoreButton)
      updateAbilities(state, ui)
      return
    }
  }
}

export function checkEnd(state) {
  if (state.fuel <= 0) return false
  if (state.asteroids.length === 0) return true
  return null
}

export function finishGame(state, won, saveScore, showEndMenu, resetGame) {
  if (state.endWindowOpen) return
  state.gameOver = true
  state.endWindowOpen = true
  state.leftDown = false
  state.rightDown = false
  saveScore(state.score, state.mode, won)
  showEndMenu(won).then(() => { resetGame() })
}

export function resetGame(state, pad, width, height, maxFuel, rocks, callbacks) {
  state.paused = false
  state.gameOver = false
  state.rocketStarted = false
  state.leftDown = false
  state.rightDown = false
  state.score = 0
  state.fuel = maxFuel
  state.redCharges = 0
  state.blueCharges = 0
  state.redPulse = 0
  state.bluePulse = 0
  state.messageFrames = 0
  state.fuelPause = 0
  state.fuelDrainFrames = 0
  state.padSpeedFrames = 0
  state.rocketSpeedFrames = 0
  state.fuelDrain = 1
  state.padBoost = 1
  state.rocketBoost = 1
  state.endWindowOpen = false
  pad.x = width / 2 - pad.width / 2
  pad.y = height - pad.height - 10
  makeAsteroids(state, rocks)
  callbacks.updateSpeeds()
  callbacks.putRocketOnPad()
  updateScore(state, callbacks.ui.scoreButton)
  updateAbilities(state, callbacks.ui)
  callbacks.setPauseIcon()
  callbacks.burnFuel()
}

export function makeAsteroids(state, rocks) {
  state.asteroids = []

  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 12; column += 1) {
      const color = randomColor()
      state.asteroids.push({ x: 18 + column * 64, y: 15 + row * 48, width: 61, height: 45, color, image: rockImage(color, rocks) })
    }
  }
}

export function setMode(state, newMode, buttons, updateSpeeds) {
  state.mode = newMode
  if (state.mode === 'easy') {
    state.baseRocketSpeed = 4
    state.basePadSpeed = 3
  }
  if (state.mode === 'medium') {
    state.baseRocketSpeed = 5
    state.basePadSpeed = 4
  }
  if (state.mode === 'hard') {
    state.baseRocketSpeed = 7
    state.basePadSpeed = 6
  }
  if (state.mode === 'experimental') {
    state.baseRocketSpeed = 5
    state.basePadSpeed = 4
    buttons.rocketSpeedButton.hidden = false
    buttons.padSpeedButton.hidden = false
  } else {
    buttons.rocketSpeedButton.hidden = true
    buttons.padSpeedButton.hidden = true
  }
  updateSpeeds()
}

export function useRedAbility(state, ui, maxFuel) {
  if (state.redCharges <= 0 || state.paused || state.gameOver) return
  state.redCharges -= 1
  const number = Math.floor(Math.random() * 3) + 1

  // red abilities change fuel.
  if (number === 1) {
    state.fuelPause = 300
    showMessage(state, ui.messageBox, 'Fuel paused.')
  }
  if (number === 2) {
    state.fuel += 1
    showMessage(state, ui.messageBox, 'Fuel restored.')
  }
  if (number === 3) {
    state.fuelDrain = 0.45
    state.fuelDrainFrames = 480
    showMessage(state, ui.messageBox, 'Fuel drain slowed.')
  }

  if (state.fuel > maxFuel) state.fuel = maxFuel
  updateAbilities(state, ui)
}

export function useBlueAbility(state, ui, updateSpeeds) {
  if (state.blueCharges <= 0 || state.paused || state.gameOver) return
  state.blueCharges -= 1
  const number = Math.floor(Math.random() * 5) + 1

  // blue abilities change movement.
  if (number === 1) {
    state.padBoost = 1.75
    state.padSpeedFrames = 480
    showMessage(state, ui.messageBox, 'Pad speed boosted.')
  }
  if (number === 2) {
    state.rocketBoost = 0.72
    state.rocketSpeedFrames = 480
    showMessage(state, ui.messageBox, 'Rocket slowed.')
  }
  if (number === 3) {
    state.padBoost = 0.55
    state.padSpeedFrames = 480
    showMessage(state, ui.messageBox, 'Pad controls slowed.')
  }
  if (number === 4) {
    state.rocketBoost = 1.45
    state.rocketSpeedFrames = 480
    showMessage(state, ui.messageBox, 'Rocket overdrive.')
  }
  if (number === 5) {
    state.fuelDrain = 2.2
    state.fuelDrainFrames = 300
    showMessage(state, ui.messageBox, 'Fuel drain spiked.')
  }

  updateSpeeds()
  updateAbilities(state, ui)
}

export function updateAbilities(state, ui) {
  ui.redCount.textContent = state.redCharges
  ui.blueCount.textContent = state.blueCharges
  ui.redButton.disabled = state.redCharges === 0
  ui.blueButton.disabled = state.blueCharges === 0
  setAbilityStyle(ui.redButton, ui.redCount, state.redCharges, state.redPulse)
  setAbilityStyle(ui.blueButton, ui.blueCount, state.blueCharges, state.bluePulse)

  if (state.messageFrames === 0) {
    ui.messageBox.textContent = ''
    ui.messageBox.classList.remove('is-visible')
  }
}

export function updateScore(state, scoreButton) {
  scoreButton.textContent = 'Score: ' + state.score
  scoreButton.setAttribute('aria-label', 'Current score ' + state.score)
}

function rocketTouches(state, rocket, asteroid) {
  if (!state.rocketStarted) return false
  if (rocket.x + rocket.radius < asteroid.x) return false
  if (rocket.x - rocket.radius > asteroid.x + asteroid.width) return false
  if (rocket.y + rocket.radius < asteroid.y) return false
  if (rocket.y - rocket.radius > asteroid.y + asteroid.height) return false
  return true
}

function bounceFromAsteroid(rocket, asteroid) {
  const middleX = asteroid.x + asteroid.width / 2
  const middleY = asteroid.y + asteroid.height / 2
  const distanceX = Math.abs(rocket.x - middleX)
  const distanceY = Math.abs(rocket.y - middleY)

  if (distanceX > distanceY) {
    if (rocket.x < middleX) {
      rocket.dx = -Math.abs(rocket.dx)
      rocket.x = asteroid.x - rocket.radius
    } else {
      rocket.dx = Math.abs(rocket.dx)
      rocket.x = asteroid.x + asteroid.width + rocket.radius
    }
  } else {
    if (rocket.y < middleY) {
      rocket.dy = -Math.abs(rocket.dy)
      rocket.y = asteroid.y - rocket.radius
    } else {
      rocket.dy = Math.abs(rocket.dy)
      rocket.y = asteroid.y + asteroid.height + rocket.radius
    }
  }
}

function collectReward(state, asteroid, maxFuel) {
  if (asteroid.color === 'normal') state.score += 1

  if (asteroid.color === 'gray') {
    state.score += 3
    state.fuel += 1
  }

  if (asteroid.color === 'blue') {
    state.score += 5
    state.blueCharges += 1
    state.bluePulse = 45
  }

  if (asteroid.color === 'red') {
    state.score += 10
    state.redCharges += 1
    state.redPulse = 45
  }
  
  if (state.fuel > maxFuel) state.fuel = maxFuel
}

// get asteroids color
function randomColor() {
  const number = Math.floor(Math.random() * 100) + 1
  if (number <= 8) return 'red'
  if (number <= 22) return 'blue'
  if (number <= 40) return 'gray'
  return 'normal'
}

// return an image of an asteroid based on provided color and rocks
function rockImage(color, rocks) {
  const image = new Image()
  const index = Math.floor(Math.random() * 3)
  if (color === 'red') image.src = rocks.red[index]
  if (color === 'blue') image.src = rocks.blue[index]
  if (color === 'gray') image.src = rocks.gray[index]
  if (color === 'normal') image.src = rocks.normal[index]
  return image
}

function showMessage(state, messageBox, text) {
  messageBox.textContent = text
  messageBox.classList.add('is-visible')
  state.messageFrames = 190
}

function setAbilityStyle(button, count, charges, pulse) {
  if (charges > 0) {
    button.classList.add('is-charged', 'is-clickable')
    count.classList.add('is-visible')
  } else {
    button.classList.remove('is-charged', 'is-clickable')
    count.classList.remove('is-visible')
  }

  if (pulse > 0) button.classList.add('is-pulsing')
  else button.classList.remove('is-pulsing')
}
