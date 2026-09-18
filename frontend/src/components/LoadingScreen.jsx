import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaBirthdayCake } from "react-icons/fa";

export const LoadingScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      data-testid="loading-screen"
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg,#FFF5F7 0%,#FFEBF0 60%,#FFE0E9 100%)" }}
    >
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, -6, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
      >
        <FaBirthdayCake className="text-7xl" style={{ color: "#FF6B8B", filter: "drop-shadow(0 8px 20px rgba(255,107,139,.45))" }} />
      </motion.div>
      <p className="mt-8 font-hand text-3xl sm:text-4xl" style={{ color: "#4A1525" }}>
        Preparing your surprise...
      </p>
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FF85A1" }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};
