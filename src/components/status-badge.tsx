import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  green: "bg-success/12 text-success",
  yellow: "bg-warning/18 text-warning",
  red: "bg-destructive/12 text-destructive",
  blue: "bg-info/12 text-info",
  gray: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
};

export type Tone = keyof typeof tones;

export function StatusBadge({
  children,
  tone = "gray",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

export const statusTone: Record<string, Tone> = {
  Active: "green",
  Done: "green",
  Approved: "green",
  "On Track": "green",
  Completed: "blue",
  Won: "green",
  Pending: "yellow",
  "At Risk": "yellow",
  "In Review": "yellow",
  "On Leave": "yellow",
  Negotiation: "yellow",
  Delayed: "red",
  Rejected: "red",
  Overdue: "red",
  Lost: "red",
  Urgent: "red",
  High: "yellow",
  Medium: "blue",
  Low: "gray",
  "In Progress": "blue",
  Remote: "blue",
  Contacted: "blue",
  "Proposal Sent": "accent",
  "To Do": "gray",
  New: "gray",
  Draft: "gray",
};

export const priorityDot: Record<string, string> = {
  Urgent: "bg-destructive",
  High: "bg-warning",
  Medium: "bg-info",
  Low: "bg-muted-foreground",
};

export const toneOf = (value: string): Tone => statusTone[value] ?? "gray";
export const dotOf = (value: string): string => priorityDot[value] ?? "bg-muted-foreground";
