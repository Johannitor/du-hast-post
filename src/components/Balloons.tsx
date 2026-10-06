import { useState } from "react";
import { burst } from "../confetti";
import { pop } from "../sound";

const COLORS = [
  "radial-gradient(circle at 35% 30%, #8fb2ef, #2b5aa8 65%)",
  "radial-gradient(circle at 35% 30%, #ffc27a, #f08a24 65%)",
  "radial-gradient(circle at 35% 30%, #ffe590, #f6c343 65%)",
  "radial-gradient(circle at 35% 30%, #ff9a8c, #d63a2a 65%)",
];

type Balloon = { id: number; left: number; color: string; duration: number; delay: number; size: number };

let nextId = 0;
const makeBalloon = (initial: boolean): Balloon => ({
  id: nextId++,
  left: 3 + Math.random() * 88,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  duration: 11 + Math.random() * 8,
  delay: initial ? Math.random() * 6 : Math.random() * 2,
  size: 46 + Math.random() * 22,
});

type Props = { onPop: () => void };

export function Balloons({ onPop }: Props) {
  const [balloons, setBalloons] = useState(() => Array.from({ length: 7 }, () => makeBalloon(true)));

  // Kaputte oder davongeflogene Ballons nachliefern
  const replace = (id: number) => setBalloons((bs) => bs.map((b) => (b.id === id ? makeBalloon(false) : b)));

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon absolute top-full"
          style={{ left: `${b.left}%`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
          onAnimationEnd={() => replace(b.id)}
        >
          <button
            type="button"
            tabIndex={-1}
            className="balloon-body pointer-events-auto relative block cursor-crosshair opacity-90"
            style={{ width: b.size, height: b.size * 1.2, background: b.color }}
            onPointerDown={(e) => {
              pop();
              burst(e.clientX, e.clientY, 30);
              onPop();
              replace(b.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
