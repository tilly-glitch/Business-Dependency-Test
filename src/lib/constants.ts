export const TASKS = [
  "Lead follow-up & DMs",
  "Sales calls & pitching",
  "Client delivery & communication",
  "Invoicing & payments",
  "Onboarding new clients",
  "Content creation & posting",
  "Admin & scheduling",
  "Email & inbox management",
] as const;

export type Task = (typeof TASKS)[number];

// Priority tiers — lower number = higher business impact
export const TASK_PRIORITY: Record<Task, number> = {
  "Lead follow-up & DMs": 1,
  "Sales calls & pitching": 2,
  "Invoicing & payments": 3,
  "Client delivery & communication": 4,
  "Onboarding new clients": 5,
  "Content creation & posting": 6,
  "Admin & scheduling": 7,
  "Email & inbox management": 8,
};

export const GAP_COPY: Record<Task, string> = {
  "Lead follow-up & DMs":
    "Leads go cold in 24 hours. Every crash means potential clients are reaching out and getting silence. One automated follow-up system means they get a response in 2 minutes — even when you're in bed.",
  "Sales calls & pitching":
    "When you crash, your pipeline stops. No calls, no closes, no cash. An automated booking and reminder system keeps your calendar filling even on your worst days.",
  "Client delivery & communication":
    "Your clients don't know you're crashing. They just know you went quiet. An automated check-in system keeps them feeling looked after while you rest.",
  "Invoicing & payments":
    "Money earned but not collected is the most painful gap. Automated invoicing means cash comes in whether you're at your desk or not.",
  "Onboarding new clients":
    "New clients said yes but the onboarding stalled because you crashed. An automated welcome sequence means they start without waiting for your good day.",
  "Content creation & posting":
    "When you crash, you go invisible. Batched and scheduled content means your audience still sees you even when you're resting.",
  "Admin & scheduling":
    "Admin piles up fast on bad days. One scheduling automation saves you hours of catch-up every time you come back.",
  "Email & inbox management":
    "Your inbox explodes when you crash. Auto-sorting, auto-responses, and filters mean the important stuff surfaces and the noise waits.",
};

export const REVENUE_OPTIONS = [
  { label: "Under $5K/month", value: 2500 },
  { label: "$5K - $10K/month", value: 7500 },
  { label: "$10K - $20K/month", value: 15000 },
  { label: "$20K - $30K/month", value: 25000 },
  { label: "$30K+/month", value: 35000 },
] as const;

export const CATCHUP_OPTIONS = [
  {
    label: "1-2 days",
    subtext: "Quick recovery but still behind",
    value: 1.5,
  },
  {
    label: "3-5 days",
    subtext: "Almost a full week lost to catch-up",
    value: 4,
  },
  {
    label: "A full week+",
    subtext: "You're always behind before you even start again",
    value: 7,
  },
  {
    label: "I never fully catch up",
    subtext: "The pile just keeps growing",
    value: 14,
  },
] as const;

export const LOST_CLIENT_OPTIONS = [
  "Yes",
  "No",
  "Probably but I don't know",
] as const;
