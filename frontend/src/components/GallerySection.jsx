import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaTimes } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";

const ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 1];

const Polaroid = ({ photo, index, onOpen }) => (
  <motion.button
    data-testid={`polaroid-gallery-item-${index}`}
    onClick={() => onOpen(index)}
    initial={{ opacity: 0, y: 40, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[index % ROTATIONS.length] }}
    viewport={{ once: true, margin: "-60px" }}
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    transition={{ type: "spring", stiffness: 220, damping: 17 }}
    className="relative block w-full break-inside-avoid mb-6 bg-white p-3 pb-5 rounded-md text-left"
    style={{ boxShadow: "0 16px 34px -14px rgba(120,40,70,.35)" }}
  >
    <span
      aria-hidden
      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rotate-[-4deg] rounded-sm"
      style={{ background: "rgba(255,182,193,.75)", boxShadow: "0 2px 4px rgba(0,0,0,.08)" }}
    />
    <img src={photo.url} alt={photo.caption} loading="lazy" className="w-full aspect-[4/5] object-cover rounded-sm" />
    <p className="mt-3 font-hand text-xl leading-tight" style={{ color: "#6b2d3e" }}>
      {photo.caption}
    </p>
    <p className="text-xs mt-0.5" style={{ color: "#b0526b" }}>
      {photo.date}
    </p>
  </motion.button>
);

export const GallerySection = () => {
  const { photos } = birthdayData;
  const [selected, setSelected] = useState(null);
  const [burstKey, setBurstKey] = useState(0);

  return (
    <section id="gallery" data-testid="gallery-section" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="font-hand text-2xl sm:text-3xl" style={{ color: "var(--pink)" }}>
          little frozen moments
        </p>
        <h2 className="mt-2 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl" style={{ color: "var(--headline)" }}>
          Our Photo Gallery
        </h2>
        <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--muted-text)" }}>
          Tap any polaroid to relive it
        </p>
      </motion.div>

      <div className="mt-14 max-w-5xl mx-auto columns-2 md:columns-3 gap-6">
        {photos.map((p, i) => (
          <Polaroid key={i} photo={p} index={i} onOpen={setSelected} />
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            data-testid="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(26,11,18,.78)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-3 sm:p-4 pb-6 rounded-lg max-w-lg w-full"
              style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,.6)" }}
            >
              <button
                data-testid="lightbox-modal-close-button"
                onClick={() => setSelected(null)}
                aria-label="Close photo"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white"
                style={{ background: "var(--pink)" }}
              >
                <FaTimes />
              </button>
              <img
                src={photos[selected].url}
                alt={photos[selected].caption}
                className="w-full max-h-[60vh] object-cover rounded-sm"
              />
              <div className="mt-4 flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="font-hand text-2xl" style={{ color: "#6b2d3e" }}>
                    {photos[selected].caption}
                  </p>
                  <p className="text-xs" style={{ color: "#b0526b" }}>
                    {photos[selected].date}
                  </p>
                </div>
                <button
                  data-testid="lightbox-heart-reaction-button"
                  onClick={() => setBurstKey((k) => k + 1)}
                  aria-label="Send a heart"
                  className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <FaHeart style={{ color: "var(--pink)" }} />
                  {burstKey > 0 && (
                    <span key={burstKey} className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="absolute left-1/2 top-1/2"
                          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                          animate={{ opacity: 0, x: (i - 2.5) * 18, y: -44 - i * 6, scale: 1.1 }}
                          transition={{ duration: 0.9, delay: i * 0.05 }}
                        >
                          <FaHeart style={{ color: "var(--rose)", fontSize: 9 + i }} />
                        </motion.span>
                      ))}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
