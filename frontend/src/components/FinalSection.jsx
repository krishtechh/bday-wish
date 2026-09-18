import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";
import { FloatingHearts } from "./FloatingHearts";

export const FinalSection = () => (
  <section
    id="final"
    data-testid="final-section"
    className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    style={{ background: "linear-gradient(180deg,transparent,var(--bg-secondary))" }}
  >
    <FloatingHearts count={20} fixed={false} opacity={0.35} />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-2xl"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        className="mx-auto w-20 h-20 rounded-full glass flex items-center justify-center"
        style={{ animation: "pulseGlow 2.4s ease-in-out infinite" }}
      >
        <FaHeart className="text-3xl" style={{ color: "var(--pink)" }} />
      </motion.div>

      <h2 className="mt-8 font-display font-bold text-3xl sm:text-5xl leading-tight" style={{ color: "var(--headline)" }}>
        {birthdayData.final.line1}
      </h2>
      <p className="mt-4 font-hand text-2xl sm:text-4xl" style={{ color: "var(--pink)" }}>
        {birthdayData.final.line2}
      </p>

      <div className="mt-12 inline-flex items-center gap-2 glass rounded-full px-6 py-3">
        <span className="text-sm" style={{ color: "var(--muted-text)" }}>
          {birthdayData.final.credit}
        </span>
        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
          <FaHeart style={{ color: "var(--pink)" }} />
        </motion.span>
      </div>
    </motion.div>
  </section>
);
