import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AGENTS } from "../data";

interface TimelineNode {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  energy: string;
  status: string;
  initials: string;
}

// Deploy-timeline-only stats layered onto the shared AGENTS catalogue (see ../data)
// so agent name/tagline/description/capabilities have a single source of truth.
const AGENT_DEPLOY_STATS: Record<string, { energy: string; status: string }> = {
  "dashboard-wizard": { energy: "████████░░ 82%", status: "READY" },
  "meetings-booker": { energy: "█████████░ 88%", status: "READY" },
  "pdd-agent": { energy: "███████░░░ 74%", status: "READY" }
};

const ORBIT_NODES: TimelineNode[] = AGENTS.map((agent) => ({
  id: agent.id,
  name: agent.name.toUpperCase().replace(/\s+/g, "_"),
  tagline: agent.tagline,
  description: agent.description,
  capabilities: agent.capabilities,
  initials: agent.initials,
  ...(AGENT_DEPLOY_STATS[agent.id] ?? { energy: "██████████ 100%", status: "READY" })
}));

export const BrutalistTimeline: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>("dashboard-wizard");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    let frameId: number;
    const tick = () => {
      setRotationAngle((prev) => (prev + 0.05) % 360);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeNode = ORBIT_NODES.find((node) => node.id === activeNodeId) || ORBIT_NODES[0];

  return (
    <>
      {/* Box 1: Orbit visual */}
      <div className="relative h-full min-h-[380px] flex items-center justify-center border-2 border-[#0B1420] shadow-[4px_4px_0_0_#0085CA] bg-surface-mute overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(11,20,32,0.07)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <svg className="w-[300px] h-[300px] md:w-[360px] md:h-[360px] overflow-visible z-10" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(11, 20, 32, 0.15)" strokeWidth="1" />

          {ORBIT_NODES.map((node, index) => {
            const angleOffset = (index * 120 * Math.PI) / 180;
            const currentAngle = (rotationAngle * Math.PI) / 180 + angleOffset;
            const nodeX = 200 + 120 * Math.cos(currentAngle);
            const nodeY = 200 + 120 * Math.sin(currentAngle);
            return (
              <line
                key={`line-${node.id}`}
                x1="200" y1="200" x2={nodeX} y2={nodeY}
                stroke="rgba(11, 20, 32, 0.15)" strokeDasharray="3 3" strokeWidth="1"
              />
            );
          })}

          {ORBIT_NODES.map((node, index) => {
            const angleOffset = (index * 120 * Math.PI) / 180;
            const currentAngle = (rotationAngle * Math.PI) / 180 + angleOffset;
            const nodeX = 200 + 120 * Math.cos(currentAngle);
            const nodeY = 200 + 120 * Math.sin(currentAngle);
            const isActive = activeNode.id === node.id;
            const isHovered = hoveredNodeId === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Larger invisible hit area for easier hover/click */}
                <circle cx={nodeX} cy={nodeY} r="22" fill="transparent" />

                {isActive && (
                  <circle
                    cx={nodeX} cy={nodeY} r="24" fill="none" stroke="#0085CA" strokeWidth="1"
                    className="animate-ping opacity-25"
                  />
                )}
                <circle
                  cx={nodeX} cy={nodeY} r="14"
                  fill={isActive ? "#0085CA" : isHovered ? "rgba(11,20,32,0.18)" : "var(--surface)"}
                  stroke={isActive ? "#0085CA" : "rgba(11, 20, 32, 0.2)"}
                  strokeWidth="1"
                  className="transition-colors duration-200"
                />
                <text
                  x={nodeX} y={nodeY + 3.5} textAnchor="middle"
                  className={`text-[9px] font-bold font-mono transition-colors duration-200 ${isActive ? "fill-black" : "fill-[#0B1420]/70"}`}
                >
                  {node.initials}
                </text>
              </g>
            );
          })}

          {/* Hover tooltip for the currently hovered orbiting node */}
          <AnimatePresence>
            {hoveredNodeId !== null && (() => {
              const index = ORBIT_NODES.findIndex((n) => n.id === hoveredNodeId);
              if (index === -1) return null;
              const node = ORBIT_NODES[index];
              const angleOffset = (index * 120 * Math.PI) / 180;
              const currentAngle = (rotationAngle * Math.PI) / 180 + angleOffset;
              const dirX = Math.cos(currentAngle);
              const dirY = Math.sin(currentAngle);
              const nodeX = 200 + 120 * dirX;
              const nodeY = 200 + 120 * dirY;
              const tooltipWidth = 128;
              const tooltipHeight = 40;
              const gap = 30;
              const anchorX = nodeX + dirX * gap;
              const anchorY = nodeY + dirY * gap;

              return (
                <motion.foreignObject
                  key={node.id}
                  x={anchorX - tooltipWidth / 2}
                  y={anchorY - tooltipHeight / 2}
                  width={tooltipWidth}
                  height={tooltipHeight}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none overflow-visible"
                >
                  <div className="bg-surface border-2 border-[#0B1420] px-2 py-1.5 shadow-[2px_2px_0_0_#0085CA] text-left">
                    <p className="font-mono text-[8px] font-bold text-[#0B1420] uppercase tracking-wide leading-tight truncate">
                      {node.name.replace(/_/g, " ")}
                    </p>
                    <p className="font-sans text-[8px] text-[#0B1420]/70 leading-snug mt-0.5 truncate">
                      {node.tagline}
                    </p>
                  </div>
                </motion.foreignObject>
              );
            })()}
          </AnimatePresence>

          <g transform="translate(200, 200)">
            <circle r="30" fill="var(--surface)" stroke="#0B1420" strokeWidth="2" />
            <circle r="26" fill="var(--surface-mute)" />
            <text y="4" textAnchor="middle" className="text-[9px] font-bold fill-[#0085CA] font-mono tracking-widest">
              SOVEREIGN
            </text>
          </g>
        </svg>

        <div className="absolute top-2 right-2 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0085CA] animate-pulse" />
          <span className="text-[7.5px] font-mono text-[#0085CA] tracking-widest">ON-PREM DEPLOY</span>
        </div>
      </div>

      {/* Box 2: Active agent detail */}
      <div className="h-full min-h-[320px] border-2 border-[#0B1420] shadow-[4px_4px_0_0_#FF6A3D] bg-surface-mute p-4 font-mono text-left relative overflow-hidden flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex justify-between items-start gap-4 flex-wrap border-b border-[#0B1420]/10 pb-2">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#0085CA]">{activeNode.name}</span>
                <span className="text-[9px] text-[#0B1420]/60 italic mt-0.5">{activeNode.tagline}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] bg-[#0085CA]/10 text-[#0085CA] border border-[#0085CA]/30 px-1.5 py-0.5 uppercase tracking-widest">
                  {activeNode.status}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#0B1420]/75 leading-relaxed font-sans">
              {activeNode.description}
            </p>

            <div className="space-y-1.5 pt-1">
              <span className="text-[8px] text-[#0B1420]/45 uppercase tracking-widest block font-bold">
                CORE CAPABILITIES:
              </span>
              {activeNode.capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[#0085CA] text-[9px]">&gt;</span>
                  <span className="text-[9.5px] text-[#0B1420]/90 font-mono">{cap}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#0B1420]/10 pt-2 mt-1">
              <div>
                <span className="text-[8px] text-[#0B1420]/45 uppercase tracking-widest block font-bold">ENERGY_WEAVE:</span>
                <span className="text-[10px] text-[#0085CA] font-mono leading-none block mt-0.5">{activeNode.energy}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#0B1420]/45 uppercase tracking-widest block font-bold">HOSTING_HOST:</span>
                <span className="text-[10px] text-[#0B1420]/80 font-mono leading-none block mt-0.5">SOVEREIGN ON-PREMISES</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
