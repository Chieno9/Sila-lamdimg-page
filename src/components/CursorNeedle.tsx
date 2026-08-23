import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "motion/react";

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export const CursorNeedle: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const [sparkles, setSparkles] = useState<CursorSparkle[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Progressively heavier springs to create an organic organic fluid lace of thread
  const cursorX = useSpring(mouseX, { damping: 30, stiffness: 350, mass: 0.3 });
  const cursorY = useSpring(mouseY, { damping: 30, stiffness: 350, mass: 0.3 });

  const trail1X = useSpring(cursorX, { damping: 25, stiffness: 180, mass: 0.5 });
  const trail1Y = useSpring(cursorY, { damping: 25, stiffness: 180, mass: 0.5 });

  const trail2X = useSpring(trail1X, { damping: 20, stiffness: 100, mass: 0.6 });
  const trail2Y = useSpring(trail1Y, { damping: 20, stiffness: 100, mass: 0.6 });

  // Use velocity to stretch the cursor elastically
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  // Stretch calculations
  const skewXRaw = useTransform(velocityX, [-3000, 3000], [-35, 35]);
  const skewYRaw = useTransform(velocityY, [-3000, 3000], [-35, 35]);
  
  const skewX = useSpring(skewXRaw, { stiffness: 400, damping: 25 });
  const skewY = useSpring(skewYRaw, { stiffness: 400, damping: 25 });

  const trailPath = useTransform(
    [cursorX, cursorY, trail1X, trail1Y, trail2X, trail2Y],
    ([cx, cy, t1x, t1y, t2x, t2y]) => 
      `M ${t2x} ${t2y} Q ${t1x} ${t1y} ${cx} ${cy}`
  );

  // Sparkle physics ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => 
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            opacity: s.opacity - 0.045,
            size: s.size * 0.94,
          }))
          .filter((s) => s.opacity > 0)
      );
    }, 16); // ~60fps movement

    return () => clearInterval(interval);
  }, [sparkles.length]);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      return;
    }
    
    setIsVisible(true);
    document.body.classList.add("has-custom-cursor");

    let moveCount = 0;
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      moveCount++;
      // Spawn a trailing star every 3 mouse moves
      if (moveCount % 3 === 0) {
        const colors = ["#004C73", "#00304D", "#004C73", "#00304D", "#004C73"];
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];
        const newSparkle: CursorSparkle = {
          id: Math.random() + Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 10 + 6,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.3) * 1.5 + 0.8, // slight downward fall
          opacity: 1.0,
          color: selectedColor,
        };
        setSparkles((prev) => [...prev.slice(-18), newSparkle]); // cap trail length
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer");

      if (interactiveEl) {
        setIsHovered(true);
        const el = target.closest("button") || target.closest("a") || target;
        const rect = el.getBoundingClientRect();
        setTargetPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      } else {
        setIsHovered(false);
        setTargetPos(null);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const currentAccent = "#0085CA";

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-visible">
      {/* 0. Trailing floating sparkles */}
      {sparkles.map((s) => (
        <svg
          key={s.id}
          className="absolute pointer-events-none overflow-visible animate-pulse"
          style={{
            left: s.x,
            top: s.y,
            width: `${s.size}px`,
            height: `${s.size}px`,
            transform: "translate(-50%, -50%) rotate(45deg)",
            opacity: s.opacity,
          }}
          viewBox="0 0 24 24"
        >
          <path
            d="M12,0 C12,12 12,12 24,12 C12,12 12,12 12,24 C12,12 12,12 0,12 C12,12 12,12 12,0 Z"
            fill={s.color}
            style={{ filter: "drop-shadow(0 0 3px rgba(11,20,32,0.35))" }}
          />
        </svg>
      ))}

      {/* 1. Sila Fluid Trail: Curved trace matching our weaved connections */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        {/* Draw main trailing arc */}
        <motion.path
          d={trailPath}
          stroke={currentAccent}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity={isHovered ? 0.4 : 0.85}
        />

        {/* Snapping laser alignment line */}
        {isHovered && targetPos && (
          <motion.line
            x1={cursorX}
            y1={cursorY}
            x2={targetPos.x}
            y2={targetPos.y}
            stroke={currentAccent}
            strokeWidth="1.0"
            strokeDasharray="4 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
          />
        )}
      </svg>

      {/* 2. Primary elastic physical snapping cursor center */}
      <motion.div
        className="absolute w-8 h-8 -left-4 -top-4 flex items-center justify-center will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          skewX: skewX,
          skewY: skewY,
        }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center"
          animate={{
            width: isHovered ? "32px" : "12px",
            height: isHovered ? "32px" : "12px",
            border: isHovered ? `1px solid ${currentAccent}` : "1px solid rgba(11, 20, 32, 0.3)",
            backgroundColor: isHovered ? "rgba(0, 133, 202, 0.12)" : "rgba(11, 20, 32, 0.05)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Micro-dot beacon */}
          <motion.div
            className="rounded-full shadow-[0_0_10px_rgba(0,133,202,0.7)]"
            animate={{
              width: isHovered ? "6px" : "5px",
              height: isHovered ? "6px" : "5px",
              backgroundColor: isHovered ? currentAccent : "#0B1420",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
