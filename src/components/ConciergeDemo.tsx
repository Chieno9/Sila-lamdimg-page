import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Circle, Bot } from "lucide-react";
import { BrutalistTypewriter } from "./BrutalistTypewriter";

const USER_MESSAGE = "build me an agent that turns our CSV exports into a weekly dashboard";
const USER_TYPE_SPEED = 28;

const CHECKLIST = [
  { label: "CSV parser wired", done: true },
  { label: "Dashboard template selected", done: true },
  { label: "Awaiting your review", done: false },
];

const DRAFTING_DELAY = USER_MESSAGE.length * USER_TYPE_SPEED + 400;
const CHECKLIST_STAGGER = 550;
const CHECKLIST_START = DRAFTING_DELAY + 700;
const HOLD_AFTER_COMPLETE = 3200;
const CYCLE_LENGTH =
  CHECKLIST_START + CHECKLIST.length * CHECKLIST_STAGGER + HOLD_AFTER_COMPLETE;

export const ConciergeDemo: React.FC = () => {
  const [cycle, setCycle] = useState(0);
  const [showDrafting, setShowDrafting] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);
  const [robotEmbiggened, setRobotEmbiggened] = useState(false);
  const embiggenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (embiggenTimeoutRef.current) clearTimeout(embiggenTimeoutRef.current);
    };
  }, []);

  const handleRobotClick = () => {
    setRobotEmbiggened(true);
    if (embiggenTimeoutRef.current) clearTimeout(embiggenTimeoutRef.current);
    embiggenTimeoutRef.current = setTimeout(() => setRobotEmbiggened(false), 5000);
  };

  useEffect(() => {
    setShowDrafting(false);
    setVisibleRows(0);

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setShowDrafting(true), DRAFTING_DELAY));

    CHECKLIST.forEach((_, idx) => {
      timers.push(
        setTimeout(
          () => setVisibleRows((n) => n + 1),
          CHECKLIST_START + idx * CHECKLIST_STAGGER
        )
      );
    });

    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE_LENGTH));

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="relative w-full max-w-sm bg-surface border-2 border-[#0B1420] shadow-[4px_4px_0_0_#FF6A3D] p-5 md:p-6 font-mono">
      {/* Tiny robot patrolling and hopping along the top edge */}
      <div
        className="sila-robot-walk -top-4 pointer-events-none"
        style={{ animationPlayState: robotEmbiggened ? "paused" : "running" }}
      >
        <div
          onClick={handleRobotClick}
          className={`pointer-events-auto cursor-pointer text-[#0085CA] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${robotEmbiggened ? "z-20" : ""}`}
          style={{ transform: robotEmbiggened ? "scale(3.5) rotate(180deg)" : "scale(1) rotate(0deg)" }}
        >
          <Bot className="w-4 h-4" strokeWidth={2.5} />
        </div>
      </div>

      <div key={cycle}>
        {/* Header bar */}
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#0B1420]/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0085CA] animate-pulse" />
          <span className="text-[9px] font-bold text-[#0B1420]/50 tracking-widest uppercase">
            SILA_CONCIERGE // BUILD_MODE
          </span>
        </div>

        {/* Transcript */}
        <div className="flex flex-col gap-4 min-h-[150px]">
          <div>
            <span className="text-[10px] font-bold text-[#0B1420]/45 tracking-widest uppercase block mb-1">
              YOU
            </span>
            <p className="text-xs text-[#0B1420] leading-relaxed">
              <BrutalistTypewriter
                text={USER_MESSAGE}
                speed={USER_TYPE_SPEED}
                triggerOnScroll={false}
              />
            </p>
          </div>

          <AnimatePresence>
            {showDrafting && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] font-bold text-[#0085CA] tracking-widest uppercase block mb-2">
                  SILA
                </span>
                <p className="text-xs text-[#0B1420]/70 mb-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0085CA] animate-pulse mr-2" />
                  drafting agent...
                </p>

                <div className="flex flex-col gap-1.5">
                  {CHECKLIST.slice(0, visibleRows).map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-[11px]"
                    >
                      {item.done ? (
                        <Check className="w-3 h-3 text-[#0085CA] shrink-0" strokeWidth={2.5} />
                      ) : (
                        <Circle className="w-3 h-3 text-[#0B1420]/40 shrink-0" strokeWidth={2.5} />
                      )}
                      <span className={item.done ? "text-[#0B1420]/70" : "text-[#0B1420]/40"}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer badge */}
        <AnimatePresence>
          {visibleRows >= CHECKLIST.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 mt-5 pt-4 border-t border-[#0B1420]/10"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest bg-[#0085CA]/10 text-[#0085CA] border border-[#0085CA]/30 px-2.5 py-1">
                DRAFT + UNVETTED
              </span>
              <span className="text-[9px] text-[#0B1420]/40 uppercase tracking-widest">
                awaiting approval
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
