import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaCrown, FaGift, FaSun, FaMagic } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";

const ICONS = [FaHeart, FaStar, FaCrown, FaGift, FaSun, FaMagic];

const ReasonCard = ({ reason, index, revealed }) => {
  const Icon = ICONS[index % ICONS.length];
  return (
    <div
      className="relative h-44 sm:h-48"
      style={{ perspective: 800, filter: revealed ? "drop-shadow(0 0 18px var(--glow))" : "none" }}
      data-testid={`reason-card-flip-${index + 1}`}
    >
      <motion.div
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center gap-3"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <span className="font-display text-4xl font-bold" style={{ color: "var(--rose)" }}>
            {index + 1}
          </span>
          <Icon className="text-xl" style={{ color: "var(--gold)" }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted-text)" }}>
            tap reveal
          </span>
        </div>
        <div
          className="absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg,var(--pink),var(--rose))",
          }}
        >
          <p className="font-display font-semibold text-lg text-white">{reason.title}</p>
          <p className="text-sm text-white/90 leading-snug">{reason.text}</p>
        </div>
      </motion.div>

      {revealed && (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: 0, x: (i - 2) * 26, y: -70 - i * 8, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25 + i * 0.07 }}
            >
              <FaHeart style={{ color: "var(--rose)", fontSize: 10 + i * 2 }} />
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};

export const ReasonsSection = () => {
  const { reasons } = birthdayData;
  const [revealedCount, setRevealedCount] = useState(0);
  const allRevealed = revealedCount >= reasons.length;

  return (
    <section id="reasons" data-testid="reasons-section" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="font-hand text-2xl sm:text-3xl" style={{ color: "var(--pink)" }}>
          just a few of many
        </p>
        <h2 className="mt-2 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl" style={{ color: "var(--headline)" }}>
          12 Reasons Why You're Amazing ❤️
        </h2>
        <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--muted-text)" }} data-testid="reasons-progress-text">
          {revealedCount} of {reasons.length} reasons unlocked ✨
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <motion.button
          data-testid="reveal-next-reason-button"
          onClick={() => setRevealedCount((c) => Math.min(c + 1, reasons.length))}
          disabled={allRevealed}
          whileTap={{ scale: 0.94 }}
          className="px-6 py-3 rounded-full text-white font-semibold text-sm sm:text-base disabled:opacity-40"
          style={{ background: "linear-gradient(135deg,var(--pink),var(--rose))", boxShadow: "0 12px 30px -10px var(--glow)" }}
        >
          Reveal Next Reason
        </motion.button>
        <motion.button
          data-testid="reveal-all-reasons-button"
          onClick={() => setRevealedCount(reasons.length)}
          disabled={allRevealed}
          whileTap={{ scale: 0.94 }}
          className="px-6 py-3 rounded-full font-semibold text-sm sm:text-base glass disabled:opacity-40"
          style={{ color: "var(--pink)" }}
        >
          Reveal All
        </motion.button>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {reasons.map((r, i) => (
          <ReasonCard key={i} reason={r} index={i} revealed={i < revealedCount} />
        ))}
      </div>
    </section>
  );
};
