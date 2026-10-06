import confetti from "canvas-confetti";

const colors = ["#d63a2a", "#f08a24", "#f6c343", "#2b5aa8", "#ffffff"];

export function bigConfetti() {
  const end = Date.now() + 1200;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function burst(x: number, y: number, particleCount = 40) {
  confetti({
    particleCount,
    spread: 70,
    startVelocity: 25,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors,
  });
}

export function checkeredFlags() {
  confetti({ particleCount: 25, spread: 100, origin: { y: 0.4 }, shapes: [confetti.shapeFromText({ text: "🏁", scalar: 2 })], scalar: 2 });
}
