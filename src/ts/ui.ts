import Swal from 'sweetalert2';

import { modeConfig } from './config.ts';
import { restartGame } from './gameControls.ts';

const swalTheme = {
  background: '#111827',
  color: '#ffffff',
  confirmButtonColor: '#334155',
};

const modeText = document.querySelector<HTMLParagraphElement>('#modeText');
const pauseButton = document.querySelector<HTMLButtonElement>('#pauseButton');
const fuelTankFill = document.querySelector<HTMLDivElement>('#fuelTankFill');
let gameOverShown = false;

// Updates the mode text.
export function updateModeText(mode: string) {
  if (!modeText) {
    return;
  }

  const label = mode.charAt(0).toUpperCase() + mode.slice(1);
  modeText.textContent = `Mode: ${label}`;
}

// Updates the pause button text.
export function updatePauseButtonText(isPaused: boolean) {
  if (!pauseButton) {
    return;
  }

  pauseButton.title = isPaused ? 'Resume' : 'Pause';
  pauseButton.setAttribute('aria-label', pauseButton.title);
}

export function updateFuelTankLevel(remainingRatio: number) {
  if (!fuelTankFill) {
    return;
  }

  const clampedRatio = Math.max(0, Math.min(1, remainingRatio));
  fuelTankFill.style.transform = `scaleY(${clampedRatio})`;
}

// Sets the first UI values.
export function initializeUi() {
  updateModeText(modeConfig.defaultMode);
  updatePauseButtonText(false);
  updateFuelTankLevel(1);
}

export async function showGameOverModal() {
  if (gameOverShown) {
    return;
  }

  gameOverShown = true;

  await Swal.fire({
    title: 'You are out of fuel.',
    text: 'Play again to restart.',
    icon: 'error',
    confirmButtonText: 'Play again',
    allowOutsideClick: false,
    allowEscapeKey: false,
    ...swalTheme,
  });

  restartGame();
}

export function resetGameOverModalState() {
  gameOverShown = false;
}
