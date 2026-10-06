import lion from "../assets/lion-kart.jpg";
import { guestName } from "../guest";

type Props = {
  open: boolean;
  onClick: () => void;
};

const INK = "#3b2314";
// Alle Teile teilen sich dieselbe viewBox, damit die Kanten exakt aufeinander liegen
const VIEWBOX = "0 0 300 200";
const OUTLINE = "M12 3 H288 Q297 3 297 12 V188 Q297 197 288 197 H12 Q3 197 3 188 V12 Q3 3 12 3 Z";

export function Envelope({ open, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={open}
      aria-label="Briefumschlag öffnen"
      className={`envelope group relative block aspect-[3/2] w-[min(88vw,440px)] ${open ? "open" : "cursor-pointer"}`}
    >
      {/* Innenseite / Rückwand */}
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_8px_10px_rgba(59,35,20,0.25)]">
        <path d={OUTLINE} fill="#e2c697" stroke={INK} strokeWidth="3" />
      </svg>

      {/* Brief, der herausrutscht */}
      <div className="letter absolute inset-x-[8%] top-[5%] z-[1] flex h-[88%] flex-col items-center gap-1 rounded-md border-2 border-ink/50 bg-white pt-[7%]">
        <span className="font-display text-xl tracking-wide text-kart sm:text-2xl">{guestName ? `${guestName}, du bist eingeladen!` : "Du bist eingeladen!"}</span>
        <span className="text-lg">🏎️ 🎂 🏁</span>
      </div>

      {/* Vordertasche */}
      <svg viewBox={VIEWBOX} className="pointer-events-none absolute inset-0 z-[2] h-full w-full">
        <defs>
          <linearGradient id="pocket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6a54b" />
            <stop offset="1" stopColor="#e47a17" />
          </linearGradient>
          <clipPath id="env-clip">
            <path d={OUTLINE} />
          </clipPath>
        </defs>
        <g clipPath="url(#env-clip)">
          <path d="M0 0 L150 112 L300 0 V200 H0 Z" fill="url(#pocket)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {/* Falzkanten */}
          <path d="M3 197 L128 96 M297 197 L172 96" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Nur Seiten + Boden – die Oberkante liegt hinter dem Brief (Rückwand) */}
        <path d="M3 12 V188 Q3 197 12 197 H288 Q297 197 297 188 V12" fill="none" stroke={INK} strokeWidth="3" />
      </svg>

      {/* Adresse + Briefmarke */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <div className="absolute bottom-[9%] left-[7%] text-left leading-tight text-ink">
          <div className="text-sm opacity-70">An:</div>
          <div className="font-display text-xl tracking-wide sm:text-2xl">{guestName ?? "Dich"}! 💌</div>
          <div className="text-sm opacity-70">Absender: der Geburtstagslöwe</div>
        </div>
        <div className="absolute bottom-[9%] right-[6%] rotate-6 border-2 border-dashed border-ink/40 bg-white p-1 shadow">
          <img src={lion} alt="" className="h-14 w-14 object-cover sm:h-16 sm:w-16" />
          <div className="text-center text-[10px] font-bold leading-none">VOLLGAS 🏁</div>
        </div>
      </div>

      {/* Klappe – klappt nach oben und wandert dabei hinter den Brief */}
      <svg viewBox={VIEWBOX} className="flap pointer-events-none absolute inset-0 z-[4] h-full w-full overflow-visible">
        <g className="flap-g">
          <path className="flap-face" d="M3 12 Q3 3 12 3 H288 Q297 3 297 12 L158 118 Q150 124 142 118 Z" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </g>
      </svg>

      {/* Siegel */}
      <div className="seal absolute left-1/2 top-[60%] z-[5] flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink bg-kart text-3xl shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] sm:h-20 sm:w-20">
        🏁
      </div>
    </button>
  );
}
