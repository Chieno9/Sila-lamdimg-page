import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Globe,
  RefreshCw,
  Binary,
  CheckCircle2
} from "lucide-react";
import { showModernToast } from "./ModernComponents";

import excelIcon from "../../icons/icons8-microsoft-excel-2019-50.png";
import gmailIcon from "../../icons/icons8-gmail-50.png";
import googleCalendarIcon from "../../icons/icons8-google-calendar-50.png";
import googleDocsIcon from "../../icons/icons8-google-docs-50.png";
import googleSheetsIcon from "../../icons/icons8-google-sheets-50.png";
import googleTasksIcon from "../../icons/icons8-google-tasks-50.png";
import teamsIcon from "../../icons/icons8-microsoft-teams-2025-50.png";
import todoIcon from "../../icons/icons8-microsoft-todo-2019-50.png";
import onedriveIcon from "../../icons/icons8-microsoft-onedrive-2025-50.png";
import outlookIcon from "../../icons/icons8-microsoft-outlook-2025-50.png";
import powerBiIcon from "../../icons/icons8-power-bi-2021-50.png";
import slackIcon from "../../icons/icons8-slack-50.png";
import clickUpIcon from "../../icons/icons8-clickup-50.png";
import googleChatIcon from "../../icons/icons8-google-chat-50.png";
import googleContactsIcon from "../../icons/icons8-google-contacts-50.png";
import googleDriveIcon from "../../icons/icons8-google-drive-50.png";
import googleFormsIcon from "../../icons/icons8-google-forms-50.png";
import onenoteIcon from "../../icons/icons8-microsoft-onenote-2025-50.png";
import outlookCalendarIcon from "../../icons/icons8-outlook-calendar-50.png";
import powerpointIcon from "../../icons/icons8-microsoft-powerpoint-2025-50.png";
import sharepointIcon from "../../icons/icons8-microsoft-sharepoint-2019-50.png";
import wordIcon from "../../icons/icons8-microsoft-word-2025-50.png";
import grafanaIcon from "../../icons/icons8-grafana-50.png";
import cloudflareIcon from "../../icons/icons8-cloudflare-50.png";
import huggingFaceIcon from "../../icons/icons8-huggingface-50.png";

interface ConnectorLogo {
  id: string;
  name: string;
  iconSrc?: string;
}

const CONNECTOR_LOGOS: ConnectorLogo[] = [
  { id: "excel", name: "Excel", iconSrc: excelIcon },
  { id: "gmail", name: "Gmail", iconSrc: gmailIcon },
  { id: "calendar", name: "Google Calendar", iconSrc: googleCalendarIcon },
  { id: "docs", name: "Google Docs", iconSrc: googleDocsIcon },
  { id: "sheets", name: "Google Sheets", iconSrc: googleSheetsIcon },
  { id: "tasks", name: "Google Tasks", iconSrc: googleTasksIcon },
  { id: "teams", name: "Microsoft Teams", iconSrc: teamsIcon },
  { id: "todo", name: "Microsoft To Do", iconSrc: todoIcon },
  { id: "onedrive", name: "OneDrive", iconSrc: onedriveIcon },
  { id: "outlook", name: "Outlook", iconSrc: outlookIcon },
  { id: "powerbi", name: "Power BI", iconSrc: powerBiIcon },
  { id: "slack", name: "Slack", iconSrc: slackIcon },
  { id: "clickup", name: "ClickUp", iconSrc: clickUpIcon },
  { id: "chat", name: "Google Chat", iconSrc: googleChatIcon },
  { id: "contacts", name: "Google Contacts", iconSrc: googleContactsIcon },
  { id: "drive", name: "Google Drive", iconSrc: googleDriveIcon },
  { id: "forms", name: "Google Forms", iconSrc: googleFormsIcon },
  { id: "onenote", name: "OneNote", iconSrc: onenoteIcon },
  { id: "outlook_calendar", name: "Outlook Calendar", iconSrc: outlookCalendarIcon },
  { id: "powerpoint", name: "PowerPoint", iconSrc: powerpointIcon },
  { id: "sharepoint", name: "SharePoint", iconSrc: sharepointIcon },
  { id: "word", name: "Word", iconSrc: wordIcon },
  { id: "grafana", name: "Grafana", iconSrc: grafanaIcon },
  { id: "cloudflare", name: "Cloudflare", iconSrc: cloudflareIcon },
  { id: "huggingface", name: "Hugging Face", iconSrc: huggingFaceIcon },
];

// Duplicated once so the strip can loop seamlessly at -50% translation
const MARQUEE_LOGOS = [...CONNECTOR_LOGOS, ...CONNECTOR_LOGOS];

export const NetworkMeshVisualizer: React.FC = () => {
  return (
    <div className="w-full relative">
      <div className="flex items-center gap-2 mb-3 justify-start">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0085CA] animate-pulse" />
        <span className="font-mono text-[9px] font-bold text-[#0085CA] tracking-widest uppercase">
          25 Live Connectors
        </span>
      </div>

      {/* Sliding logo news bar */}
      <div className="relative w-full overflow-hidden border-y border-[#0B1420]/10 py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex items-center gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {MARQUEE_LOGOS.map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              title={c.name}
              className="flex items-center justify-center shrink-0 select-none w-11 h-11 rounded-lg bg-surface-mute border border-[#0B1420]/10"
            >
              {c.iconSrc ? (
                <img src={c.iconSrc} alt={c.name} className="w-6 h-6 object-contain" />
              ) : (
                <Globe className="w-5 h-5 text-slate-500" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const SecurityGatekeeperDemo: React.FC = () => {
  const [sampleText, setSampleText] = useState<string>(
    "Please email Khalid Al-Maskari (khalid.m@governance.gov.om) regarding confidential contract terms for Muscat operations."
  );
  const [redactedText, setRedactedText] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedMetrics, setScannedMetrics] = useState<{
    entitiesFound: number;
    ruleSet: string;
    actionResult: string;
  } | null>(null);

  const handleSimulateScan = () => {
    if (!sampleText.trim()) return;
    setIsScanning(true);
    setRedactedText("");
    setScannedMetrics(null);

    setTimeout(() => {
      // Very basic mock redaction replacing common patterns
      let result = sampleText;
      let count = 0;

      // Redact email
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      if (emailRegex.test(result)) {
        result = result.replace(emailRegex, "[REDACTED_EMAIL]");
        count++;
      }

      // Redact Omani names or standard English names
      const names = ["Khalid Al-Maskari", "Khalid", "Al-Maskari", "Salim", "Salim Al-Harthy"];
      names.forEach(name => {
        const regex = new RegExp(`\\b${name}\\b`, "gi");
        if (regex.test(result)) {
          result = result.replace(regex, "[REDACTED_NAME]");
          count++;
        }
      });

      // Redact OMR figures or money
      const moneyRegex = /\b\d+\s*(OMR|Omani Rial|Rials)\b/gi;
      if (moneyRegex.test(result)) {
        result = result.replace(moneyRegex, "[REDACTED_SENSITIVE_FINANCIAL]");
        count++;
      }

      setRedactedText(result);
      setScannedMetrics({
        entitiesFound: count > 0 ? count : 2,
        ruleSet: "Oman PDPL (Royal Decree 6/2022) Default",
        actionResult: "Redacted before egress payload creation"
      });
      setIsScanning(false);

      showModernToast("✓ Security screening completed. Personal data redacted.", "success");
    }, 1200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface-mute border-2 border-[#0B1420] shadow-[4px_4px_0_0_#FF6A3D] p-5 md:p-7 relative flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-[#0B1420]/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0085CA]" />
            <span className="font-mono text-[10px] font-bold text-[#0085CA] tracking-wider uppercase">
              SECURITY GATEKEEPER DEMO
            </span>
          </div>
          <span className="text-[8.5px] font-mono text-slate-500 uppercase">
            Oman RD 6/2022 Compliant
          </span>
        </div>

        <p className="text-[11px] text-slate-600 font-sans leading-relaxed mb-4">
          Our security gatekeeper automatically detects and redacts personal data (like names, emails, and Omani corporate assets) before any outbound action leaves Sila.
        </p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
              Outbound Action Payload Input
            </label>
            <textarea
              className="w-full bg-white border border-[#0B1420]/10 rounded-lg p-2.5 text-[10.5px] font-mono text-[#0B1420]/90 outline-none focus:border-[#0085CA] resize-none h-20"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Type confidential query payload here..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="px-3.5 py-1.5 bg-[#0085CA] text-black font-mono text-[9px] font-bold rounded uppercase tracking-wider hover:bg-opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Redacting Payload...
                </>
              ) : (
                <>
                  <Binary className="w-3 h-3" />
                  SIMULATE SECURITY SCAN
                </>
              )}
            </button>
          </div>

          {/* Redacted Output */}
          <AnimatePresence mode="wait">
            {redactedText && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-2 bg-white border border-[#0085CA]/20 rounded-lg p-3 relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 text-[8px] font-mono text-[#0085CA] font-bold flex items-center gap-1 bg-[#0085CA]/10 px-1.5 py-0.5 rounded">
                  <CheckCircle2 className="w-2.5 h-2.5" /> SECURE payloads cleared
                </div>

                <label className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Scanned Outbound Outflow Output
                </label>
                <p className="text-[10.5px] font-mono text-slate-700 select-all leading-relaxed bg-surface-mute p-2 rounded border border-[#0B1420]/8 whitespace-pre-wrap">
                  {redactedText}
                </p>

                {scannedMetrics && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-[#0B1420]/8 font-mono text-[8px] text-slate-500 uppercase">
                    <div>
                      <span>Entities Scanned: </span>
                      <span className="text-[#0085CA] font-bold">{scannedMetrics.entitiesFound} Redacted</span>
                    </div>
                    <div>
                      <span>Gatekeeper Rule: </span>
                      <span className="text-[#0B1420]">{scannedMetrics.ruleSet}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-[#0B1420]/8 pt-4 mt-4 flex items-center gap-2">
        <Lock className="w-3.5 h-3.5 text-slate-500" />
        <p className="text-[9px] text-slate-500 font-sans leading-tight">
          Model inference stays 100% on-premises. Third-party actions occur only when you explicitly grant token permission inside this client stack.
        </p>
      </div>
    </div>
  );
};
