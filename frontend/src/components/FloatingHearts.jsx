import { useMemo } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

export const FloatingHearts = ({ count = 16, fixed = true, opacity = 0.28 }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 96,
        size: 12 + Math.random() * 20,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 12,
        star: Math.random() > 0.7,
      })),
    [count]
  );
  return (
    <div
      aria-hidden
      className={`${fixed ? "fixed" : "absolute"} inset-0 overflow-hidden pointer-events-none z-[1]`}
    >
      {items.map((h) =>
        h.star ? (
          <FaStar
            key={h.id}
            className="absolute -bottom-10"
            style={{
              left: `${h.left}%`,
              fontSize: h.size * 0.7,
              color: "var(--gold)",
              "--heart-opacity": opacity,
              animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            }}
          />
        ) : (
          <FaHeart
            key={h.id}
            className="absolute -bottom-10"
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              color: "var(--rose)",
              "--heart-opacity": opacity,
              animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            }}
          />
        )
      )}
    </div>
  );
};
