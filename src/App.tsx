import { useCallback, useEffect, useState } from "react";
import { bigConfetti, checkeredFlags } from "./confetti";
import { Envelope } from "./components/Envelope";
import { Invitation } from "./components/Invitation";
import { StartLights } from "./components/StartLights";
import { YesModal } from "./components/YesModal";
import { fanfare, setMuted, vroom } from "./sound";

type Stage = "envelope" | "opening" | "lights" | "invite";

export function App() {
  const [stage, setStage] = useState<Stage>("envelope");
  const [yesOpen, setYesOpen] = useState(false);
  const [muted, setMutedState] = useState(false);

  // Tab-Titel-Gimmick
  useEffect(() => {
    const original = document.title;
    const onVis = () => {
      document.title = document.hidden ? "🏁 Hey, deine Einladung wartet!" : original;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  const tapEnvelope = () => {
    if (stage !== "envelope") return;
    setStage("opening");
    setTimeout(() => setStage("lights"), 2300);
  };

  const go = useCallback(() => {
    setStage("invite");
    window.scrollTo(0, 0);
    vroom();
    setTimeout(() => {
      fanfare();
      bigConfetti();
    }, 900);
  }, []);

  const sayYes = () => {
    fanfare();
    bigConfetti();
    checkeredFlags();
    setYesOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Ton an" : "Ton aus"}
        className="fixed right-3 top-7 z-[60] rounded-full border-2 border-ink bg-white/80 px-2.5 py-1 text-xl shadow"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {stage === "invite" ? (
        <Invitation onYes={sayYes} />
      ) : (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-4 py-16 text-center">
          <div className={`transition-opacity duration-300 ${stage !== "envelope" ? "opacity-0" : ""}`}>
            <h1 className="animate-wobble font-display text-5xl tracking-wide text-kart display-shadow sm:text-6xl">Du hast Post! 📬</h1>
            <p className="mt-3 text-xl">Da ist was Wichtiges für dich angekommen …</p>
          </div>
          <Envelope open={stage !== "envelope"} onClick={tapEnvelope} />
          <p className={`text-xl transition-opacity ${stage !== "envelope" ? "opacity-0" : "animate-bob"}`}>👆 Tipp aufs Siegel zum Öffnen</p>
        </main>
      )}

      {stage === "lights" && <StartLights onGo={go} />}
      {yesOpen && <YesModal onClose={() => setYesOpen(false)} />}
    </>
  );
}
