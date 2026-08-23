import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Check,
  ChevronRight,
  ArrowRight,
  Lock,
  Cpu,
  Layers,
  Workflow,
  Globe,
  Search,
  Terminal,
  Shield,
  Zap,
  Menu,
  X,
  Bot
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Drawer } from "vaul";

import { BrutalistHeroCanvas } from "./components/BrutalistHeroCanvas";
import { CursorNeedle } from "./components/CursorNeedle";
import { BrutalistTypewriter } from "./components/BrutalistTypewriter";
import { ConciergeDemo } from "./components/ConciergeDemo";
import { BrutalistTestimonials } from "./components/BrutalistTestimonials";
import { KnotworkHub } from "./components/KnotworkHub";
import { BrutalistTimeline } from "./components/BrutalistTimeline";
import { NetworkMeshVisualizer, SecurityGatekeeperDemo } from "./components/NetworkMeshVisualizer";
import { ContinuousScrollThread } from "./components/ContinuousThread";
import { SilaIntroLoader } from "./components/SilaIntroLoader";
import { translations } from "./translations";
import { AGENTS } from "./data";

const NAV_LINKS = [
  { href: "#crisis", label: "Challenges" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Capabilities" },
  { href: "#agents", label: "Agents" },
  { href: "#sovereignty", label: "Sovereign" },
  { href: "#security", label: "Security" },
  { href: "#trusted", label: "Voices" },
];

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [regForm, setRegForm] = useState({ name: "", email: "", org: "", role: "" });
  const [activeRegField, setActiveRegField] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }, []);

  // Scroll logic for the global spine line and massive section parallax words
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageContainerRef,
    offset: ["start start", "end end"]
  });

  // Pulse height for the growing spine line based on page scroll
  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const executeAccessToast = () => {
    setRegForm({ name: "", email: "", org: "", role: "" });
    setRegSuccess(false);
    setRegError("");
    setIsRegisterModalOpen(true);
  };

  const t = translations;

  const localProblems = [
    {
      id: "prob-1",
      number: "01",
      title: "Repeated Text Work",
      description:
        "Staff spend hours finding answers in long documents, writing repeat replies, and moving information by hand between systems.",
      statusLabel: "STATUS: A large share of the working day lost to repeated text tasks",
      riskLabel: "RISK: HIGH, hours diverted from work only a person can do",
      alarm: "ALARM_01"
    },
    {
      id: "prob-2",
      number: "02",
      title: "No Compliant Route to Public AI",
      description:
        "Customer data, staff data, and internal documents can't go to a public AI service: Oman's PDPL, Cloud Computing Policy, and AI Ethics Policy close that path.",
      statusLabel: "STATUS: Real demand for AI, no compliant route to meet it",
      riskLabel: "RISK: CRITICAL, direct exposure under national data-protection and cloud policy",
      alarm: "ALARM_02"
    },
    {
      id: "prob-3",
      number: "03",
      title: "Shadow AI Fills the Gap",
      description:
        "Where no sanctioned option exists, staff turn to public AI tools on their own devices with company information.",
      statusLabel: "STATUS: Unsanctioned public AI tools used with company data",
      riskLabel: "RISK: CRITICAL, intellectual property and confidential data exposure",
      alarm: "ALARM_03"
    }
  ];

  const localFeatures = [
    {
      id: "feat-1",
      title: "Agent Marketplace (Bazaar)",
      description: "Discovery, search, hire, ratings, and reports for every published agent. Work built once by one team is reused by every other team.",
      benefit: "Primary users: Hirer, Viewer",
      badge: "Bazaar"
    },
    {
      id: "feat-2",
      title: "Agent Factory",
      description: "Five creation paths: template, file upload, conversation, visual studio, workflow canvas.",
      benefit: "Primary users: Builder",
      badge: "Factory"
    },
    {
      id: "feat-3",
      title: "SILA Concierge",
      description: "A conversational and voice interface that builds agents and workflows by dialogue, asking for the documents it needs and the accounts it must connect to.",
      benefit: "Primary users: All roles",
      badge: "Concierge"
    },
    {
      id: "feat-4",
      title: "Automated Vetting",
      description: "Four scanners enforcing PDPL, article by article, before any agent is published. Calls to an external AI service are detected and blocked.",
      benefit: "Primary users: Reviewer (decision), automatic (scan)",
      badge: "Vetting"
    },
    {
      id: "feat-5",
      title: "Knowledge Base & Retrieval",
      description: "Document ingestion, chunking, embedding, and hybrid search for grounded, sourced answers.",
      benefit: "Primary users: Builder",
      badge: "RAG"
    },
    {
      id: "feat-6",
      title: "Connectors",
      description: "Per-user consent integrations to business systems. Credentials are held outside the platform database.",
      benefit: "Primary users: Builder, Hirer",
      badge: "Connectors"
    },
    {
      id: "feat-7",
      title: "Command Centre",
      description: "Invocations, latency, token cost, an hours-saved model, anomaly alerts, and audit search.",
      benefit: "Primary users: Admin",
      badge: "Command Centre"
    }
  ];

  return (
    <div
      ref={pageContainerRef}
      className="relative min-h-screen bg-[#D9EDFB] text-[#0B1420] selection:bg-[#0085CA] selection:text-white overflow-x-hidden font-mono select-none transition-colors duration-200"
    >

      {/* PERSISTENT GLOBAL 12-COLUMN STRUCTURAL GUIDES */}
      <div className="fixed inset-x-0 top-0 bottom-0 max-w-7xl mx-auto px-6 md:px-12 pointer-events-none z-10 grid grid-cols-12 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-[1px] bg-[#0B1420]/5 origin-top hidden md:block"
          />
        ))}

        {/* 1px Pulsing Spine trace on column 1 left boundary */}
        <div className="absolute left-[24px] md:left-[48px] top-0 bottom-0 w-[1.5px] bg-[#0B1420]/10 z-20">
          <motion.div
            className="w-full bg-[#0085CA] origin-top signal-spine shadow-[0_0_8px_rgba(0,133,202,0.4)]"
            style={{ height: spineHeight }}
          />
        </div>
      </div>

      {/* Custom stretching loop cursor */}
      <CursorNeedle />

      {/* Scroll-driven active winding rope connector */}
      <ContinuousScrollThread />

      {/* Global sonner toaster positioned bottom-left */}
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            color: "#0B1420",
            fontFamily: "var(--font-mono)",
            border: "2px solid #0B1420",
            boxShadow: "4px 4px 0 0 #0085CA",
            borderLeft: "2px solid #0085CA",
            borderRight: "none",
            borderRadius: "0px",
          }
        }}
      />

      {/* FIXED NAVBAR (HEIGHT 48PX) */}
      <nav className="fixed top-0 inset-x-0 h-12 bg-surface border-b-2 border-[#0B1420] z-40 select-none ps-12 pe-6 md:ps-20 md:pe-12 flex items-center justify-between flex-row">
        <a href="#" className="flex items-center gap-2 group interactive-hover">
          <span className="font-mono text-xs font-bold text-[#0B1420] tracking-[0.2em] uppercase">
            {t.navTitle}
          </span>
        </a>

        {/* Center: section tab links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] text-[#0B1420]/50 hover:text-[#0085CA] uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Access Button / Drawer Menu */}
        <div className="flex items-center gap-4 flex-row">

          <button
            onClick={executeAccessToast}
            className="interactive-hover hidden md:block px-4 py-1.5 bg-[#0B1420] text-white text-xs font-bold uppercase transition-all duration-300 hover:bg-white hover:text-[#0085CA] hover:border hover:border-[#0085CA] border border-transparent"
          >
            {t.requestAccess}
          </button>

          {/* Mobile hamburger menu */}
          <Drawer.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Drawer.Trigger asChild>
              <button className="md:hidden text-[#0B1420] hover:text-[#0085CA] interactive-hover">
                <Menu size={18} strokeWidth={1} />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs" />
              <Drawer.Content className="fixed bottom-0 inset-x-0 max-h-[82%] bg-surface border-t-2 border-[#0B1420] p-6 z-50 flex flex-col focus:outline-hidden">
                <div className="w-12 h-1 bg-[#0085CA] mx-auto mb-6 shrink-0" />
                <Drawer.Title className="font-mono text-xs text-[#0B1420]/40 uppercase tracking-widest mb-4">
                  // SILA DIRECTORY
                </Drawer.Title>
                <div className="flex flex-col gap-5 mt-4 text-left">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-mono text-sm text-[#0B1420] hover:text-[#0085CA] border-b border-[#0B1420]/10 pb-2 uppercase tracking-wider"
                    >
                      {link.label}
                    </a>
                  ))}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      executeAccessToast();
                    }}
                    className="w-full mt-4 py-3 bg-[#0B1420] text-white font-bold uppercase transition-transform active:scale-95"
                  >
                    {t.requestAccess}
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>

      {/* Spacer for NAV */}
      <div className="h-12" />

      {/* ==================== 01 — HERO SECTION (CONNECT) ==================== */}
      <section
        onMouseMove={handleSpotlightMove}
        className="min-h-[calc(100vh-48px)] relative flex flex-col justify-between overflow-hidden relative z-20 border-b border-[#0B1420]/10"
        style={{
          background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 133, 202, 0.05) 0%, rgba(0, 133, 202, 0.02) 40%, transparent 100%)`
        }}
      >
        <BrutalistHeroCanvas />

        {/* Screen layout content */}
        <div className="max-w-7xl mx-auto w-full ps-12 pe-6 md:ps-20 md:pe-12 pt-8 md:pt-14 relative z-20 flex-grow grid grid-cols-12 gap-6 items-start text-left">

          {/* Top-left initializing terminal stream */}
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-[10px] text-[#0B1420]/50 mb-3 tracking-widest uppercase flex items-center justify-start">
              {t.heroOnline}
            </div>

            {/* Massive Bleed Section Word "SILA" */}
            <div className="overflow-visible w-full mt-4 select-none relative h-[145px] md:h-[220px]">
              <motion.h1
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/90 leading-none tracking-tight absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                  y: heroParallaxY
                }}
              >
                {t.heroBleedHeader}
              </motion.h1>
            </div>
          </div>

          <div className="col-span-12" />

          {/* Left Block description */}
          <div className="col-span-12 lg:col-span-6 mt-6 md:mt-2">
            <div className="text-[10px] font-bold text-[#0085CA] tracking-[0.25em] uppercase mb-4 block">
              // WHAT IS SILA
            </div>

            <h2 className="font-mono text-sm md:text-base text-[#0B1420] font-medium leading-relaxed uppercase max-w-lg mb-6">
              {t.heroSub.split(". ").map((sentence, idx) => (
                <React.Fragment key={idx}>
                  {sentence}
                  <br />
                </React.Fragment>
              ))}
            </h2>

            <p className="font-mono text-xs text-[#0B1420]/50 leading-relaxed max-w-md select-text mb-8">
              {t.heroDesc}
            </p>

            {/* Highly visible request access button directly in the page itself */}
            <div className="flex flex-wrap gap-4 justify-start">
              <button
                onClick={executeAccessToast}
                className="px-6 py-3.5 bg-[#0B1420] text-white text-xs font-mono font-bold uppercase transition-all duration-300 hover:bg-white hover:text-[#0085CA] hover:border-[#0085CA] border border-transparent select-none active:scale-95 touch-manipulation cursor-pointer flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {t.requestAccess}
              </button>
              <a
                href="#agents"
                className="px-6 py-3.5 bg-transparent text-[#0B1420] text-xs font-mono font-bold uppercase border border-[#0B1420]/20 transition-all duration-300 hover:bg-[#0B1420] hover:text-white hover:border-transparent select-none active:scale-95 touch-manipulation cursor-pointer"
              >
                EXPLORE AGENTS
              </a>
            </div>
          </div>

          {/* Right Block: live concierge demo */}
          <div className="col-span-12 lg:col-span-6 mt-8 lg:mt-2 flex flex-col gap-6 justify-end items-start lg:items-end w-full font-mono">
            <ConciergeDemo />
          </div>
        </div>

        {/* Absolute bottom scrolling instruction */}
        <div className="w-full max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 py-6 relative z-20 border-t border-[#0B1420]/5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[#0B1420]/40 flex-row">
          <div className="text-[10px] font-mono tracking-widest uppercase">
            {t.allSecuredByOtech}
          </div>
          <div className="text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 flex-row">
            {t.scrollEnter}
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.0 }}
              className="text-[#0085CA]"
            >
              ↓
            </motion.span>
          </div>
        </div>
      </section>

      {/* ==================== 02 — PROBLEM SECTION (BROKEN) ==================== */}
      <section id="crisis" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 text-left">

          <div className="col-span-12">
            {/* Slide-in massive word header */}
            <div className="overflow-visible w-full select-none relative h-[105px] md:h-[180px]">
              <motion.h2
                initial={{ x: "100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/95 leading-none absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                }}
              >
                {t.crisisBleedHeader}
              </motion.h2>
            </div>

            <div className="text-[10px] font-bold text-[#0B1420]/50 tracking-[0.25em] uppercase mb-12 block">
              {t.crisisTag}
            </div>
          </div>

          {/* 3 Problems displayed as terminal layout rows */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {localProblems.map((prob) => (
              <div key={prob.id} className="bg-surface border-2 border-[#0B1420] shadow-[4px_4px_0_0_#FF6A3D] p-5 md:p-6 select-text interactive-hover relative">
                <span className={`absolute top-2 right-3 text-[8px] font-mono ${prob.id === "prob-1" ? "text-amber-700" : "text-red-600"} font-bold uppercase tracking-widest`}>
                  // {prob.alarm}
                </span>
                <div className="font-mono text-xs text-[#0B1420] leading-relaxed mb-1">
                  <BrutalistTypewriter
                    text={prob.title}
                    speed={25}
                  />
                  <br />
                  <span className="opacity-60">{prob.statusLabel}</span>
                  <br />
                  <span className={`${prob.id === "prob-1" ? "text-amber-700" : "text-red-600"} font-bold`}>{prob.riskLabel}</span>
                  <p className="mt-3 text-[11px] text-[#0B1420]/60 leading-relaxed max-w-2xl">
                    {prob.description}
                  </p>
                </div>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-xs text-[#0085CA] font-bold font-mono pt-2 pl-2"
            >
              &gt; SOLUTION: SILA INITIALIZING TRUSTED AGENT BLUEPRINT...
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end pr-0 md:pr-4 mt-6 lg:mt-0">
            <div className="border-[#0B1420]/15 border-l pl-6 py-4">
              <p className="text-xs text-[#0B1420]/50 leading-relaxed uppercase">
                Customer data, staff data, and internal documents cannot be sent to a public AI service: that path is closed by law and by policy. Sila closes the gap by keeping all data and all model inference on infrastructure the organization controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 — SOLUTION SECTION (RESOLVE) ==================== */}
      <section id="solution" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 text-left">

          <div className="col-span-12">
            <div className="overflow-visible w-full select-none relative h-[105px] md:h-[180px]">
              <motion.h2
                initial={{ x: "100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/95 leading-none absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                }}
              >
                SOLUTION
              </motion.h2>
            </div>

            <div className="text-[10px] font-bold text-[#0085CA] tracking-[0.25em] uppercase mb-16 block">
              // THE SYSTEM PIPELINE
            </div>
          </div>

          {/* 3 Step terminal flow layout */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">

            <div className="absolute top-[35px] left-[15%] right-[15%] h-[1px] hidden md:block pointer-events-none z-0">
              <svg className="w-full h-2 overflow-visible" fill="none">
                <motion.line
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke="rgba(11,20,32,0.15)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
            </div>

            {/* Step 1 */}
            <div
              onMouseEnter={() => setActiveStep(1)}
              className={`bg-surface p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full select-text interactive-hover ${
                activeStep === 1 ? "border-[#0085CA] shadow-[4px_4px_0_0_#0085CA]" : "border-[#0B1420]"
              }`}
            >
              <div className="absolute top-2 right-2 font-display font-extrabold text-[#0B1420]/5 text-6xl select-none">
                01
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4 font-mono font-bold text-xs flex-row">
                  <span className={activeStep === 1 ? "text-[#0085CA]" : "text-[#0B1420]/40"}>
                    {activeStep === 1 ? "[ 01 ]" : "01 ·"}
                  </span>
                  <span className="text-[#0B1420] uppercase tracking-wider">CONVERSE_TO_BUILD</span>
                </div>
                <p className="font-mono text-[11px] text-[#0B1420]/60 leading-relaxed mb-6">
                  Describe what you need to SILA. It asks for the documents and accounts it needs, then hands back a working agent, starting as Draft + Unvetted.
                </p>
              </div>
              <div className="text-[8px] font-mono text-[#0B1420]/30 uppercase tracking-widest mt-auto border-t border-[#0B1420]/5 pt-3">
                SILA CONCIERGE INTERVIEW // DRAFT_CREATED
              </div>
            </div>

            {/* Step 2 */}
            <div
              onMouseEnter={() => setActiveStep(2)}
              className={`bg-surface p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full select-text interactive-hover ${
                activeStep === 2 ? "border-[#0085CA] shadow-[4px_4px_0_0_#0085CA]" : "border-[#0B1420]"
              }`}
            >
              <div className="absolute top-2 right-2 font-display font-extrabold text-[#0B1420]/5 text-6xl select-none">
                02
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4 font-mono font-bold text-xs flex-row">
                  <span className={activeStep === 2 ? "text-[#0085CA]" : "text-[#0B1420]/40"}>
                    {activeStep === 2 ? "[ 02 ]" : "02 ·"}
                  </span>
                  <span className="text-[#0B1420] uppercase tracking-wider">AUTOMATED_VETTING</span>
                </div>
                <p className="font-mono text-[11px] text-[#0B1420]/60 leading-relaxed mb-6">
                  Four automated scanners check every agent against Oman's PDPL and block any attempt to call an external AI service.
                </p>
              </div>
              <div className="text-[8px] font-mono text-[#0B1420]/30 uppercase tracking-widest mt-auto border-t border-[#0B1420]/5 pt-3">
                FOUR SCANNERS // PDPL ENFORCED
              </div>
            </div>

            {/* Step 3 */}
            <div
              onMouseEnter={() => setActiveStep(3)}
              className={`bg-surface p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full select-text interactive-hover ${
                activeStep === 3 ? "border-[#0085CA] shadow-[4px_4px_0_0_#0085CA]" : "border-[#0B1420]"
              }`}
            >
              <div className="absolute top-2 right-2 font-display font-extrabold text-[#0B1420]/5 text-6xl select-none">
                03
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4 font-mono font-bold text-xs flex-row">
                  <span className={activeStep === 3 ? "text-[#0085CA]" : "text-[#0B1420]/40"}>
                    {activeStep === 3 ? "[ 03 ]" : "03 ·"}
                  </span>
                  <span className="text-[#0B1420] uppercase tracking-wider">PUBLISH_TO_BAZAAR</span>
                </div>
                <p className="font-mono text-[11px] text-[#0B1420]/60 leading-relaxed mb-6">
                  Vetted agents publish to the Bazaar, where any team can hire in one click and reuse what another team already built.
                </p>
              </div>
              <div className="text-[8px] font-mono text-[#0B1420]/30 uppercase tracking-widest mt-auto border-t border-[#0B1420]/5 pt-3">
                BAZAAR LIVE // COMMAND CENTRE MONITORED
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 04 — CAPABILITIES SECTION (FEATURES) ==================== */}
      <section id="features" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">

        {/* Slide-in massive word header */}
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 text-left">
          <div className="col-span-12">
            <div className="overflow-visible w-full select-none relative h-[105px] md:h-[180px]">
              <motion.h2
                initial={{ x: "100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/95 leading-none absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                }}
              >
                CAPABILITIES
              </motion.h2>
            </div>

            <div className="text-[10px] font-bold text-[#0085CA] tracking-[0.25em] uppercase mb-12 block">
              // CORE PLATFORM CAPABILITIES
            </div>
          </div>
        </div>

        {/* 6 Grid items displaying Features */}
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative select-none">

          {localFeatures.map((feat, idx) => (
            <div
              key={feat.id}
              onMouseEnter={() => setHoveredFeature(idx + 1)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="border-2 border-[#0B1420] bg-surface shadow-[4px_4px_0_0_#0085CA] p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 relative select-text interactive-hover text-left"
            >
              {/* Corner mini indicators */}
              <div className="absolute top-3 right-4 text-[8px] font-mono font-bold text-[#0085CA] uppercase tracking-widest">
                {feat.badge}
              </div>

              <div className="mt-2">
                <span className="text-[9px] font-mono text-[#0B1420]/40 uppercase tracking-widest block mb-2 leading-none">
                  // FEATURE_0{idx + 1}
                </span>
                <h3 className="font-mono text-base font-bold text-[#0B1420] uppercase mb-3 leading-tight">
                  {feat.title}
                </h3>
                <p className="font-mono text-xs text-[#0B1420]/60 leading-relaxed">
                  {feat.description}
                </p>
              </div>
              <div className="flex justify-between mt-8 flex-row">
                <span className="text-[9px] font-mono text-[#0B1420]/30 truncate">
                  {feat.benefit}
                </span>
                <Cpu className={`w-5 h-5 transition-colors ${hoveredFeature === idx + 1 ? "text-[#0085CA]" : "text-[#0B1420]/40"}`} strokeWidth={1} />
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ==================== 05 — AGENTS SECTION (DEPLOY) ==================== */}
      <section id="agents" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 text-left">

          <div className="col-span-12">
            <div className="overflow-visible w-full select-none relative h-[105px] md:h-[180px]">
              <motion.h2
                initial={{ x: "100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/95 leading-none absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                }}
              >
                {t.deployBleedHeader}
              </motion.h2>
            </div>

            <div className="text-[10px] font-bold text-[#0B1420]/50 tracking-[0.25em] uppercase mb-12 block">
              {t.deployTag}
            </div>
          </div>

          {/* Interactive Modern Minimalist Knotwork Hub integrated seamlessly */}
          <div className="col-span-12 mb-10">
            <KnotworkHub />
          </div>

          {/* Three equal boxes: orbit visual, active agent detail, integrity monitor */}
          <div className="col-span-12 border-t border-[#0B1420]/10 pt-16">
            <div className="w-full text-[10px] font-bold text-[#0B1420]/40 uppercase tracking-widest mb-8 text-center">
              // SYSTEM LAUNCH SEQUENCE PIPELINE
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <BrutalistTimeline />

              {/* Box 3: Integrity monitor */}
              <div className="border-2 border-[#0B1420] bg-surface-mute p-4 md:p-6 h-full min-h-[380px] flex flex-col gap-6">
                <div className="text-[9px] font-mono text-[#0B1420]/40 uppercase tracking-widest font-bold text-left">
                  // ACTIVE INTEGRITY MONITOR
                </div>

                {AGENTS.map((agent) => {
                  const pct = ({ "dashboard-wizard": 82, "meetings-booker": 88, "pdd-agent": 74 } as Record<string, number>)[agent.id] ?? 100;
                  const name = agent.name.toUpperCase().replace(/\s+/g, "_");
                  return (
                    <div key={agent.id} className="flex flex-col gap-2 group cursor-pointer text-left">
                      <div className="flex justify-between items-center text-xs font-mono mb-1 flex-row">
                        <span className="font-bold text-[#0B1420] group-hover:text-[#0085CA] transition-colors">{name}</span>
                        <span className="text-[#0B1420]/40 text-[10px]">[ READY ]</span>
                      </div>
                      <div className="h-4 bg-[#0B1420]/10 w-full relative overflow-hidden flex items-center pr-2 justify-end">
                        <div className="absolute inset-y-0 left-0 bg-[#0B1420]/30 group-hover:bg-[#0085CA] transition-colors" style={{ width: `${pct}%` }} />
                        <span className="relative z-10 text-[9px] font-bold text-[#0B1420] tabular-nums">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 06 — SOVEREIGNTY SECTION (SOVEREIGN) ==================== */}
      <section id="sovereignty" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 items-center text-left">

          <div className="col-span-12">
            {/* Massive bleeding word headers */}
            <div className="overflow-visible w-full select-none relative h-[90px] md:h-[180px]">
              <motion.h2
                initial={{ x: "100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/95 leading-none absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                }}
              >
                {t.sovereignBleedHeader}
              </motion.h2>
            </div>
          </div>

          {/* Left Block with sequential viewport typwriter labels */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-4 mt-6">
            <div className="text-[10px] font-bold text-[#0B1420]/50 tracking-[0.25em] uppercase mb-4 block">
              // DATA RESIDENCY PARADIGM
            </div>

            <div className="font-mono text-base md:text-xl font-bold uppercase leading-relaxed text-[#0B1420] space-y-2 select-text">
              <div>
                <BrutalistTypewriter text="EVERY PROMPT." speed={35} />
              </div>
              <div>
                <BrutalistTypewriter text="EVERY RESPONSE." speed={35} delay={1000} />
              </div>
              <div>
                <BrutalistTypewriter text="EVERY BYTE." speed={35} delay={2000} />
              </div>
              <div className="text-[#0085CA]">
                <BrutalistTypewriter text="INSIDE OMAN." speed={35} delay={3000} />
              </div>
            </div>

            {/* Pulsing signal green border subtitle block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 3.5 }}
              className="mt-6 border border-[#0085CA]/30 py-3 px-4 bg-[#0085CA]/5 max-w-md font-mono text-[10px] text-[#0085CA] font-bold tracking-wider uppercase inline-block text-left"
            >
              // ZERO DATA POINTS LEAVING NATIONAL BORDERS
            </motion.div>
          </div>

          {/* Right outline drawing of Sultanate of Oman map */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center items-center">

            <div className="w-full max-w-[280px] aspect-square relative select-none">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full text-[#0B1420] overflow-visible"
              >
                {/* Main Body of Sultanate of Oman — traced from official Oman cartographic outline (om-03) */}
                <motion.path
                  d="M 162.0 58.9 L 160.2 58.9 L 160.2 60.1 L 157.7 62.6 L 156.5 62.6 L 154.6 65.1 L 152.8 64.5 L 152.8 59.5 L 152.2 58.9 L 149.1 58.9 L 147.2 60.8 L 147.2 68.2 L 146.0 70.0 L 147.2 76.2 L 146.0 79.3 L 150.3 79.3 L 150.9 79.9 L 150.9 83.0 L 148.5 84.8 L 141.7 84.8 L 138.6 86.1 L 138.6 87.3 L 140.4 88.6 L 140.4 92.3 L 139.2 93.5 L 138.6 97.2 L 136.7 99.0 L 135.5 104.6 L 132.4 110.2 L 132.4 118.8 L 131.8 120.7 L 142.3 137.3 L 142.9 141.0 L 131.2 177.5 L 131.2 179.3 L 128.1 187.4 L 127.5 191.1 L 124.4 193.5 L 105.2 199.7 L 103.4 201.0 L 54.6 217.6 L 52.7 218.9 L 55.2 226.3 L 68.8 257.1 L 70.6 263.3 L 71.9 263.3 L 73.1 264.6 L 79.9 280.0 L 86.1 277.5 L 92.3 277.5 L 94.1 276.9 L 97.8 273.8 L 102.1 273.2 L 104.0 270.7 L 107.1 270.7 L 107.7 270.1 L 118.8 270.1 L 120.7 272.0 L 123.8 272.0 L 129.3 270.1 L 134.3 264.6 L 134.9 259.6 L 133.0 257.8 L 133.0 256.5 L 136.7 252.8 L 139.2 248.5 L 144.1 247.3 L 150.9 247.3 L 151.5 246.7 L 155.9 246.7 L 156.5 246.0 L 160.8 246.7 L 166.4 241.1 L 166.4 238.6 L 168.2 233.1 L 168.2 230.0 L 172.5 225.0 L 182.4 220.7 L 195.4 220.1 L 196.6 219.5 L 197.9 217.6 L 197.2 217.0 L 197.2 213.9 L 196.0 212.7 L 196.0 206.5 L 194.8 204.7 L 194.2 199.1 L 195.4 197.9 L 197.2 193.5 L 197.9 186.1 L 201.0 183.7 L 201.0 181.8 L 203.4 180.0 L 204.7 176.9 L 207.1 176.9 L 207.7 177.5 L 207.7 179.3 L 206.5 181.8 L 213.3 183.0 L 215.2 180.6 L 216.4 175.6 L 220.1 171.9 L 220.1 169.5 L 221.9 167.6 L 221.9 165.7 L 228.1 158.3 L 231.2 155.9 L 234.9 154.6 L 238.6 147.8 L 239.2 145.4 L 241.1 142.3 L 242.9 141.0 L 243.6 137.3 L 246.7 133.6 L 247.3 131.8 L 247.3 125.6 L 242.9 123.8 L 239.2 123.1 L 233.7 117.6 L 233.1 114.5 L 228.7 110.8 L 226.9 107.7 L 226.9 106.5 L 225.0 104.6 L 225.0 103.4 L 221.9 100.9 L 220.7 97.8 L 218.2 97.2 L 216.4 94.7 L 213.9 94.7 L 210.8 96.0 L 205.3 92.9 L 199.1 92.9 L 196.6 91.0 L 192.9 91.0 L 181.8 87.3 L 173.2 79.3 L 171.3 75.6 L 167.0 71.3 L 162.0 60.8 Z"
                  stroke="rgba(11,20,32,0.4)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* Masirah Island */}
                <motion.path
                  d="M 224.4 173.8 L 223.8 173.8 L 223.2 175.6 L 221.9 176.9 L 221.9 177.5 L 221.3 178.1 L 221.3 179.3 L 220.1 180.6 L 219.5 180.6 L 217.6 182.4 L 217.6 188.0 L 218.2 188.0 L 219.5 186.7 L 220.1 186.7 L 220.1 186.1 L 221.3 184.9 L 221.3 183.7 L 221.9 183.0 L 221.9 181.8 L 223.8 180.0 L 224.4 180.0 L 225.7 178.7 L 224.4 176.9 Z"
                  stroke="rgba(11,20,32,0.4)"
                  strokeWidth="1.2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
                />

                {/* Musandam Peninsula — separated from the mainland by the UAE */}
                <motion.path
                  d="M 164.5 20.6 L 162.0 20.6 L 161.4 20.0 L 161.4 20.6 L 160.2 21.9 L 160.2 23.1 L 159.6 23.7 L 157.7 23.7 L 157.1 23.1 L 156.5 23.7 L 156.5 24.3 L 155.9 24.9 L 155.9 25.6 L 154.6 26.8 L 154.6 27.4 L 154.0 28.0 L 154.0 28.6 L 155.9 28.6 L 156.5 29.3 L 156.5 33.6 L 155.9 34.2 L 155.9 40.4 L 156.5 40.4 L 157.1 41.0 L 159.0 41.0 L 159.0 38.5 L 161.4 36.1 L 161.4 34.8 L 162.0 34.2 L 162.0 33.0 L 162.7 32.4 L 163.3 32.4 L 163.3 31.7 L 162.7 31.1 L 162.7 29.3 L 163.3 28.6 L 163.9 28.6 L 163.9 24.9 L 164.5 24.3 L 164.5 22.5 L 165.1 21.9 L 165.1 21.2 Z"
                  stroke="rgba(11,20,32,0.4)"
                  strokeWidth="1.2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                />

                {/* Small islet off Musandam (Jazirat al Ghanam) */}
                <motion.path
                  d="M 160.8 50.3 L 159.6 49.0 L 158.3 49.0 L 157.1 50.9 L 157.1 52.1 L 159.0 52.1 L 159.6 51.5 L 160.2 51.5 L 160.8 50.9 Z"
                  stroke="rgba(11,20,32,0.4)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                />

                {/* Pulsing Muscat Node marker dot */}
                <motion.circle
                  cx="213.1"
                  cy="98.7"
                  r="5"
                  fill="#0085CA"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [1, 1.8, 1] }}
                  viewport={{ once: true }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 2.5 }}
                />

                {/* Muscat Text */}
                <text
                  x="221.6"
                  y="102.2"
                  fill="#0085CA"
                  className="font-mono text-[8px] font-bold tracking-widest uppercase select-none"
                >
                  MUSCAT
                </text>

                {/* Pulsing Salalah Node marker dot */}
                <motion.circle
                  cx="99.2"
                  cy="273.4"
                  r="4"
                  fill="#0085CA"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [1, 1.8, 1] }}
                  viewport={{ once: true }}
                  transition={{ repeat: Infinity, duration: 2.0, delay: 2.8 }}
                />

                {/* Salalah Text */}
                <text
                  x="108.7"
                  y="277.4"
                  fill="#0085CA"
                  className="font-mono text-[8px] font-bold tracking-widest uppercase select-none"
                >
                  SALALAH
                </text>
              </svg>

            </div>

            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-end w-full max-w-[280px]">
              <span className="text-[9px] font-mono font-bold tracking-wider uppercase border border-[#0B1420]/20 px-2 py-1 text-[#0B1420]/50 select-none">
                [ PDPL_ALIGNED ]
              </span>
              <span className="text-[9px] font-mono font-bold tracking-wider uppercase border border-[#0085CA]/30 px-2 py-1 text-[#0085CA] select-none bg-[#0085CA]/5">
                [ SOVEREIGN_ALIGNED ]
              </span>
            </div>

          </div>

          {/* Dynamic local Otech cloud topology visualizer */}
          <div className="col-span-12 border-t border-[#0B1420]/10 pt-16">
            <div className="w-full text-[10px] font-bold text-[#0B1420]/40 uppercase tracking-widest mb-4 block">
              {t.coreTag}
            </div>
            <NetworkMeshVisualizer />
          </div>

        </div>
      </section>

      {/* ==================== 06B — SECURITY SECTION (GATEKEEPER) ==================== */}
      <section id="security" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 text-left">
          <div className="col-span-12">
            <div className="overflow-visible w-full select-none relative h-[105px] md:h-[180px]">
              <motion.h2
                initial={{ x: "100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold uppercase text-[#0B1420]/95 leading-none absolute left-8 md:left-16 pr-12 whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                }}
              >
                SECURITY
              </motion.h2>
            </div>

            <div className="text-[10px] font-bold text-[#0B1420]/50 tracking-[0.25em] uppercase mb-12 block">
              // AUTOMATED DATA PROTECTION
            </div>
          </div>

          <div className="col-span-12">
            <SecurityGatekeeperDemo />
          </div>
        </div>
      </section>

      {/* ==================== 07 — BRAND STORY SECTION (SILA) ==================== */}
      <section className="min-h-screen relative py-20 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 items-center text-left">

          <div className="col-span-12">

            {/* Massive word header */}
            <div className="overflow-visible w-full select-none relative h-[140px] md:h-[230px] flex items-center justify-center">

              {/* Foreground Title */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-display font-extrabold uppercase text-[#0B1420]/90 leading-none tracking-tight text-center relative z-10"
                style={{
                  fontSize: "clamp(3.6rem, 12vw, 11rem)",
                }}
              >
                {t.navTitle.replace("// ", "")}
              </motion.h2>
            </div>

            <div className="text-[10px] font-bold text-[#0B1420]/50 tracking-[0.25em] uppercase mb-16 text-center block">
              // WHY THIS NAME
            </div>
          </div>

          {/* Narrow narrative layout col */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-left font-mono">

            <div className="space-y-6 text-sm leading-relaxed text-[#0B1420]/80 select-text">
              <p>
                In Arabic, <span className="text-[#0B1420] font-bold select-all">Sila</span> means connection. In the historic Omani souqs, that connection was the house of trusted agency: every route found, every supplier verified.
              </p>

              <p className="border-[#0B1420]/25 border-l pl-4 text-[#0B1420] font-medium">
                Sila is that historic connection, rebuilt for artificial intelligence, one sovereign thread operating fully inside Oman's borders.
              </p>
            </div>

            {/* Scroll animated horizontal line drawing below text */}
            <div className="mt-12 w-full h-[1.5px] bg-[#0B1420]/10 relative overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-[#0085CA] w-full origin-left"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ==================== 08 — TESTIMONIALS SECTION (TRUSTED) ==================== */}
      <section id="trusted" className="min-h-screen relative py-20 border-b border-[#0B1420]/10 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 grid grid-cols-12 gap-6 text-left">

          <div className="col-span-12 mb-12 max-w-2xl">
            <div className="text-[10px] font-bold text-[#0085CA] tracking-[0.25em] uppercase mb-5 block">
              // {t.voicesTag}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block text-[#0085CA]/50 leading-none select-none"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "4rem" }}
              >
                &ldquo;
              </span>
              <p
                className="text-[#0B1420] text-2xl md:text-4xl leading-snug -mt-6"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 500 }}
              >
                Trusted by teams who won't compromise on sovereignty.
              </p>
            </motion.div>
          </div>

          {/* Testimonials column block components */}
          <div className="col-span-12 z-20">
            <BrutalistTestimonials />
          </div>

        </div>
      </section>

      {/* ==================== 09 — FOOTER CTA SECTION (BEGIN) ==================== */}
      <section className="min-h-screen relative py-24 overflow-hidden z-20 flex flex-col justify-between">

        <div className="h-4" />

        <div className="max-w-7xl mx-auto ps-12 pe-6 md:ps-20 md:pe-12 w-full text-center">
          {/* Slides in from bottom */}
          <div className="overflow-visible w-full select-none relative h-[110px] md:h-[180px] flex justify-center mb-6">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold uppercase text-[#0B1420] leading-none tracking-tight text-center"
              style={{
                fontSize: "clamp(3.8rem, 13vw, 12.5rem)",
              }}
            >
              BEGIN
            </motion.h2>
          </div>

          <h3 className="font-mono text-sm md:text-base text-[#0B1420]/60 uppercase tracking-widest max-w-xl mx-auto mb-10 leading-relaxed">
            Be among the first enterprises to connect and launch trusted local AI operations.
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* White Request Access Button */}
            <button
              onClick={executeAccessToast}
              className="px-8 py-4 bg-[#0B1420] text-white text-xs font-mono font-bold uppercase transition-all duration-300 hover:bg-white hover:text-[#0085CA] hover:border-[#0085CA] border border-transparent select-none active:scale-95 touch-manipulation interactive-hover"
            >
              {t.requestAccess}
            </button>

            {/* Secondary Black/white border button */}
            <a
              href="#solution"
              className="px-8 py-4 bg-transparent text-[#0B1420] text-xs font-mono font-bold uppercase border border-[#0B1420]/20 transition-all duration-300 hover:bg-[#0B1420] hover:text-white hover:border-transparent select-none active:scale-95 touch-manipulation interactive-hover"
            >
              BROWSE_PIPELINE
            </a>
          </div>

          <p className="mt-8 font-mono text-[11px] text-[#0B1420]/50 uppercase tracking-widest">
            Or reach us directly at{" "}
            <a
              href="mailto:admin@sila-ai.org"
              className="text-[#0085CA] font-bold hover:underline"
            >
              admin@sila-ai.org
            </a>
          </p>
        </div>

        {/* Global spine reaches the absolute bottom here */}
        <div className="max-w-7xl mx-auto w-full ps-12 pe-6 md:ps-20 md:pe-12 pt-16 mt-auto">

          {/* Signal green ending block */}
          <div className="absolute left-[20px] md:left-[44px] bottom-[-2px] select-none text-[15px] font-bold text-[#0085CA] z-30">
            ■
          </div>

          {/* Persistent border horizontal line */}
          <div className="w-full h-[1px] bg-[#0B1420]/10 mb-8" />

          {/* 3 Columns Footer text row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[9px] text-[#0B1420]/40 uppercase tracking-widest text-center md:text-left">
            <div>
              // SILA, AN OMANTEL INITIATIVE
            </div>
            <div className="md:text-center text-[#0085CA]/60 font-bold">
              ALL DATA PROCESSED INSIDE OMAN
            </div>
            <div className="md:text-right">
              © 2026 OMANTEL. ALL RIGHTS RESERVED.
            </div>
          </div>

        </div>

      </section>

      <AnimatePresence>
        {isRegisterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-lg bg-surface border-2 border-[#0B1420] p-6 relative overflow-hidden shadow-[6px_6px_0_0_#0085CA] text-left"
            >
              {/* Corner tech indicators */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0085CA]/10 to-transparent pointer-events-none" />
              <div className="absolute top-2 right-2 flex items-center gap-1 select-none">
                <span className="w-1 h-1 rounded-full bg-[#0085CA]" />
                <span className="font-mono text-[7px] text-[#0085CA] tracking-widest uppercase">SECURE_TUNNEL</span>
              </div>

              {!regSuccess ? (
                <>
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    aria-label="Close"
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#0B1420]/50 hover:text-[#0B1420] hover:border-[#0B1420]/40 border border-[#0B1420]/10 transition-colors cursor-pointer select-none"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>

                  <div className="mb-6">
                    <span className="font-mono text-[9px] font-bold text-[#0085CA] tracking-widest uppercase block mb-1">
                      // PRE-LAUNCH REGISTRATION
                    </span>
                    <h3 className="font-display font-black text-xl md:text-2xl text-[#0B1420] uppercase tracking-tight">
                      Join Sila Waitlist
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                      Register your organization below to request early-access queue assignment. Sila is hosted on-premises for enterprise sovereignty.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!regForm.name || !regForm.email || !regForm.org || !regForm.role) {
                        setRegError("All fields are required.");
                        return;
                      }
                      if (!regForm.email.includes("@")) {
                        setRegError("Please enter a valid work email.");
                        return;
                      }
                      setRegError("");
                      setRegSuccess(true);
                      toast.success(`// REGISTRATION CONFIRMED FOR ${regForm.name.toUpperCase()}`);
                    }}
                    className="space-y-4"
                  >
                    {regError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-mono">
                        ⚠ ERROR: {regError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-between h-3">
                          <span>Full Name</span>
                          <AnimatePresence>
                            {activeRegField === "name" && (
                              <motion.span
                                layoutId="reg-typing-robot"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0085CA] text-white"
                              >
                                <Bot className="w-2.5 h-2.5" strokeWidth={2.5} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </label>
                        <input
                          type="text"
                          required
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          onFocus={() => setActiveRegField("name")}
                          onBlur={() => setActiveRegField(null)}
                          placeholder="e.g. Salim Al-Harthy"
                          className="w-full bg-surface-mute border border-[#0B1420]/15 px-3 py-2.5 text-xs text-[#0B1420] placeholder-[#0B1420]/30 focus:outline-none focus:border-[#0085CA] font-mono transition-colors"
                        />
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-between h-3">
                          <span>Work Email</span>
                          <AnimatePresence>
                            {activeRegField === "email" && (
                              <motion.span
                                layoutId="reg-typing-robot"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0085CA] text-white"
                              >
                                <Bot className="w-2.5 h-2.5" strokeWidth={2.5} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </label>
                        <input
                          type="email"
                          required
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          onFocus={() => setActiveRegField("email")}
                          onBlur={() => setActiveRegField(null)}
                          placeholder="e.g. salim@omantel.om"
                          className="w-full bg-surface-mute border border-[#0B1420]/15 px-3 py-2.5 text-xs text-[#0B1420] placeholder-[#0B1420]/30 focus:outline-none focus:border-[#0085CA] font-mono transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Organization */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-between h-3">
                          <span>Organization</span>
                          <AnimatePresence>
                            {activeRegField === "org" && (
                              <motion.span
                                layoutId="reg-typing-robot"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0085CA] text-white"
                              >
                                <Bot className="w-2.5 h-2.5" strokeWidth={2.5} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </label>
                        <input
                          type="text"
                          required
                          value={regForm.org}
                          onChange={(e) => setRegForm({ ...regForm, org: e.target.value })}
                          onFocus={() => setActiveRegField("org")}
                          onBlur={() => setActiveRegField(null)}
                          placeholder="e.g. Omantel"
                          className="w-full bg-surface-mute border border-[#0B1420]/15 px-3 py-2.5 text-xs text-[#0B1420] placeholder-[#0B1420]/30 focus:outline-none focus:border-[#0085CA] font-mono transition-colors"
                        />
                      </div>

                      {/* Role */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-between h-3">
                          <span>Enterprise Role</span>
                          <AnimatePresence>
                            {activeRegField === "role" && (
                              <motion.span
                                layoutId="reg-typing-robot"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0085CA] text-white"
                              >
                                <Bot className="w-2.5 h-2.5" strokeWidth={2.5} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </label>
                        <input
                          type="text"
                          required
                          value={regForm.role}
                          onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                          onFocus={() => setActiveRegField("role")}
                          onBlur={() => setActiveRegField(null)}
                          placeholder="e.g. Head of Digital Transformation"
                          className="w-full bg-surface-mute border border-[#0B1420]/15 px-3 py-2.5 text-xs text-[#0B1420] placeholder-[#0B1420]/30 focus:outline-none focus:border-[#0085CA] font-mono transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#0085CA] hover:bg-[#0085CA]/90 text-black text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 rounded-lg"
                      >
                        SUBMIT WAITLIST ENROLLMENT
                      </button>
                    </div>

                    <p className="text-[9.5px] text-slate-500 font-sans text-center leading-relaxed">
                      By submitting, you agree to secure administrative contact from Sila engineers regarding launch availability parameters inside Oman.
                    </p>
                  </form>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-[#0085CA]/10 border border-[#0085CA]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-[#0085CA] text-lg font-bold">✓</span>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-[#0085CA] tracking-widest uppercase block mb-1">
                      ENROLLMENT_VERIFIED
                    </span>
                    <h3 className="font-display font-black text-xl md:text-2xl text-[#0B1420] uppercase tracking-tight">
                      Queue Registered
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Thank you, <strong className="text-[#0B1420]">{regForm.name}</strong>. Your position on the early-access list is now secured.
                    </p>
                  </div>

                  {/* Tech diagnostics block */}
                  <div className="bg-surface-mute border border-[#0B1420]/10 p-4 font-mono text-[10px] space-y-2">
                    <div className="flex justify-between border-b border-[#0B1420]/10 pb-1">
                      <span className="text-[#0B1420]/40">USER_NODE:</span>
                      <span className="text-[#0B1420] font-semibold">{regForm.org.toUpperCase()} // {regForm.role.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#0B1420]/10 pb-1">
                      <span className="text-[#0B1420]/40">QUEUE_ID:</span>
                      <span className="text-[#0085CA] font-semibold font-mono">SILA-WAITLIST-{Math.floor(Math.random() * 9000) + 1000}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#0B1420]/10 pb-1">
                      <span className="text-[#0B1420]/40">STATUS:</span>
                      <span className="text-[#0085CA] font-semibold">QUEUE_ASSIGNED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B1420]/40">DATACENTER:</span>
                      <span className="text-[#0B1420] font-semibold">OMANTEL ON-PREMISES</span>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-[9.5px]">
                    <div className="flex gap-2 items-center text-[#0B1420]/80">
                      <span className="text-[#0085CA]">&gt;</span>
                      <span>Early access queue slot assigned under Muscat core.</span>
                    </div>
                    <div className="flex gap-2 items-center text-[#0B1420]/80">
                      <span className="text-[#0085CA]">&gt;</span>
                      <span>Data isolation standards confirmed under PDPL framework.</span>
                    </div>
                    <div className="flex gap-2 items-center text-[#0B1420]/80">
                      <span className="text-[#0085CA]">&gt;</span>
                      <span>Launch invitation will be dispatched to {regForm.email}.</span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setIsRegisterModalOpen(false)}
                      className="w-full py-2.5 bg-[#0B1420] text-white text-xs font-mono font-bold uppercase hover:bg-[#0085CA] hover:text-white hover:border-transparent border border-transparent transition-all cursor-pointer"
                    >
                      CLOSE SECURE DIALOG
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {initializing && (
          <SilaIntroLoader
            onComplete={() => setInitializing(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
