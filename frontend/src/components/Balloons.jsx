import { motion } from "framer-motion";

const Balloon = ({ color, left, delay, duration, size = 1 }) => (
  <motion.div
    aria-hidden
    className="absolute bottom-0 pointer-events-none"
    style={{ left: `${left}%`, scale: size }}
    initial={{ y: "110vh" }}
    animate={{ y: "-130vh" }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  >
    <motion.div animate={{ x: [0, 14, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <div
        className="w-12 h-[60px] relative"
        style={{
          borderRadius: "50% 50% 50% 50% / 55% 55% 45% 45%",
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.75), ${color} 55%)`,
          boxShadow: "0 10px 24px -8px rgba(0,0,0,.25)",
        }}
      >
        <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `8px solid ${color}` }}
        />
      </div>
      <div className="mx-auto w-px h-20" style={{ background: "rgba(120,60,80,.4)" }} />
    </motion.div>
  </motion.div>
);

export const Balloons = ({ count = 6 }) => {
  const colors = ["#FF6B8B", "#FF85A1", "#FFD166", "#C084FC", "#7DD3FC", "#FDA4AF"];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }, (_, i) => (
        <Balloon
          key={i}
          color={colors[i % colors.length]}
          left={6 + (i * 88) / Math.max(count - 1, 1)}
          delay={i * 1.6}
          duration={13 + (i % 3) * 3}
          size={0.8 + (i % 3) * 0.18}
        />
      ))}
    </div>
  );
};
