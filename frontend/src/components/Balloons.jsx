import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const FloatingHeart = ({ color, left, delay, duration, size = 1 }) => (
  <motion.div
    aria-hidden
    className="absolute bottom-0 pointer-events-none z-[1]"
    style={{ left: `${left}%`, scale: size }}
    initial={{ y: "110vh", opacity: 0.1, rotate: 0 }}
    animate={{ 
      y: "-130vh", 
      opacity: [0.1, 0.8, 0.8, 0],
      rotate: [0, 15, -15, 0]
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  >
    <motion.div 
      animate={{ x: [0, 15, -15, 0], scale: [1, 1.15, 1] }} 
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <FaHeart 
        style={{ 
          color, 
          fontSize: `${28 * size}px`,
          filter: `drop-shadow(0 0 10px ${color}88)`
        }} 
      />
    </motion.div>
  </motion.div>
);

export const Balloons = ({ count = 12 }) => {
  const colors = ["#FF4D6D", "#FF758F", "#FF8FA3", "#FFB3C1", "#E63946", "#FF0054", "#FDA4AF"];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }, (_, i) => (
        <FloatingHeart
          key={i}
          color={colors[i % colors.length]}
          left={4 + (i * 92) / Math.max(count - 1, 1)}
          delay={i * 1.1}
          duration={9 + (i % 4) * 2.5}
          size={0.8 + (i % 3) * 0.35}
        />
      ))}
    </div>
  );
};
