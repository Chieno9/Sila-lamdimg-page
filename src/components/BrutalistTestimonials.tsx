import React from "react";
import { motion } from "motion/react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  initials: string;
  location: string;
}

const TESTIMONIAL_ITEMS: Testimonial[] = [
  {
    id: "test-1",
    quote: "We wanted the productivity of AI agents, but not the risk of pasting internal documents into tools we don't control. Sila keeps the AI inside our own environment.",
    author: "Head of Digital Transformation",
    role: "Government Body Representative",
    organization: "Name available under NDA",
    initials: "DT",
    location: "Muscat"
  },
  {
    id: "test-2",
    quote: "The value isn't just the agents; it's that everything runs on our own infrastructure, and every connection is one we approve.",
    author: "IT Director",
    role: "Omani Enterprise IT Lead",
    organization: "Name available under NDA",
    initials: "IT",
    location: "Salalah"
  },
  {
    id: "test-3",
    quote: "We built a custom document agent on Sila's framework in under a day and connected it to the tools our team already uses.",
    author: "Lead Architect",
    role: "Local Systems Integrator Partner",
    organization: "Name available under NDA",
    initials: "LA",
    location: "Sohar"
  }
];

export const BrutalistTestimonials: React.FC = () => {
  const col1 = [...TESTIMONIAL_ITEMS, ...TESTIMONIAL_ITEMS];
  const col2 = [...TESTIMONIAL_ITEMS, ...TESTIMONIAL_ITEMS];
  const col3 = [...TESTIMONIAL_ITEMS, ...TESTIMONIAL_ITEMS];

  return (
    <div 
      className="w-full relative py-8 overflow-hidden"
      dir="ltr"
    >
      {/* Absolute top/bottom layout mask gradients */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-canvas to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-canvas to-transparent z-10 pointer-events-none" />

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-hidden px-1">
        {/* Column 1 */}
        <div className="relative overflow-hidden h-[460px]">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear"
            }}
          >
            {col1.map((item, idx) => (
              <TestimonialCard key={`col1-${item.id}-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Column 2 - Hidden on Mobile */}
        <div className="relative overflow-hidden h-[460px] hidden md:block">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear"
            }}
          >
            {col2.map((item, idx) => (
              <TestimonialCard key={`col2-${item.id}-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Column 3 - Hidden on Mobile & Tablet */}
        <div className="relative overflow-hidden h-[460px] hidden lg:block">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear"
            }}
          >
            {col3.map((item, idx) => (
              <TestimonialCard key={`col3-${item.id}-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div 
      className="relative bg-surface border-2 border-[#0B1420] p-6 h-auto flex flex-col justify-between overflow-hidden group select-text interactive-hover shadow-[4px_4px_0_0_#0085CA]"
      style={{ textAlign: "left" }}
    >
      {/* Large quote mark as watermark in background */}
      <span className="absolute -top-6 -right-2 font-display font-bold text-[120px] text-[#0B1420]/5 pointer-events-none leading-none select-none">
        “
      </span>

      <div className="relative z-10 font-mono text-xs text-[#0B1420]/80 leading-relaxed mb-6">
        "{item.quote}"
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-[#0B1420]/10 pt-4 flex-row text-left">
        {/* Initials badge */}
        <div className="w-9 h-9 bg-surface-mute border border-[#0B1420]/15 rounded-full flex items-center justify-center font-mono font-bold text-xs text-[#0085CA] select-none shadow-[inset_0_0_4px_rgba(0,133,202,0.15)] shrink-0">
          {item.initials}
        </div>
        <div className="w-full min-w-0">
          <h4 className="font-mono text-xs font-bold text-[#0B1420] uppercase tracking-tight truncate">
            {item.author}
          </h4>
          <p className="font-mono text-[9px] text-[#0B1420]/45 leading-none mt-1 uppercase truncate">
            {item.role}, <span className="text-[#0085CA]/70">{item.organization}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
