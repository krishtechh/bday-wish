import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFire, FaWind, FaCheck, FaBirthdayCake } from "react-icons/fa";
import { birthdayData } from "../data/birthdayData";

const STEPS = ["Flavor", "Candles", "Light", "Wish"];

const Candle = ({ lit, blown, index }) => (
  <div className="flex flex-col items-center">
    <div className="h-6 flex items-end justify-center">
      {lit && !blown && <div className="flame" />}
      {blown && (
        <motion.div
          initial={{ opacity: 0.9, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -34, scale: 1.6 }}
          transition={{ duration: 1.4, delay: index * 0.08 }}
          className="w-3 h-3 rounded-full"
          style={{ background: "rgba(160,150,160,.55)", filter: "blur(2px)" }}
        />
      )}
    </div>
    <div className="candle-stick w-2 h-10 rounded-full" style={{ boxShadow: "inset -1px 0 2px rgba(0,0,0,.15)" }} />
  </div>
);

export const CakeBuilderSection = ({ onBlow }) => {
  const { flavors } = birthdayData;
  const [flavor, setFlavor] = useState(flavors[2]);
  const [candleCount, setCandleCount] = useState(3);
  const [added, setAdded] = useState(false);
  const [lit, setLit] = useState(false);
  const [blown, setBlown] = useState(false);

  const step = blown ? 4 : lit ? 3 : added ? 2 : 1;

  const handleBlow = () => {
    setBlown(true);
    setLit(false);
    onBlow?.();
  };

  return (
    <section id="cake" data-testid="cake-builder-section" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="font-hand text-2xl sm:text-3xl" style={{ color: "var(--pink)" }}>
          baked with love
        </p>
        <h2 className="mt-2 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl" style={{ color: "var(--headline)" }}>
          Build Your Birthday Cake
        </h2>
      </motion.div>

      <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              data-testid={`cake-step-indicator-${i + 1}`}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500"
              style={{
                background: step > i ? "var(--pink)" : "var(--surface)",
                color: step > i ? "#fff" : "var(--muted-text)",
                border: "1px solid var(--surface-border)",
              }}
            >
              {step > i + 1 ? <FaCheck /> : i + 1}
            </span>
            <span className="text-xs sm:text-sm hidden sm:inline" style={{ color: step > i ? "var(--headline)" : "var(--muted-text)" }}>
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="w-5 sm:w-8 h-px" style={{ background: "var(--surface-border)" }} />}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-xl mx-auto">
        {flavors.map((f) => (
          <button
            key={f.id}
            data-testid={`cake-flavor-${f.id}-button`}
            onClick={() => !added && setFlavor(f)}
            disabled={added}
            className="px-4 py-2 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed"
            style={{
              background: flavor.id === f.id ? "var(--pink)" : "var(--surface)",
              color: flavor.id === f.id ? "#fff" : "var(--body-text)",
              border: "1px solid var(--surface-border)",
              opacity: added && flavor.id !== f.id ? 0.4 : 1,
            }}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="relative mt-14 flex flex-col items-center">
        <AnimatePresence>
          {blown && (
            <motion.p
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-2 font-hand text-3xl z-20"
              style={{ color: "var(--pink)" }}
            >
              Your wish is on its way ✨
            </motion.p>
          )}
        </AnimatePresence>

        <div className="relative flex flex-col items-center justify-end h-[290px] mt-6">
          {added && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-3 mb-0.5 z-10"
            >
              {Array.from({ length: candleCount }).map((_, i) => (
                <Candle key={i} lit={lit} blown={blown} index={i} />
              ))}
            </motion.div>
          )}

          <motion.div
            key={flavor.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-12 rounded-t-xl relative" style={{ background: flavor.top }}>
              <div className="absolute top-0 inset-x-0 h-3.5 rounded-t-xl" style={{ background: flavor.icing }} />
            </div>
            <div className="w-52 h-14 rounded-t-lg relative -mt-1" style={{ background: flavor.mid }}>
              <div className="absolute top-0 inset-x-0 h-3.5 rounded-t-lg" style={{ background: flavor.icing }} />
            </div>
            <div className="w-64 h-16 rounded-t-lg relative -mt-1" style={{ background: flavor.base }}>
              <div className="absolute top-0 inset-x-0 h-3.5 rounded-t-lg" style={{ background: flavor.icing }} />
              <div className="absolute inset-x-4 top-7 flex justify-between opacity-70">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: ["#fff", "var(--gold)", "#FF6B8B"][i % 3] }}
                  />
                ))}
              </div>
            </div>
            <div
              className="w-72 h-4 rounded-[50%] -mt-1"
              style={{ background: "linear-gradient(180deg,#fff,var(--bg-secondary))", boxShadow: "0 14px 26px -12px rgba(120,40,70,.35)" }}
            />
          </motion.div>
        </div>

        <p className="mt-4 font-hand text-2xl" style={{ color: "var(--pink)" }}>
          {flavor.name} Dream Cake
        </p>

        <div className="mt-8 w-full max-w-md flex flex-col items-center gap-5">
          {!added && (
            <div className="w-full glass rounded-2xl p-5 flex flex-col items-center gap-3">
              <label className="text-sm font-medium" style={{ color: "var(--headline)" }}>
                How many candles? <strong style={{ color: "var(--pink)" }}>{candleCount}</strong>
              </label>
              <input
                data-testid="cake-candles-slider"
                type="range"
                min="1"
                max="10"
                value={candleCount}
                onChange={(e) => setCandleCount(parseInt(e.target.value, 10))}
                className="w-full"
                style={{ accentColor: "var(--pink)" }}
              />
              <motion.button
                data-testid="add-candles-button"
                onClick={() => setAdded(true)}
                whileTap={{ scale: 0.94 }}
                className="mt-1 px-6 py-3 rounded-full text-white font-semibold text-sm inline-flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,var(--pink),var(--rose))", boxShadow: "0 12px 30px -10px var(--glow)" }}
              >
                <FaBirthdayCake /> Add Candles
              </motion.button>
            </div>
          )}

          {added && !lit && !blown && (
            <motion.button
              data-testid="light-candles-button"
              onClick={() => setLit(true)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.94 }}
              className="px-7 py-3.5 rounded-full text-white font-semibold inline-flex items-center gap-2"
              style={{ background: "linear-gradient(135deg,var(--gold),#F0B429)", boxShadow: "0 12px 30px -10px rgba(229,169,60,.5)" }}
            >
              <FaFire /> Light the Candles
            </motion.button>
          )}

          {lit && !blown && (
            <motion.button
              data-testid="blow-candles-button"
              onClick={handleBlow}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              transition={{ scale: { repeat: Infinity, duration: 1.4 } }}
              whileTap={{ scale: 0.92 }}
              className="px-8 py-4 rounded-full text-white font-bold text-lg inline-flex items-center gap-3"
              style={{ background: "linear-gradient(135deg,var(--pink),#D6336C)", boxShadow: "0 16px 40px -10px var(--glow)" }}
            >
              <FaWind /> Make A Wish & Blow
            </motion.button>
          )}

          {blown && (
            <motion.button
              data-testid="go-to-celebration-button"
              onClick={() => document.getElementById("celebration")?.scrollIntoView({ behavior: "smooth" })}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="px-7 py-3.5 rounded-full font-semibold glass inline-flex items-center gap-2"
              style={{ color: "var(--pink)" }}
            >
              Continue the Celebration →
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};
