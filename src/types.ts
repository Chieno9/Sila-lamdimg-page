export interface Agent {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  capabilities: string[];
  metrics: { label: string; value: string }[];
  accentColor: "madder" | "ochre" | "olive" | "henna";
  initials: string;
}

