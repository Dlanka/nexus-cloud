import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#6366f1', '#8b5cf6', '#d946ef', '#06b6d4'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#fbbf24', '#f43f5e', '#a855f7'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#6366f1', '#10b981', '#ffffff'],
  });
};

export const triggerSideCannons = () => {
  const end = Date.now() + 2 * 1000;
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#3b82f6'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
