export interface TranslationSet {
  navTitle: string;
  requestAccess: string;

  // Hero section
  heroOnline: string;
  heroBleedHeader: string;
  heroSub: string;
  heroDesc: string;
  scrollEnter: string;
  allSecuredByOtech: string;

  // Crisis section
  crisisBleedHeader: string;
  crisisTag: string;

  // Sovereignty section
  sovereignBleedHeader: string;

  // Deploy Section
  deployBleedHeader: string;
  deployTag: string;

  // Testimonials Section
  voicesTag: string;

  // Network/Core Section
  coreTag: string;
}

export const translations: TranslationSet = {
  navTitle: "// SILA",
  requestAccess: "REGISTER FOR EARLY ACCESS",

  heroOnline: "// SILA NETWORK ONLINE // ON-PREM_OM_001",
  heroBleedHeader: "SILA",
  heroSub: "Find, adjust, and start using AI agents in one internal marketplace. Describe what you need to SILA, and get a working agent back.",
  heroDesc: "All data and all model inference stay on sovereign on-premises infrastructure inside Oman; nothing is sent to an external AI provider. Every agent is checked against Oman's Personal Data Protection Law before it publishes to the Bazaar.",
  scrollEnter: "SCROLL TO ENTER THE NETWORK",
  allSecuredByOtech: "SILA WORKSPACE // AI RUNS ON-PREMISES",

  crisisBleedHeader: "CHALLENGES",
  crisisTag: "// THE CRISIS",

  sovereignBleedHeader: "SOVEREIGN",

  deployBleedHeader: "AGENTS",
  deployTag: "// SOVEREIGN AGENT DEPLOY MATRIX",

  voicesTag: "// TRUST & VERIFICATION",

  coreTag: "// SUPPORTED CONNECTORS"
};
