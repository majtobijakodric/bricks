import brickHitSoundFile from '../assets/sound/discord-notification.mp3';

const brickHitSound = new Audio(brickHitSoundFile);
brickHitSound.preload = 'auto';

export function playBrickHitSound() {
  const soundInstance = new Audio(brickHitSoundFile);
  void soundInstance.play().catch(() => {
  });
}
