import { useState } from "react";
import { config } from "../config";
import { guestName } from "../guest";

type Props = { onClose: () => void };

export function YesModal({ onClose }: Props) {
  const [picked, setPicked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const pickedLabels = config.dates.filter((d) => picked.includes(d.id)).map((d) => `${d.weekday}, ${d.day}. ${d.month}`);
  const message =
    pickedLabels.length === 0
      ? "Ich bin dabei beim Kartfahren! 🏎️ Welcher Termin mir passt, sag ich dir gleich noch."
      : pickedLabels.length === config.dates.length
        ? "Ich bin dabei beim Kartfahren! 🏎️ Mir passen beide Termine – such dir einen aus!"
        : `Ich bin dabei beim Kartfahren! 🏎️ Am besten passt mir: ${pickedLabels.join(" oder ")}.`;

  const whatsapp = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard nicht verfügbar – dann eben abtippen 🙂 */
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="yes-title"
        className="sketch animate-pop-in relative max-h-[92vh] w-full max-w-md overflow-y-auto bg-paper p-6 text-center shadow-2xl"
      >
        <button type="button" onClick={onClose} aria-label="Schließen" className="absolute right-4 top-3 text-2xl opacity-60 hover:opacity-100">
          ✕
        </button>
        <div className="text-6xl">🏆</div>
        <h2 id="yes-title" className="mt-2 font-display text-4xl tracking-wide text-kart display-shadow">
          Juhuuu!
        </h2>
        <p className="mt-3 text-xl leading-snug">
          Mega, dass du dabei bist{guestName ? `, ${guestName}` : ""}! Eine Sache noch: <b>Schreib mir bitte, wann es dir am besten passt.</b>
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {config.dates.map((d) => {
            const on = picked.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggle(d.id)}
                aria-pressed={on}
                className={`rounded-2xl border-3 border-ink p-3 transition ${on ? "bg-sun -rotate-2 scale-105 shadow-[0_4px_0_var(--color-ink)]" : "bg-white"}`}
              >
                <div className="text-sm uppercase opacity-70">{d.weekday}</div>
                <div className="font-display text-3xl leading-none">{d.day}.</div>
                <div className="font-display text-lg">{d.month}</div>
                <div className="text-sm">{d.time}</div>
                <div className="mt-1 text-xl">{on ? "✅" : "⬜"}</div>
              </button>
            );
          })}
        </div>

        <p className="mt-5 rounded-xl bg-kart/10 px-3 py-2 text-lg">
          ⏱️ Bitte gib mir <b>zeitig</b> Bescheid, damit ich Kartbahn & Essen rechtzeitig buchen kann!
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25d366] px-6 py-3 font-display text-xl tracking-wide text-white shadow-[0_4px_0_#128c3e] active:translate-y-1 active:shadow-none"
          >
            Per WhatsApp antworten 💬
          </a>
          <button type="button" onClick={copy} className="rounded-full border-3 border-ink bg-white px-6 py-2 text-lg">
            {copied ? "Kopiert! ✅" : "Antwort-Text kopieren 📋"}
          </button>
        </div>
        <p className="mt-3 text-sm opacity-60">„{message}“</p>
      </div>
    </div>
  );
}
