import Swal from 'sweetalert2'

// ... is a spread operator, it extedns the objects variables
// in this case it adds object variables from given variable options
export function showPopup(options) {
  return Swal.fire({
    ...options,
    background: '#111827',
    color: '#ffffff',
    confirmButtonColor: '#334155',
  })
}

export async function showEndMenu(won) {
  if (won) {
    await showPopup({ title: 'All asteroids cleared!', confirmButtonText: 'Play again', allowOutsideClick: false, allowEscapeKey: false })
  } else {
    await showPopup({ title: 'You are out of fuel.', text: 'Play again to restart.', confirmButtonText: 'Play again', allowOutsideClick: false, allowEscapeKey: false })
  }
}

export function showModeMenu(mode) {
  return showPopup({
    title: 'Select Mode',
    input: 'select',
    inputValue: mode,
    inputOptions: { easy: 'Easy', medium: 'Medium', hard: 'Hard', experimental: 'Experimental' },
    showCancelButton: true,
  })
}

export function showRocketSpeedMenu(baseRocketSpeed) {
  return showPopup({ title: 'Set Rocket Speed', input: 'range', inputValue: baseRocketSpeed, inputAttributes: { min: '1', max: '100', step: '1' }, showCancelButton: true })
}

export function showPadSpeedMenu(basePadSpeed) {
  return showPopup({ title: 'Set Pad Speed', input: 'range', inputValue: basePadSpeed, inputAttributes: { min: '1', max: '40', step: '1' }, showCancelButton: true })
}

export function showScoreMenu(html) {
  return showPopup({ title: 'Current Score', html, confirmButtonText: 'Close' })
}

export function showHelpMenu() {
  return showPopup({
    title: 'How to Play',
    html: '<div class="space-y-3 text-left text-sm leading-6"><p>Move with the left and right arrow keys.</p><p>Press space to launch the rocket.</p><p>Break asteroids, use ability charges, and keep fuel above zero.</p></div>',
    confirmButtonText: 'Close',
  })
}

export function showAboutMenu() {
  return showPopup({
    title: 'About',
    html: '<p>Author: Maj Tobija Kodric</p><a href="https://github.com/majtobijakodric/space-bricks" target="_blank" class="text-blue-500 hover:underline">GitHub</a>',
    confirmButtonText: 'Close',
  })
}

export function showWelcomeNameMenu() {
  return showPopup({
    title: 'Welcome! Enter your name',
    input: 'text',
    inputPlaceholder: 'Type your name',
    confirmButtonText: 'Save',
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: checkName,
  })
}

export function showChangeNameMenu(name) {
  return showPopup({
    title: 'Change player name',
    input: 'text',
    inputValue: name,
    inputPlaceholder: 'Type your name',
    confirmButtonText: 'Save',
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: checkName,
  })
}

export function checkName(value) {
  if (value.trim() === '') return 'Please type your name'
  return undefined
}
