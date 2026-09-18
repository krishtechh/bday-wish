import { motion, useScroll, useSpring } from "framer-motion";

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return (
    <motion.div
      data-testid="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-1 z-[90] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg,var(--pink),var(--gold))" }}
    />
  );
};
