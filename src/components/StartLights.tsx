import { useEffect, useState } from "react";
import { beep, goBeep } from "../sound";

type Props = { onGo: () => void };

const STEP = 550;

// Läuft automatisch ab: 5 Lichter an, alle aus – LOS!
export function StartLights({ onGo }: Props) {
  const [lit, setLit] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(
        window.setTimeout(() => {
          setLit(i);
          beep();
        }, i * STEP),
      );
    }
    timers.push(
      window.setTimeout(() => {
        setLit(0);
        setGo(true);
        goBeep();
      }, 6 * STEP + 300),
    );
    timers.push(window.setTimeout(onGo, 6 * STEP + 1100));
    return () => timers.forEach(clearTimeout);
  }, [onGo]);

  const text = go ? "LOS! 🏁" : lit <= 2 ? "Auf die Plätze …" : lit <= 4 ? "Fertig …" : "…";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="animate-pop-in w-full max-w-md overflow-hidden rounded-3xl border-4 border-ink bg-[#2b2b30] text-center text-white shadow-2xl">
        <div className="checkered h-4" />
        <div className="flex justify-center gap-2 px-6 pt-8 sm:gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col gap-2 rounded-xl bg-black p-2">
              <div className={`light h-9 w-9 rounded-full sm:h-11 sm:w-11 ${lit >= n ? "on" : ""}`} />
              <div className={`light h-9 w-9 rounded-full sm:h-11 sm:w-11 ${lit >= n ? "on" : ""}`} />
            </div>
          ))}
        </div>
        <p key={text} className={`animate-pop-in px-6 pb-8 pt-6 font-display tracking-wide ${go ? "text-5xl text-sun" : "text-3xl"}`}>
          {text}
        </p>
        <div className="checkered h-4" />
      </div>
    </div>
  );
}
