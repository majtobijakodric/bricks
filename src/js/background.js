import planetOneSrc from '../assets/background/1.gif'
import planetTwoSrc from '../assets/background/2.gif'

const PLANETS = [planetOneSrc, planetTwoSrc, planetTwoSrc]
const MIN_SIZE = 96
const MAX_SIZE = 180
const MARGIN = 28
const MAX_ATTEMPTS = 48

let layer
let planets = []
let rafId = 0

export function setupPlanetBackground() {
  if (layer) return

  layer = document.createElement('div')
  layer.className = 'planet-background'
  layer.setAttribute('aria-hidden', 'true')

  planets = PLANETS.map((src) => {
    const img = document.createElement('img')
    img.className = 'planet-background__planet'
    img.src = src
    img.alt = ''
    img.draggable = false
    img.decoding = 'async'
    layer.append(img)
    return img
  })

  document.body.append(layer)

  const refresh = () => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(positionPlanets)
  }

  window.addEventListener('resize', refresh, { passive: true })
  refresh()
}

function positionPlanets() {
  const blockedRects = getBlockedRects().map((rect) => expandRect(rect, MARGIN))
  const placedRects = []
  const size = getPlanetSize()

  planets.forEach((img, index) => {
    const planetSize = Math.max(MIN_SIZE - index * 8, size - index * 12)
    const position = findOpenPosition(planetSize, blockedRects, placedRects)

    if (!position) {
      img.style.display = 'none'
      return
    }

    img.style.display = 'block'
    img.style.width = `${planetSize}px`
    img.style.height = `${planetSize}px`
    img.style.left = `${position.x}px`
    img.style.top = `${position.y}px`

    placedRects.push({
      left: position.x,
      top: position.y,
      right: position.x + planetSize,
      bottom: position.y + planetSize,
    })
  })
}

function getBlockedRects() {
  return [
    document.querySelector('#app .game-shell > div:first-child')?.getBoundingClientRect(),
    document.querySelector('#gameCanvas')?.getBoundingClientRect(),
  ].filter(Boolean)
}

function getPlanetSize() {
  const baseSize = Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.16)
  return clamp(baseSize, MIN_SIZE, MAX_SIZE)
}

function findOpenPosition(size, blockedRects, placedRects) {
  const maxX = window.innerWidth - size
  const maxY = window.innerHeight - size

  if (maxX < 0 || maxY < 0) {
    return null
  }

  const takenRects = [...blockedRects, ...placedRects]

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const candidate = {
      left: Math.floor(Math.random() * (maxX + 1)),
      top: Math.floor(Math.random() * (maxY + 1)),
      right: 0,
      bottom: 0,
    }
    candidate.right = candidate.left + size
    candidate.bottom = candidate.top + size

    if (takenRects.every((rect) => !intersects(candidate, rect))) {
      return { x: candidate.left, y: candidate.top }
    }
  }

  return null
}

function expandRect(rect, margin) {
  return {
    left: rect.left - margin,
    top: rect.top - margin,
    right: rect.right + margin,
    bottom: rect.bottom + margin,
  }
}

function intersects(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
