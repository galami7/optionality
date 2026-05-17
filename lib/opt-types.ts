export type Urgency = "past" | "critical" | "warning" | "safe" | "future" | "milestone";
export type Phase = "prep" | "opt" | "stem" | "grace";

export const urgencyConfig: Record<Urgency, { dot: string; badge: string; label: string }> = {
  past: {
    dot: "bg-[#3D3020]",
    badge: "bg-[#251C0E] text-[#6E5E48] border-[#3D3020]",
    label: "Passed",
  },
  critical: {
    dot: "bg-red-500 animate-pulse",
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
    label: "Critical",
  },
  warning: {
    dot: "bg-[#F59E0B]",
    badge: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    label: "Upcoming",
  },
  safe: {
    dot: "bg-[#C9A96E]",
    badge: "bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/30",
    label: "On track",
  },
  future: {
    dot: "bg-[#3B82F6]",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    label: "Future",
  },
  milestone: {
    dot: "bg-[#A78BFA]",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    label: "Milestone",
  },
};

export const phaseColors: Record<Phase, string> = {
  prep: "text-[#F59E0B]",
  opt: "text-[#C9A96E]",
  stem: "text-[#3B82F6]",
  grace: "text-purple-400",
};

export const phaseLabels: Record<Phase, string> = {
  prep: "Pre-graduation",
  opt: "OPT Period",
  stem: "STEM Extension",
  grace: "Grace Period",
};
