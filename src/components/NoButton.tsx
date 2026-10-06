import { useRef, useState } from "react";

export const NO_MESSAGES = [
  "Neee, das ist der falsche Knopf! 🙅",
  "Ich glaub, du hast dich verklickt 🤔",
  "Hoppla, der Knopf ist kaputt 🔧",
  "Netter Versuch 😏",
  "Der Knopf hat heute frei 🏖️",
  "Fehler 404: Absage nicht gefunden",
  "Zu langsam! 🏎️💨",
  "Der Löwe ist enttäuscht 🦁😢",
  "Bist du sicher? Ganz sicher? 🥺",
  "Ok, jetzt reicht's aber! 😤",
];

type Props = {
  attempts: number;
  onAttempt: () => void;
  onGiveUp: () => void;
};

export function NoButton({ attempts, onAttempt, onGiveUp }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bubbleBelow, setBubbleBelow] = useState(false);
  const lastDodge = useRef(0);
  const surrendered = attempts >= NO_MESSAGES.length;

  const dodge = () => {
    // Touch löst pointerdown + click aus – nur einmal zählen
    if (performance.now() - lastDodge.current < 400) return;
    lastDodge.current = performance.now();
    onAttempt();

    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const baseX = r.left - offset.x;
    const baseY = r.top - offset.y;
    const pad = 16;
    const top = 90; // Platz für die Sprechblase
    const maxX = Math.max(pad, window.innerWidth - r.width - pad);
    const maxY = Math.max(top, window.innerHeight - r.height - pad);

    let tx = 0;
    let ty = 0;
    for (let i = 0; i < 15; i++) {
      tx = pad + Math.random() * (maxX - pad);
      ty = top + Math.random() * (maxY - top);
      if (Math.hypot(tx - r.left, ty - r.top) > 140) break;
    }
    setBubbleBelow(ty < 160);
    setOffset({ x: tx - baseX, y: ty - baseY });
  };

  const message = attempts > 0 && !surrendered ? NO_MESSAGES[(attempts - 1) % NO_MESSAGES.length] : null;

  return (
    <button
      ref={ref}
      type="button"
      onPointerEnter={(e) => !surrendered && e.pointerType === "mouse" && dodge()}
      onPointerDown={(e) => {
        if (surrendered) return;
        e.preventDefault();
        dodge();
      }}
      onClick={(e) => {
        e.preventDefault();
        if (surrendered) onGiveUp();
        else dodge();
      }}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${surrendered ? 1 : Math.max(0.7, 1 - attempts * 0.03)})`,
      }}
      className={`relative z-30 rounded-full border-3 border-ink px-5 py-3 text-lg shadow-[0_4px_0_var(--color-ink)] transition-transform duration-300 ease-[cubic-bezier(0.3,0,0.3,1.5)] ${
        surrendered ? "bg-sun font-display tracking-wide" : "bg-white/80"
      }`}
    >
      {surrendered ? "Okay okay … JA! 🙄🎉" : "Nein, ich komme nicht"}
      {message && (
        <span
          key={attempts}
          className={`animate-pop-in pointer-events-none absolute left-1/2 z-40 w-max max-w-[70vw] -translate-x-1/2 rounded-2xl border-2 border-ink bg-white px-3 py-1.5 text-base leading-tight shadow-lg ${
            bubbleBelow ? "top-[calc(100%+12px)]" : "bottom-[calc(100%+12px)]"
          }`}
        >
          {message}
        </span>
      )}
    </button>
  );
}
