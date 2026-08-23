import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AGENTS } from "../data";
import { Agent } from "../types";
import { ModernCard, ModernBadge } from "./ModernComponents";
import { ArrowRight } from "lucide-react";

export const KnotworkHub: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHoveredOrbit, setIsHoveredOrbit] = useState(false);
  const [hoveredAgentIndex, setHoveredAgentIndex] = useState<number | null>(null);
  const [linkedAgents, setLinkedAgents] = useState<Record<string, boolean>>({
    "dashboard-wizard": true,
    "meetings-booker": true,
    "pdd-agent": true,
  });
  const [linkingId, setLinkingId] = useState<string | null>(null);

  // Slow, precise rotation of the orbits, paused on hover
  useEffect(() => {
    if (isHoveredOrbit) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.25) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isHoveredOrbit]);

  const handleToggleLink = (agentId: string) => {
    if (linkedAgents[agentId]) {
      setLinkedAgents(prev => ({
        ...prev,
        [agentId]: false
      }));
    } else {
      setLinkingId(agentId);
      setTimeout(() => {
        setLinkedAgents(prev => ({
          ...prev,
          [agentId]: true
        }));
        setLinkingId(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full flex flex-col gap-16 py-12" dir="ltr">
      {/* 1. Orbit Visual & Expanded Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Modern Minimalist Node Graph */}
        <div 
          className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center min-h-[380px] md:min-h-[420px] relative select-none"
          onMouseEnter={() => setIsHoveredOrbit(true)}
          onMouseLeave={() => setIsHoveredOrbit(false)}
        >
          {/* Faint subtle background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(11,20,32,0.18)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          <svg className="w-[320px] h-[320px] md:w-[380px] md:h-[380px] overflow-visible" viewBox="0 0 400 400">
            {/* 1px clean grey orbit ring */}
            <circle
              cx="200"
              cy="200"
              r="110"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
            />

            {/* Connection Lines (Graphed Weave) from Center to Nodes */}
            {AGENTS.map((agent, index) => {
              const angleDeg = (index * 120) + rotationAngle;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              const nodeX = 200 + 110 * Math.cos(angleRad);
              const nodeY = 200 + 110 * Math.sin(angleRad);
              const isActive = selectedAgent.id === agent.id;
              const isLinked = linkedAgents[agent.id];
              
              return (
                <g key={agent.id}>
                  {/* Gray connecting Line */}
                  <line
                    x1="200"
                    y1="200"
                    x2={nodeX}
                    y2={nodeY}
                    stroke={isActive ? "var(--accent)" : (isLinked ? "#0085CA" : "var(--line)")}
                    strokeWidth={isActive ? "1.5" : "1"}
                    className="transition-colors duration-300"
                  />
                  {/* Subtle progress flow indicator on line */}
                  {isActive && (
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="2"
                      fill="var(--accent)"
                      animate={{
                        cx: [200, nodeX],
                        cy: [200, nodeY]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  {isLinked && !isActive && (
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="2"
                      fill="#0085CA"
                      animate={{
                        cx: [200, nodeX],
                        cy: [200, nodeY]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "linear"
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* CENTER NODE: "SILA" */}
            <g transform="translate(200, 200)">
              <circle r="26" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
              <circle r="22" fill="var(--canvas)" />
              <text
                y="5"
                textAnchor="middle"
                className="text-xs font-bold fill-ink select-none pointer-events-none font-mono"
              >
                SILA
              </text>
            </g>

            {/* 3 Orbiting Agent Nodes */}
            {AGENTS.map((agent, index) => {
              const angleDeg = (index * 120) + rotationAngle;
              const angleRad = (angleDeg * Math.PI) / 180;
              const nodeX = 200 + 110 * Math.cos(angleRad);
              const nodeY = 200 + 110 * Math.sin(angleRad);
              const isActive = selectedAgent.id === agent.id;
              const isLinked = linkedAgents[agent.id];

              return (
                <g
                  key={agent.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedAgent(agent)}
                  onMouseEnter={() => setHoveredAgentIndex(index)}
                  onMouseLeave={() => setHoveredAgentIndex((prev) => (prev === index ? null : prev))}
                >
                  {/* Larger invisible hit area for easier hover/click */}
                  <circle cx={nodeX} cy={nodeY} r="22" fill="transparent" />

                  {/* Ring Pulse when active or linking */}
                  {(isActive || linkingId === agent.id) && (
                    <motion.circle
                      cx={nodeX}
                      cy={nodeY}
                      r="22"
                      fill="none"
                      stroke={linkingId === agent.id ? "var(--accent)" : "rgba(0, 133, 202, 0.2)"}
                      strokeWidth="1.5"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* Secondary subtle green ring for Linked nodes */}
                  {isLinked && !isActive && (
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r="20"
                      fill="none"
                      stroke="#0085CA"
                      strokeWidth="1"
                      className="opacity-60 animate-pulse pointer-events-none"
                    />
                  )}

                  <circle
                    cx={nodeX}
                    cy={nodeY}
                    r="15"
                    fill="var(--surface)"
                    stroke={isActive ? "var(--accent)" : (isLinked ? "#0085CA" : "var(--line)")}
                    strokeWidth="1.5"
                    className="transition-colors duration-300"
                  />

                  <circle
                    cx={nodeX}
                    cy={nodeY}
                    r="5"
                    fill={isActive ? "var(--accent)" : (isLinked ? "#0085CA" : "var(--line)")}
                    className="transition-colors duration-300"
                  />

                  <text
                    x={nodeX}
                    y={nodeY - 20}
                    textAnchor="middle"
                    fill={isActive ? "var(--accent)" : (isLinked ? "#0085CA" : "var(--ink-soft)")}
                    className="font-mono text-[9px] font-bold select-none pointer-events-none"
                  >
                    {agent.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            {/* Hover tooltip for the currently hovered orbiting agent node */}
            <AnimatePresence>
              {hoveredAgentIndex !== null && (() => {
                const agent = AGENTS[hoveredAgentIndex];
                const angleDeg = (hoveredAgentIndex * 120) + rotationAngle;
                const angleRad = (angleDeg * Math.PI) / 180;
                const dirX = Math.cos(angleRad);
                const dirY = Math.sin(angleRad);
                const nodeX = 200 + 110 * dirX;
                const nodeY = 200 + 110 * dirY;
                const tooltipWidth = 128;
                const tooltipHeight = 40;
                const gap = 30;
                const anchorX = nodeX + dirX * gap;
                const anchorY = nodeY + dirY * gap;

                return (
                  <motion.foreignObject
                    key={agent.id}
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
                    <div className="bg-surface border-2 border-ink px-2 py-1.5 shadow-[2px_2px_0_0_var(--accent)] text-left">
                      <p className="font-mono text-[8px] font-bold text-ink uppercase tracking-wide leading-tight truncate">
                        {agent.name}
                      </p>
                      <p className="font-sans text-[8px] text-ink-soft leading-snug mt-0.5 truncate">
                        {agent.tagline}
                      </p>
                    </div>
                  </motion.foreignObject>
                );
              })()}
            </AnimatePresence>
          </svg>

          {/* Fully Interactive minimal cycle button */}
          <button 
            type="button"
            onClick={() => {
              const currentIndex = AGENTS.findIndex(a => a.id === selectedAgent.id);
              const nextAgent = AGENTS[(currentIndex + 1) % AGENTS.length];
              setSelectedAgent(nextAgent);
              setLinkedAgents(prev => ({
                ...prev,
                [nextAgent.id]: true
              }));
            }}
            className="absolute bottom-2 flex items-center gap-1.5 px-4 py-1.5 bg-surface hover:bg-surface-mute active:scale-95 transition-all outline-none border border-line rounded-full cursor-pointer select-none justify-start"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            <span className="font-sans text-[10px] font-bold text-ink-soft hover:text-accent uppercase tracking-widest transition-colors duration-200">
              TAP TO CYCLE & EXPLORE AGENTS
            </span>
          </button>
        </div>

        {/* Right Side: Clean Expanded Detail Card */}
        <div className="col-span-1 lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAgent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ModernCard active={true} className="border border-line" style={{ textAlign: "left" }}>
                <div className="flex justify-between items-start border-b border-line pb-4 mb-4 gap-4 flex-wrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1 justify-start">
                      <span className="font-bold text-accent text-xs bg-accent/5 px-2 py-0.5 rounded font-mono">
                        {selectedAgent.id === "dashboard-wizard" ? "Reporting & Insight" : selectedAgent.id === "meetings-booker" ? "Scheduling & Coordination" : "Documentation & Process"}
                      </span>
                      <ModernBadge variant={linkedAgents[selectedAgent.id] ? "active" : "inactive"}>
                        {linkedAgents[selectedAgent.id] 
                          ? "Sovereign Link Active" 
                          : "Ready to Connect"}
                      </ModernBadge>
                    </div>
                    <h3 className="font-display text-2xl text-ink font-bold tracking-tight">
                      {selectedAgent.name}
                    </h3>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs font-sans font-semibold text-accent/80 mb-3 italic">
                  “{selectedAgent.tagline}”
                </p>

                {/* Description */}
                <p className="text-xs md:text-sm text-ink-soft leading-relaxed mb-6 font-sans font-medium">
                  {selectedAgent.description}
                </p>

                {/* Capabilities with modern progress bar */}
                <div className="mb-6">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-ink mb-3 select-none font-mono">
                    WEAVE SYSTEM CAPABILITIES
                  </h4>
                  <ul className="space-y-3">
                    {selectedAgent.capabilities.map((cap, i) => (
                      <li key={i} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 justify-start">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span className="text-xs font-semibold text-ink-soft">{cap}</span>
                        </div>
                        <div className="w-full h-[3px] bg-line rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${85 - i * 10}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Swatches Metrics */}
                <div className="mb-6">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-ink mb-3 select-none font-mono">
                    AGENT PERFORMANCE METRICS
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedAgent.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 bg-surface-mute rounded-lg border border-line flex flex-col justify-center items-center text-center relative"
                      >
                        <span className="font-display font-bold text-xs text-ink tracking-tight">
                          {m.value}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider text-ink-soft mt-1 leading-none font-sans font-bold select-none">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Sovereign Link Action Pin */}
                <div className="pt-4 border-t border-line flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleLink(selectedAgent.id)}
                    disabled={linkingId !== null}
                    className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 border select-none cursor-pointer ${
                      linkingId === selectedAgent.id
                        ? "bg-surface text-accent border-accent"
                        : linkedAgents[selectedAgent.id]
                        ? "bg-[#0085CA]/10 text-[#0085CA] border-[#0085CA]/30 hover:bg-[#0085CA]/20"
                        : "bg-ink text-canvas border-transparent hover:bg-ink-soft"
                    }`}
                  >
                    {linkingId === selectedAgent.id ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        ESTABLISHING SECURE LINK...
                      </>
                    ) : linkedAgents[selectedAgent.id] ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0085CA] animate-pulse" />
                        SOVEREIGN LINK ACTIVE ✓
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
                        ESTABLISH SOVEREIGN LINK
                      </>
                    )}
                  </button>
                  
                  {linkedAgents[selectedAgent.id] && (
                    <p className="text-[9px] text-center text-[#0085CA] font-sans font-semibold mt-1">
                      ● AI processing stays on-premises · third-party actions run only through connectors you authorize
                    </p>
                  )}
                </div>
              </ModernCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Below: 3 Agent Cards */}
      <div className="lg:mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {AGENTS.map((agent, index) => {
          const isSelected = selectedAgent.id === agent.id;

          return (
            <ModernCard
              key={agent.id}
              active={isSelected}
              onClick={() => setSelectedAgent(agent)}
              className="hover:border-accent group cursor-pointer"
              style={{ textAlign: "left" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-accent/80 bg-accent/5 px-2 py-0.5 rounded-md font-mono">
                  {agent.id === "dashboard-wizard" ? "Reporting" : agent.id === "meetings-booker" ? "Coordination" : "Documentation"}
                </span>
                <span className="text-[10px] uppercase font-bold text-ink-soft tracking-wider font-mono">
                  0{index + 1}
                </span>
              </div>
              <h4 className="font-display text-[15px] text-ink font-bold tracking-tight mb-2 group-hover:text-accent transition-colors duration-200">
                {agent.name}
              </h4>
              <p className="text-[11px] text-ink-soft leading-relaxed mb-4 min-h-[48px] font-medium font-sans">
                {agent.tagline}
              </p>
              
              <div className="flex items-center justify-between pointer-events-none flex-row">
                <span className="text-[8px] font-mono tracking-widest uppercase text-ink-soft select-none">
                  {agent.id === "dashboard-wizard" ? "DATA DISPATCH" : agent.id === "meetings-booker" ? "INTEGRATED FLOW" : "SOVEREIGN DOCUMENT"}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-accent font-semibold flex-row">
                  <span className="pb-0.5 border-b-[1.5px] border-transparent group-hover:border-accent transition-all duration-300">
                    Connect
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </ModernCard>
          );
        })}
      </div>
    </div>
  );
};
