import { motion } from "framer-motion";
import { FaBirthdayCake, FaHeart, FaChevronDown } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";
import { Balloons } from "./Balloons";

export const WelcomeSection = ({ onStart }) => (
  <section
    id="welcome"
    data-testid="welcome-section"
    className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
  >
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ background: "var(--rose)", opacity: 0.25 }} />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl" style={{ background: "var(--pink)", opacity: 0.18 }} />
    </div>
    <Balloons count={5} />

    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
      className="relative z-10"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="mx-auto w-28 h-28 sm:w-36 sm:h-36 rounded-full glass flex items-center justify-center"
        style={{ animation: "pulseGlow 2.6s ease-in-out infinite" }}
      >
        <FaBirthdayCake className="text-5xl sm:text-6xl" style={{ color: "var(--pink)" }} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-8 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight"
        style={{ color: "var(--headline)" }}
      >
        {birthdayData.welcome.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-4 text-base sm:text-lg"
        style={{ color: "var(--muted-text)" }}
      >
        {birthdayData.welcome.subtitle}
      </motion.p>

      <motion.button
        data-testid="hero-start-surprise-button"
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.5 },
          y: { delay: 1.1, repeat: Infinity, duration: 1.6, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base sm:text-lg"
        style={{
          background: "linear-gradient(135deg,var(--pink),var(--rose))",
          boxShadow: "0 16px 40px -10px var(--glow)",
        }}
      >
        <FaHeart />
        {birthdayData.welcome.button}
      </motion.button>
    </motion.div>

    <motion.div
      aria-hidden
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.8 }}
      style={{ color: "var(--pink)" }}
    >
      <FaChevronDown />
    </motion.div>
  </section>
);
