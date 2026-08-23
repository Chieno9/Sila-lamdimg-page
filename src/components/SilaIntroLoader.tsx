import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SilaIntroLoaderProps {
  onComplete: () => void;
}

interface StatusStep {
  threshold: number;
  text: string;
}

const STATUS_STEPS: StatusStep[] = [
  { threshold: 0, text: "INITIALIZING SOVEREIGN NETWORK" },
  { threshold: 34, text: "SECURING CONNECTORS" },
  { threshold: 67, text: "LOADING GOVERNED AGENTS" },
  { threshold: 100, text: "READY" },
];

export const SilaIntroLoader: React.FC<SilaIntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 9) + 4);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const activeStatus = [...STATUS_STEPS].reverse().find((s) => progress >= s.threshold)!;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-[#D9EDFB] text-[#0B1420] z-[9999] flex flex-col items-center justify-center gap-8 font-mono select-none overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,133,202,0.07)_0%,transparent_60%)] pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-extrabold uppercase text-[#0B1420] text-6xl md:text-8xl tracking-tight relative z-10"
      >
        SILA
      </motion.h1>

      <div className="w-full max-w-xs flex flex-col items-center gap-3 relative z-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeStatus.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] text-[#0B1420]/50 tracking-widest uppercase"
          >
            {activeStatus.text}
          </motion.span>
        </AnimatePresence>

        <div className="w-full h-[2px] bg-[#0B1420]/10 overflow-hidden">
          <motion.div
            className="h-full bg-[#0085CA]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>

        <span className="text-[9px] text-[#0B1420]/35 tracking-[0.3em] uppercase">
          ON-PREMISES · GOVERNED · YOURS
        </span>
      </div>
    </motion.div>
  );
};
