let refreshRateUpdatePromise: Promise<number> | null = null;

export function startRefreshRateEstimate(): Promise<number> {
  let frameCount = 0;
  let lastTime = performance.now();

  return new Promise((resolve) => {
    function estimateRefreshRate(timestamp: number) {
      frameCount++;
      const elapsed = timestamp - lastTime;

      // Calculate FPS after 10 frames for stability.
      if (frameCount >= 10) {
        const fps = Math.round(frameCount / (elapsed / 1000));
        resolve(fps);
        return;
      }

      requestAnimationFrame(estimateRefreshRate);
    }

    requestAnimationFrame((timestamp) => {
      lastTime = timestamp;
      requestAnimationFrame(estimateRefreshRate);
    });
  });
}

export async function updateRefreshRateEstimate(): Promise<number> {
  if (refreshRateUpdatePromise) {
    return refreshRateUpdatePromise;
  }

  refreshRateUpdatePromise = startRefreshRateEstimate();

  try {
    return await refreshRateUpdatePromise;
  } finally {
    refreshRateUpdatePromise = null;
  }
}
