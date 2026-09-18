import { motion } from "framer-motion";
import { FaHome, FaEnvelopeOpenText, FaHeart, FaClock, FaImages, FaBirthdayCake, FaGlassCheers, FaSun, FaMoon } from "react-icons/fa";

const SECTIONS = [
  { id: "welcome", label: "Home", Icon: FaHome },
  { id: "letter", label: "Letter", Icon: FaEnvelopeOpenText },
  { id: "reasons", label: "Reasons", Icon: FaHeart },
  { id: "memories", label: "Memories", Icon: FaClock },
  { id: "gallery", label: "Gallery", Icon: FaImages },
  { id: "cake", label: "Cake", Icon: FaBirthdayCake },
  { id: "celebration", label: "Party", Icon: FaGlassCheers },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const FloatingNav = ({ dark, onToggleTheme }) => (
  <>
    <motion.button
      data-testid="theme-toggle-button"
      onClick={onToggleTheme}
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 z-[80] w-11 h-11 rounded-full glass flex items-center justify-center"
      whileTap={{ scale: 0.85, rotate: 40 }}
      whileHover={{ scale: 1.08 }}
    >
      {dark ? <FaSun style={{ color: "var(--gold)" }} /> : <FaMoon style={{ color: "var(--pink)" }} />}
    </motion.button>

    <motion.nav
      data-testid="floating-nav"
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ delay: 2.6, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-4 left-1/2 z-[80] glass rounded-full px-2 py-1.5 flex items-center gap-1"
    >
      {SECTIONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          data-testid={`floating-nav-link-${id}`}
          onClick={() => scrollTo(id)}
          aria-label={label}
          title={label}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[var(--pink)] hover:text-white"
          style={{ color: "var(--pink)" }}
        >
          <Icon className="text-sm" />
        </button>
      ))}
    </motion.nav>
  </>
);
