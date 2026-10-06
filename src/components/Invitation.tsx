import { useRef, useState } from "react";
import lion from "../assets/lion-kart.jpg";
import { config } from "../config";
import { vroom } from "../sound";
import { Balloons } from "./Balloons";
import { NoButton } from "./NoButton";
import { guestName } from "../guest";

type Props = {
  onYes: () => void;
};

const LION_SAYS = ["Brumm brumm! 🏎️", "Roaaar! 🦁", "Vollgas!!!", "Kitzel mich nicht! 😆", "Ich fahr schon mal vor!"];

export function Invitation({ onYes }: Props) {
  // Der Löwe fährt beim Laden ins Bild ("in"), beim Antippen einmal ums Eck ("loop")
  const [driving, setDriving] = useState<"in" | "loop" | null>("in");
  const [lionSays, setLionSays] = useState<string | null>(null);
  const [lionClicks, setLionClicks] = useState(0);
  const [popped, setPopped] = useState(0);
  const [noAttempts, setNoAttempts] = useState(0);
  // Wenn der Nein-Knopf beim Antippen wegspringt, landet der nachfolgende Klick
  // sonst auf dem Ja-Knopf, der jetzt darunter liegt.
  const lastNoAttempt = useRef(0);

  const noAttempt = () => {
    lastNoAttempt.current = performance.now();
    setNoAttempts((n) => n + 1);
  };

  const yes = () => {
    if (performance.now() - lastNoAttempt.current < 600) return;
    onYes();
  };

  const clickLion = () => {
    if (driving) return;
    vroom();
    setDriving("loop");
    setLionSays(LION_SAYS[lionClicks % LION_SAYS.length]);
    setLionClicks((c) => c + 1);
  };

  return (
    <>
      <Balloons onPop={() => setPopped((p) => p + 1)} />

      <div className="checkered relative h-5 overflow-hidden">
        <span className="animate-zoom-across absolute -top-1 left-0 text-2xl">🏎️</span>
      </div>

      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 pb-24 pt-8 text-center">
        <p className="animate-rise-in text-xl">🎉 Offizielle Einladung 🎉</p>
        <h1 className="animate-rise-in mt-1 font-display text-5xl leading-[1.05] tracking-wide text-kart display-shadow [animation-delay:0.1s] sm:text-7xl">
          Ab auf die
          <br />
          Strecke!
        </h1>

        {/* Der Löwe */}
        <div className="animate-rise-in relative mt-4 w-full [animation-delay:0.2s]">
          {lionSays && !driving && (
            <span key={lionClicks} className="animate-pop-in absolute right-[8%] top-[4%] z-10 rounded-2xl border-2 border-ink bg-white px-3 py-1 text-lg shadow">
              {lionSays}
            </span>
          )}
          <button type="button" onClick={clickLion} aria-label="Löwe anstupsen" className="block w-full cursor-pointer">
            <img
              src={lion}
              alt="Ein Löwe im roten Kart mit Luftballons"
              onAnimationEnd={() => setDriving(null)}
              className={`soft-edges mx-auto w-full max-w-lg ${driving === "in" ? "animate-drive-in" : driving === "loop" ? "animate-drive" : "animate-bob"}`}
            />
          </button>
          <p className="-mt-3 text-base opacity-60">(psst … tipp mal auf den Löwen)</p>
        </div>

        <section className="animate-rise-in sketch mt-8 w-full bg-white/70 p-6 text-xl leading-relaxed [animation-delay:0.3s]">
          <p>
            <b>Hey {guestName ?? "du"}!</b> 👋
            <br />
            Ich werde ein Jahr älter (aber hoffentlich nicht langsamer) – und das will ich mit dir feiern!
            <br />
            Hiermit bist du <b>ganz offiziell</b> zu meinem Geburtstag eingeladen. 🎂
          </p>
        </section>

        <h2 className="mt-12 font-display text-3xl tracking-wide display-shadow text-sun sm:text-4xl">Das Rennprogramm</h2>
        <div className="mt-5 grid w-full gap-4 sm:grid-cols-3">
          <ProgramCard emoji="🏎️" title="Kartfahren" rotate="-rotate-1" note="💸 Das Rennen zahlt jeder selbst">
            bei <b>{config.location}</b>: Erst die <b>Quali</b>, dann das <b>Rennen</b>. Helm auf, Visier runter, Vollgas!
            <a href={config.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 block text-sky underline">
              📍 Auf der Karte
            </a>
          </ProgramCard>
          <ProgramCard emoji="🍝" title="Boxenstopp" rotate="rotate-1" note="🎁 Das Essen geht auf mich!">
            Danach gibt's Pizza & Pasta bei <b>{config.restaurant}</b> ganz in der Nähe.
            <a href={config.restaurantUrl} target="_blank" rel="noreferrer" className="mt-2 block text-sky underline">
              📍 Auf der Karte
            </a>
          </ProgramCard>
          <ProgramCard emoji="🏆" title="Siegerehrung" rotate="-rotate-1">
            Ruhm, Ehre und <b>ewige Angeberrechte</b> für die schnellste Runde.
          </ProgramCard>
        </div>

        <h2 className="mt-12 font-display text-3xl tracking-wide display-shadow text-sun sm:text-4xl">Mögliche Renntage</h2>
        <div className="mt-5 flex w-full flex-wrap justify-center gap-4">
          {config.dates.map((d, i) => (
            <div
              key={d.id}
              className={`relative w-40 border-3 border-dashed border-ink bg-white px-4 py-3 shadow-[4px_4px_0_var(--color-ink)] ${i % 2 ? "rotate-2" : "-rotate-2"}`}
            >
              <div className="text-sm uppercase tracking-widest opacity-60">{d.weekday}</div>
              <div className="font-display text-5xl leading-none text-kart">{d.day}.</div>
              <div className="font-display text-xl">{d.month}</div>
              <div className="text-lg">{d.time}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xl">Sag mir einfach, welcher Termin dir besser passt!</p>
        <p className="mt-3 rotate-1 rounded-xl border-2 border-kart bg-kart/10 px-4 py-2 text-lg">
          ⏱️ Bitte gib mir <b>zeitig</b> Bescheid, damit ich alles buchen kann.
        </p>


        {/* Die große Frage */}
        <section className="relative z-30 mt-12 w-full">
          <h2 className="font-display text-4xl tracking-wide text-kart display-shadow sm:text-5xl">Bist du dabei?</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={yes}
              style={{ transform: `scale(${1 + Math.min(noAttempts, 5) * 0.025})` }}
              className="max-w-[85vw] rounded-full border-3 border-ink bg-kart px-7 py-4 font-display text-2xl tracking-wide text-white shadow-[0_5px_0_var(--color-ink)] transition-transform hover:!scale-110 active:translate-y-1"
            >
              Ja, ich kann's kaum erwarten! 🏁
            </button>
            <NoButton attempts={noAttempts} onAttempt={noAttempt} onGiveUp={onYes} />
          </div>
        </section>

        <p className="mt-16 text-2xl">
          Bis bald auf der Strecke!
          <br />
          <span className="font-display text-3xl tracking-wide text-mane">Dein {config.name} 🦁</span>
        </p>
        {popped > 0 && <p className="mt-6 text-base opacity-60">🎈 Ballons zerplatzt: {popped}{popped >= 10 ? " – du Ballon-Monster!" : ""}</p>}
      </main>

      <div className="checkered h-5" />
    </>
  );
}

function ProgramCard({
  emoji,
  title,
  rotate,
  note,
  children,
}: {
  emoji: string;
  title: string;
  rotate: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`sketch bg-white/80 p-5 text-lg leading-snug transition hover:rotate-0 hover:scale-105 ${rotate}`}>
      <div className="text-5xl">{emoji}</div>
      <h3 className="mt-2 font-display text-2xl tracking-wide text-kart">{title}</h3>
      <p className="mt-1">{children}</p>
      {note && <p className="mt-3 inline-block -rotate-2 rounded-full border-2 border-ink bg-sun px-3 py-0.5 text-base font-bold">{note}</p>}
    </div>
  );
}
