import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export const ContinuousScrollThread: React.FC = () => {
  // Capture scroll progress
  const { scrollYProgress } = useScroll();
  
  // Spring with slight lag to mimic rope/thread tension
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <div className="absolute inset-y-0 left-[3%] md:left-[5%] w-8 md:w-16 pointer-events-none z-20 select-none">
      {/* Background guideline */}
      <div className="absolute inset-y-0 left-[15.5px] w-[1px] bg-line border-l border-dashed" style={{ strokeDasharray: "4 4" }} />

      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* At-rest thin connecting line (1.5px, grey) */}
        <path
          d="
            M 16 0 
            L 16 250 
            C 16 280, 48 300, 48 320 
            C 48 340, 16 360, 16 380
            L 16 950 
            C 16 980, -16 1000, -16 1020
            C -16 1040, 16 1060, 16 1080
            L 16 1850
            C 16 1880, 48 1900, 48 1920
            C 48 1940, 16 1960, 16 1980
            L 16 2700
            C 16 2730, -16 2750, -16 2770
            C -16 2790, 16 2810, 16 2830
            L 16 3500
            C 16 3530, 48 3550, 48 3570
            C 48 3590, 16 3610, 16 3630
            L 16 4300
            C 16 4330, -16 4350, -16 4370
            C -16 4390, 16 4410, 16 4430
            L 16 5200
            C 16 5230, 48 5250, 48 5270
            C 48 5290, 16 5310, 16 5330
            L 16 6500
            C 16 6550, 64 6600, 16 6650
            C -32 6700, 16 6750, 16 6800
            L 16 35000
          "
          stroke="var(--line)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Scroll-driven active crimson line (1.5px) */}
        <motion.path
          d="
            M 16 0 
            L 16 250 
            C 16 280, 48 300, 48 320 
            C 48 340, 16 360, 16 380
            L 16 950 
            C 16 980, -16 1000, -16 1020
            C -16 1040, 16 1060, 16 1080
            L 16 1850
            C 16 1880, 48 1900, 48 1920
            C 48 1940, 16 1960, 16 1980
            L 16 2700
            C 16 2730, -16 2750, -16 2770
            C -16 2790, 16 2810, 16 2830
            L 16 3500
            C 16 3530, 48 3550, 48 3570
            C 48 3590, 16 3610, 16 3630
            L 16 4300
            C 16 4330, -16 4350, -16 4370
            C -16 4390, 16 4410, 16 4430
            L 16 5200
            C 16 5230, 48 5250, 48 5270
            C 48 5290, 16 5310, 16 5330
            L 16 6500
            C 16 6550, 64 6600, 16 6650
            C -32 6700, 16 6750, 16 6800
            L 16 35000
          "
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength: pathProgress,
          }}
        />

        {/* Precise modern nodes along the line */}
        <g>
          {/* Node 1: Hero Node */}
          <circle cx="16" cy="320" r="7" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1.5" />
          <motion.circle
            cx="16"
            cy="320"
            r="3"
            fill="var(--accent)"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: [1, 1.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          />

          {/* Node 2: Problems Node */}
          <circle cx="16" cy="1020" r="7" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1.5" />
          <motion.circle
            cx="16"
            cy="1020"
            r="3"
            fill="var(--accent)"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: [1, 1.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          />

          {/* Node 3: Solutions Node */}
          <circle cx="16" cy="1920" r="7" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1.5" />
          <motion.circle
            cx="16"
            cy="1920"
            r="3"
            fill="var(--accent)"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: [1, 1.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          />

          {/* Node 4: Features Node */}
          <circle cx="16" cy="2770" r="7" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1.5" />
          <motion.circle
            cx="16"
            cy="2770"
            r="3"
            fill="var(--accent)"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: [1, 1.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          />

          {/* Node 5: Sovereignty Node */}
          <circle cx="16" cy="4370" r="7" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1.5" />
          <motion.circle
            cx="16"
            cy="4370"
            r="3"
            fill="var(--sovereign)" // Sovereign green
            initial={{ scale: 0.5 }}
            whileInView={{ scale: [1, 1.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          />
        </g>
      </svg>
    </div>
  );
};

// Clean thin vertical or custom connectors for sections (instead of old Sadu curves)
interface SectionConnectorProps {
  color?: "default" | "accent" | "sovereign";
  height?: number;
  direction?: "straight" | "curve-right" | "curve-left";
}

export const SectionConnector: React.FC<SectionConnectorProps> = ({
  color = "default",
  height = 80,
  direction = "straight",
}) => {
  const hexColor = {
    default: "var(--line)",
    accent: "var(--accent)",
    sovereign: "var(--sovereign)",
  }[color];

  return (
    <div className="w-full flex justify-center pointer-events-none select-none relative overflow-visible" style={{ height }}>
      <svg className="w-full h-full overflow-visible" fill="none">
        {direction === "straight" && (
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke={hexColor}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )}
        {direction === "curve-right" && (
          <path
            d={`M 50% 0 C 50% ${height / 2}, 55% ${height / 2}, 55% ${height}`}
            stroke={hexColor}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )}
        {direction === "curve-left" && (
          <path
            d={`M 50% 0 C 50% ${height / 2}, 45% ${height / 2}, 45% ${height}`}
            stroke={hexColor}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )}
        {/* Centered Node: 1px minimalist circle */}
        <circle
          cx="50%"
          cy="50%"
          r="5"
          fill="var(--canvas)"
          stroke={hexColor}
          strokeWidth="1"
        />
        <circle
          cx="50%"
          cy="50%"
          r="1.5"
          fill={color === "accent" ? "var(--accent)" : color === "sovereign" ? "var(--sovereign)" : "var(--line)"}
        />
      </svg>
    </div>
  );
};
