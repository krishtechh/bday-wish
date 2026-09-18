import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";

export const TimelineSection = () => {
  const { memories } = birthdayData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const heartTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="memories" data-testid="timeline-section" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="font-hand text-2xl sm:text-3xl" style={{ color: "var(--pink)" }}>
          every chapter with you
        </p>
        <h2 className="mt-2 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl" style={{ color: "var(--headline)" }}>
          Our Memory Timeline
        </h2>
      </motion.div>

      <div ref={ref} className="relative max-w-5xl mx-auto mt-16 flex flex-col gap-14 md:gap-20">
        <div
          className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full overflow-hidden"
          style={{ background: "var(--surface-border)" }}
        >
          <motion.div
            className="w-full h-full origin-top rounded-full"
            style={{ scaleY: scrollYProgress, background: "linear-gradient(var(--pink),var(--gold))" }}
          />
        </div>
        <motion.div className="absolute left-5 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ top: heartTop }}>
          <FaHeart className="text-xl" style={{ color: "var(--pink)", filter: "drop-shadow(0 0 8px var(--glow))" }} />
        </motion.div>

        {memories.map((m, i) => {
          const leftSide = i % 2 === 0;
          return (
            <motion.article
              key={i}
              data-testid={`timeline-card-${i}`}
              initial={{ opacity: 0, x: leftSide ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className={`relative pl-14 md:pl-0 md:w-[calc(50%-2.5rem)] ${leftSide ? "md:self-start" : "md:self-end"}`}
            >
              <span
                className="absolute top-6 -left-[3.35rem] md:left-auto w-4 h-4 rounded-full border-2 md:hidden"
                style={{ background: "var(--bg-primary)", borderColor: "var(--pink)", left: "0.95rem" }}
              />
              <div className="glass rounded-3xl p-5 sm:p-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  style={{ background: "var(--bg-secondary)", color: "var(--pink)" }}
                >
                  {m.date}
                </span>
                <h3 className="mt-3 font-display font-semibold text-xl sm:text-2xl" style={{ color: "var(--headline)" }}>
                  {m.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--body-text)" }}>
                  {m.text}
                </p>
                {m.image && (
                  <motion.img
                    src={m.image}
                    alt={m.title}
                    loading="lazy"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="mt-4 w-full h-44 sm:h-52 object-cover rounded-2xl"
                  />
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
