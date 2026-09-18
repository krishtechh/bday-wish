import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaPause, FaPlay, FaRedo, FaFastForward } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";

export const LetterSection = () => {
  const { letter } = birthdayData;
  const [open, setOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const full = letter.body;
  const done = idx >= full.length;

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    setTimeout(() => setShowLetter(true), 950);
  };

  useEffect(() => {
    if (!showLetter || paused || done) return undefined;
    const t = setTimeout(() => setIdx((i) => i + 1), 26);
    return () => clearTimeout(t);
  }, [showLetter, paused, idx, done]);

  return (
    <section id="letter" data-testid="letter-section" className="relative py-24 sm:py-32 px-6 flex flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="font-hand text-2xl sm:text-3xl" style={{ color: "var(--pink)" }}>
          sealed with a kiss
        </p>
        <h2 className="mt-2 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl" style={{ color: "var(--headline)" }}>
          {letter.heading}
        </h2>
      </motion.div>

      <div className="relative mt-16" style={{ perspective: 900 }}>
        {open && (
          <div aria-hidden className="absolute -inset-16 pointer-events-none z-40">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: 0, x: (i % 2 ? 1 : -1) * (40 + i * 14), y: -60 - i * 12, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3 + i * 0.06 }}
              >
                <FaHeart style={{ color: "var(--rose)", fontSize: 12 + (i % 3) * 5 }} />
              </motion.span>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="relative w-72 h-48 sm:w-96 sm:h-60"
        >
          <motion.div
            animate={open ? { y: -90, zIndex: 30 } : { y: 0, zIndex: 10 }}
            transition={{ duration: 0.75, delay: open ? 0.35 : 0, zIndex: { delay: 0.3 } }}
            className="absolute inset-x-5 top-3 bottom-5 rounded-md paper-lines p-3"
            style={{ boxShadow: "0 10px 30px -10px rgba(120,40,70,.35)" }}
          >
            <p className="font-hand text-xl sm:text-2xl" style={{ color: "#b0526b" }}>
              {letter.greeting}
            </p>
            <div className="mt-2 space-y-2">
              {[90, 75, 82].map((w) => (
                <div key={w} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: "rgba(255,133,161,.3)" }} />
              ))}
            </div>
          </motion.div>

          <div className="absolute inset-0 z-20 rounded-xl overflow-hidden" style={{ boxShadow: "0 24px 50px -18px rgba(120,40,70,.4)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#FF9FB8,#FF6B8B)", clipPath: "polygon(0 100%,100% 100%,50% 42%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(200deg,#FF8FAC,#FF5C82)", clipPath: "polygon(0 0,50% 52%,0 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(140deg,#FF8FAC,#FF5C82)", clipPath: "polygon(100% 0,50% 52%,100% 100%)" }} />
          </div>

          <motion.div
            animate={{ rotateX: open ? -178 : 0, zIndex: open ? 5 : 30 }}
            transition={{ rotateX: { duration: 0.6, ease: "easeInOut" }, zIndex: { delay: 0.2 } }}
            className="absolute inset-x-0 top-0 h-24 sm:h-28 rounded-t-xl"
            style={{
              transformOrigin: "top center",
              clipPath: "polygon(0 0,100% 0,50% 68%)",
              background: "linear-gradient(180deg,#FF7A9C,#E84E74)",
              boxShadow: "0 6px 16px -6px rgba(120,40,70,.5)",
            }}
          />

          {!open && (
            <motion.button
              data-testid="open-letter-envelope-button"
              onClick={handleOpen}
              aria-label="Open the letter"
              className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 35% 30%, #FF9FB8, #D6336C 70%)",
                boxShadow: "0 8px 24px -4px rgba(214,51,108,.55), inset 0 -3px 8px rgba(0,0,0,.25)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart className="text-white text-2xl" />
            </motion.button>
          )}
        </motion.div>

        {!open && (
          <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-text)" }}>
            {letter.hint}
          </p>
        )}
      </div>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            data-testid="letter-card"
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="relative z-10 mt-10 w-full max-w-2xl glass rounded-3xl p-6 sm:p-10"
          >
            <h3 className="font-hand text-3xl sm:text-4xl" style={{ color: "var(--pink)" }}>
              {letter.greeting}
            </h3>
            <p className="mt-5 text-base sm:text-lg leading-relaxed whitespace-pre-wrap" style={{ color: "var(--body-text)", minHeight: "12rem" }}>
              {full.slice(0, idx)}
              {!done && <span className="typewriter-caret" />}
            </p>
            {done && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 font-hand text-2xl sm:text-3xl text-right"
                style={{ color: "var(--pink)" }}
              >
                {letter.signature}
              </motion.p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                data-testid="typewriter-pause-button"
                onClick={() => setPaused((p) => !p)}
                disabled={done}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white disabled:opacity-40"
                style={{ background: "var(--pink)" }}
              >
                {paused ? <FaPlay /> : <FaPause />} {paused ? "Resume" : "Pause"}
              </button>
              <button
                data-testid="typewriter-skip-button"
                onClick={() => setIdx(full.length)}
                disabled={done}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium glass disabled:opacity-40"
                style={{ color: "var(--pink)" }}
              >
                <FaFastForward /> Skip
              </button>
              <button
                data-testid="typewriter-replay-button"
                onClick={() => {
                  setIdx(0);
                  setPaused(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium glass"
                style={{ color: "var(--pink)" }}
              >
                <FaRedo /> Replay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
