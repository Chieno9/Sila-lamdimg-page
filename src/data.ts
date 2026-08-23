import { Agent } from "./types";

export const AGENTS: Agent[] = [
  {
    id: "dashboard-wizard",
    name: "Dashboard Wizard",
    arabicName: "Dashboard Wizard",
    tagline: "Turns raw data into a clean, shareable dashboard or report.",
    description: "Point Dashboard Wizard at a data source (a spreadsheet or a URL) and it structures the numbers, builds the report, and delivers it to the tools your team already uses. No manual copy-paste, no exporting to outside tools.",
    capabilities: [
      "Read data from a spreadsheet or any URL",
      "Structure and summarize it into a report",
      "Append results to Excel or Google Sheets",
      "Build a PowerPoint deck of the findings",
      "Save the output to OneDrive or Google Drive"
    ],
    metrics: [
      { label: "Connectors", value: "6 Active" },
      { label: "Latency", value: "Instant" },
      { label: "AI Process", value: "On-Premises" }
    ],
    accentColor: "madder",
    initials: "DW"
  },
  {
    id: "meetings-booker",
    name: "Meetings Booker",
    arabicName: "Meetings Booker",
    tagline: "Books the meeting, sends the invites, notifies the team, sets the follow-ups.",
    description: "Describe the meeting in plain language and Meetings Booker handles the rest: finding a slot, creating the calendar event, emailing the attendees, posting a heads-up to your team channel, and adding any follow-up tasks.",
    capabilities: [
      "Create an event in Google Calendar or Outlook Calendar",
      "Send invites and confirmations via Gmail or Outlook",
      "Post a notice to Slack, Microsoft Teams, or Google Chat",
      "Create follow-up tasks in Google Tasks or Microsoft To Do"
    ],
    metrics: [
      { label: "Connectors", value: "9 Active" },
      { label: "Latency", value: "Realtime" },
      { label: "AI Process", value: "On-Premises" }
    ],
    accentColor: "ochre",
    initials: "MB"
  },
  {
    id: "pdd-agent",
    name: "PDD Agent",
    arabicName: "PDD Agent",
    tagline: "Drafts a structured Process Design Document from your inputs.",
    description: "Give the PDD Agent your process notes (or a reference URL) and it produces a clean, structured Process Design Document: objectives, steps, roles, systems, and controls. It delivers the finished document straight into your document tools.",
    capabilities: [
      "Read reference material from a URL",
      "Draft structured PDD (objectives, steps, roles, systems, controls)",
      "Create documents in Google Docs or Word files",
      "Add it as a OneNote page",
      "Save files to Google Drive or OneDrive"
    ],
    metrics: [
      { label: "Connectors", value: "6 Active" },
      { label: "Accuracy", value: "Deterministic" },
      { label: "AI Process", value: "On-Premises" }
    ],
    accentColor: "olive",
    initials: "PD"
  }
];
