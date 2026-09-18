import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaBirthdayCake, FaRedo } from "react-icons/fa";
import { Balloons } from "./Balloons";

export const CELEBRATION_COLORS = ["#FF6B8B", "#FF85A1", "#FFD166", "#FFF0F5", "#E5A93C", "#C084FC"];

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
};

export const CelebrationSection = ({ celebrated, onReplay }) => {
  const { width, height } = useWindowSize();
  const [rain, setRain] = useState(false);

  useEffect(() => {
    if (!celebrated) return undefined;
    setRain(true);
    const fireworks = setInterval(() => {
      confetti({
        particleCount: 45,
        startVelocity: 32,
        spread: 360,
        ticks: 180,
        scalar: 0.9,
        origin: { x: 0.15 + Math.random() * 0.7, y: Math.random() * 0.4 },
        colors: CELEBRATION_COLORS,
      });
    }, 800);
    const stop = setTimeout(() => {
      setRain(false);
      clearInterval(fireworks);
    }, 10000);
    return () => {
      clearInterval(fireworks);
      clearTimeout(stop);
    };
  }, [celebrated]);

  return (
    <section
      id="celebration"
      data-testid="celebration-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {celebrated && rain && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={700} colors={CELEBRATION_COLORS} gravity={0.22} />
      )}

      <AnimatePresence mode="wait">
        {!celebrated ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-3xl p-10 max-w-md"
          >
            <FaBirthdayCake className="text-5xl mx-auto" style={{ color: "var(--pink)" }} />
            <h2 className="mt-5 font-display font-semibold text-2xl sm:text-3xl" style={{ color: "var(--headline)" }}>
              The Grand Celebration Awaits
            </h2>
            <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--muted-text)" }}>
              Build your cake and blow out the candles to unlock the party ✨
            </p>
            <button
              data-testid="celebration-goto-cake-button"
              onClick={() => document.getElementById("cake")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 px-6 py-3 rounded-full text-white font-semibold text-sm"
              style={{ background: "linear-gradient(135deg,var(--pink),var(--rose))" }}
            >
              Back to the Cake
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="party"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <Balloons count={7} />
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
            >
              <FaHeart className="text-6xl sm:text-7xl" style={{ color: "var(--pink)", filter: "drop-shadow(0 0 24px var(--glow))" }} />
            </motion.div>

            <motion.h2
              data-testid="celebration-headline"
              initial={{ opacity: 0, y: 50, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 180, damping: 14 }}
              className="mt-6 font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight"
              style={{
                background: "linear-gradient(120deg,var(--pink),var(--gold),var(--rose))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 6px 24px var(--glow))",
              }}
            >
              HAPPY BIRTHDAY MOTU ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-5 font-hand text-2xl sm:text-3xl"
              style={{ color: "var(--pink)" }}
            >
              may every wish you made tonight come true
            </motion.p>

            <div aria-hidden className="mt-8 flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.18 }}
                >
                  <FaHeart style={{ color: i % 2 ? "var(--gold)" : "var(--rose)", fontSize: 16 + (i % 3) * 4 }} />
                </motion.span>
              ))}
            </div>

            <motion.button
              data-testid="celebration-replay-button"
              onClick={onReplay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileTap={{ scale: 0.94 }}
              className="mt-10 px-6 py-3 rounded-full glass font-semibold text-sm inline-flex items-center gap-2"
              style={{ color: "var(--pink)" }}
            >
              <FaRedo /> Replay the Surprise
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
