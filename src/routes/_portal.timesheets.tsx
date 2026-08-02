import { createFileRoute } from "@tanstack/react-router";
import { Send, Clock } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/timesheets")({
  head: () => ({
    meta: [
      { title: "Timesheets — Northwind Operations Portal" },
      {
        name: "description",
        content: "Log and submit weekly hours per project with daily and weekly totals.",
      },
      { property: "og:title", content: "Timesheets — Northwind" },
      {
        property: "og:description",
        content: "Weekly time entry grid with project rows, daily totals and approval status.",
      },
    ],
  }),
  component: Timesheets,
});

const days = ["Mon 27", "Tue 28", "Wed 29", "Thu 30", "Fri 31", "Sat 1", "Sun 2"];

const rows = [
  { project: "Website Redesign", task: "CMS content migration", hours: [3, 4, 2, 3.5, 2, 0, 0] },
  { project: "Website Redesign", task: "Design QA & reviews", hours: [1, 1.5, 2, 1, 1, 0, 0] },
  { project: "Mobile App v2", task: "Offline sync spike", hours: [2, 2, 3, 2, 1.5, 0, 0] },
  { project: "Client Onboarding Portal", task: "Provisioning webhook", hours: [2, 0.5, 1, 1.5, 2, 0, 0] },
  { project: "Internal", task: "Hiring interviews & 1:1s", hours: [1, 1, 0.5, 1, 1.5, 0, 0] },
];

function Timesheets() {
  const dailyTotals = days.map((_, i) => rows.reduce((sum, r) => sum + (r.hours[i] ?? 0), 0));
  const weekTotal = dailyTotals.reduce((a, b) => a + b, 0);

  return (
    <>
      <PageHeader
        title="Timesheets"
        description="Week 31 · 27 July – 2 August 2026"
        actions={
          <>
            <StatusBadge tone="yellow" dot className="h-9 px-3 text-sm">
              Draft — not submitted
            </StatusBadge>
            <Button>
              <Send className="h-4 w-4" />
              Submit week
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Logged this week", `${weekTotal} h`, "Target 40 h"],
          ["Billable ratio", "82%", "+4 pts vs week 30"],
          ["Approvals pending", "1", "Week 30 with Amara Okafor"],
        ].map(([label, value, note]) => (
          <div key={label} className="card-surface p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 bg-card px-5 py-3 text-left font-medium text-muted-foreground">
                Project / task
              </th>
              {days.map((d) => (
                <th key={d} className="px-2 py-3 text-center font-medium text-muted-foreground">
                  {d}
                </th>
              ))}
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.task} className="border-b border-border transition-colors duration-150 hover:bg-muted/40">
                <td className="sticky left-0 bg-card px-5 py-3">
                  <p className="font-medium">{row.task}</p>
                  <p className="text-xs text-muted-foreground">{row.project}</p>
                </td>
                {row.hours.map((h, i) => (
                  <td key={i} className="px-2 py-2 text-center">
                    <Input
                      defaultValue={h ? String(h) : ""}
                      placeholder="—"
                      className={cn(
                        "mx-auto h-9 w-16 rounded-md border-transparent bg-transparent text-center transition-colors duration-150 hover:border-border hover:bg-muted/60 focus-visible:border-ring",
                        i > 4 && "text-muted-foreground",
                      )}
                    />
                  </td>
                ))}
                <td className="px-5 py-3 text-right font-medium">
                  {row.hours.reduce((a, b) => a + b, 0)} h
                </td>
              </tr>
            ))}
            <tr className="bg-muted/50">
              <td className="sticky left-0 bg-muted/50 px-5 py-3 font-medium">Daily total</td>
              {dailyTotals.map((t, i) => (
                <td key={i} className="px-2 py-3 text-center font-medium">
                  {t ? `${t} h` : "—"}
                </td>
              ))}
              <td className="px-5 py-3 text-right font-semibold">{weekTotal} h</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card-surface flex flex-wrap items-center gap-3 p-5 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        Timesheets lock every Monday at 12:00 UTC. Late edits need manager approval.
      </div>
    </>
  );
}
