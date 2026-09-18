import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { LoadingScreen } from "./components/LoadingScreen";
import { ProgressBar } from "./components/ProgressBar";
import { FloatingHearts } from "./components/FloatingHearts";
import { FloatingNav } from "./components/FloatingNav";
import { MusicPlayer } from "./components/MusicPlayer";
import { WelcomeSection } from "./components/WelcomeSection";
import { LetterSection } from "./components/LetterSection";
import { ReasonsSection } from "./components/ReasonsSection";
import { GallerySection } from "./components/GallerySection";
import { CakeBuilderSection } from "./components/CakeBuilderSection";
import { CelebrationSection, CELEBRATION_COLORS } from "./components/CelebrationSection";
import { FinalSection } from "./components/FinalSection";

function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [dark, setDark] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleBlow = useCallback(() => {
    setCelebrated(true);
    confetti({ particleCount: 160, spread: 110, origin: { y: 0.6 }, colors: CELEBRATION_COLORS });
    const end = Date.now() + 2200;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: CELEBRATION_COLORS });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: CELEBRATION_COLORS });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleStart = () => {
    setStarted(true);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 }, colors: CELEBRATION_COLORS });
    setTimeout(() => document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" }), 500);
  };

  const handleReplay = () => {
    setCelebrated(false);
    setResetKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--bg-primary)" }}>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      <ProgressBar />
      <FloatingHearts />
      <FloatingNav dark={dark} onToggleTheme={() => setDark((d) => !d)} />
      <MusicPlayer autoStart={started} />

      <main className="relative z-10">
        <WelcomeSection onStart={handleStart} />
        <LetterSection />
        <ReasonsSection />
        <GallerySection />
        <CakeBuilderSection key={resetKey} onBlow={handleBlow} />
        <CelebrationSection celebrated={celebrated} onReplay={handleReplay} />
        <FinalSection />
      </main>
    </div>
  );
}

export default App;
