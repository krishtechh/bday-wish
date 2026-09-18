import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaHeart } from "react-icons/fa";

const FREQ = { G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const MELODY = [
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 1.9],
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 1.9],
  ["G4", 0.75], ["G4", 0.25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 1.9],
  ["F5", 0.75], ["F5", 0.25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 2.2],
];
const BEAT = 0.42;
const LOOP_TOTAL = MELODY.reduce((s, [, d]) => s + d, 0) * BEAT;

export const MusicPlayer = ({ autoStart }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [panelOpen, setPanelOpen] = useState(false);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const timerRef = useRef(null);

  const scheduleLoop = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    let t = ctx.currentTime + 0.08;
    MELODY.forEach(([note, d]) => {
      const dur = d * BEAT;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = FREQ[note];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.9, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.92);
      osc.connect(g).connect(masterRef.current);
      osc.start(t);
      osc.stop(t + dur);
      t += dur;
    });
    timerRef.current = setTimeout(scheduleLoop, LOOP_TOTAL * 1000 + 800);
  };

  const start = () => {
    if (ctxRef.current) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    ctx.resume();
    const master = ctx.createGain();
    master.gain.value = volume * 0.22;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    scheduleLoop();
    setPlaying(true);
  };

  const stop = () => {
    clearTimeout(timerRef.current);
    ctxRef.current?.close();
    ctxRef.current = null;
    masterRef.current = null;
    setPlaying(false);
  };

  useEffect(() => {
    if (autoStart) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  useEffect(() => {
    if (masterRef.current) masterRef.current.gain.value = volume * 0.22;
  }, [volume]);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      ctxRef.current?.close();
    },
    []
  );

  return (
    <div className="fixed bottom-4 left-4 z-[80] flex flex-col items-start gap-2">
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            data-testid="music-volume-panel"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
          >
            <FaVolumeUp style={{ color: "var(--pink)" }} />
            <input
              data-testid="music-volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-28"
              style={{ accentColor: "var(--pink)" }}
              aria-label="Volume"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <motion.button
          data-testid="music-player-toggle"
          onClick={() => (playing ? stop() : start())}
          aria-label={playing ? "Pause music" : "Play music"}
          className="relative w-14 h-14 rounded-full glass flex items-center justify-center overflow-hidden"
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.06 }}
        >
          <div
            data-testid="music-player-disc"
            className="absolute inset-1 rounded-full"
            style={{
              background: "repeating-radial-gradient(circle, #3a1622 0 2px, #57202f 2px 4px)",
              animation: "spinSlow 3.5s linear infinite",
              animationPlayState: playing ? "running" : "paused",
            }}
          />
          <div className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--pink)" }}>
            {playing ? <FaPause className="text-white text-[10px]" /> : <FaPlay className="text-white text-[10px] ml-0.5" />}
          </div>
        </motion.button>

        <button
          data-testid="music-volume-toggle-button"
          onClick={() => setPanelOpen((o) => !o)}
          aria-label="Volume control"
          className="w-9 h-9 rounded-full glass flex items-center justify-center"
          style={{ color: "var(--pink)" }}
        >
          <FaVolumeUp className="text-xs" />
        </button>

        {playing && (
          <div className="flex items-end gap-0.5 h-5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full"
                style={{ background: "var(--pink)" }}
                animate={{ height: ["30%", "100%", "45%", "85%", "30%"] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
