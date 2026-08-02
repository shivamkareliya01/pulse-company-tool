import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, LayoutGrid, List, Phone, Mail, CalendarClock, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge, toneOf } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { byId, leadStages, leads, type Lead } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/crm")({
  head: () => ({
    meta: [
      { title: "CRM Pipeline — Northwind Operations Portal" },
      {
        name: "description",
        content: "Track leads and clients through the sales pipeline from first contact to won or lost.",
      },
      { property: "og:title", content: "CRM Pipeline — Northwind" },
      {
        property: "og:description",
        content: "Deal values, owners and expected close dates across six pipeline stages.",
      },
    ],
  }),
  component: CrmPage,
});

const timeline = [
  { kind: "Call", text: "Discovery call — 42 min, walked through current stack", time: "29 Jul, 14:00" },
  { kind: "Email", text: "Sent security questionnaire and reference list", time: "27 Jul, 09:12" },
  { kind: "Meeting", text: "Intro meeting with operations and finance", time: "21 Jul, 11:30" },
  { kind: "Email", text: "Inbound enquiry via the pricing page", time: "18 Jul, 16:48" },
];

function LeadPanel({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  return (
    <Sheet open={!!lead} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        {lead ? (
          <>
            <SheetHeader className="border-b border-border px-5 py-4">
              <p className="text-xs text-muted-foreground">{lead.id}</p>
              <SheetTitle className="text-left text-lg">{lead.company}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={toneOf(lead.stage)} dot>
                  {lead.stage}
                </StatusBadge>
                <StatusBadge tone="accent">{lead.value}</StatusBadge>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Contact", lead.contact],
                  ["Role", lead.role],
                  ["Email", lead.email],
                  ["Expected close", lead.close],
                  ["Owner", byId(lead.owner)?.name ?? ""],
                  ["Deal value", lead.value],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 truncate text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <div>
                <p className="text-sm font-medium">Activity</p>
                <ol className="mt-3 space-y-3">
                  {timeline.map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                        {t.kind === "Call" ? (
                          <Phone className="h-4 w-4" />
                        ) : t.kind === "Email" ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <CalendarClock className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm">{t.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.kind} · {t.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="text-sm font-medium">Notes</p>
                <Textarea
                  rows={4}
                  className="mt-2 rounded-lg"
                  defaultValue="Budget confirmed for Q4. Procurement wants a two-year term with an exit clause after year one."
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-border px-5 py-4">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button>
                Convert to client
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function CrmPage() {
  const [view, setView] = useState<"pipeline" | "table">("pipeline");
  const [active, setActive] = useState<Lead | null>(null);

  const open = leads.filter((l) => l.stage !== "Won" && l.stage !== "Lost");
  const pipelineValue = open.reduce(
    (sum, l) => sum + Number(l.value.replace(/[^0-9]/g, "")),
    0,
  );

  return (
    <>
      <PageHeader
        title="CRM pipeline"
        description={`${open.length} open deals · $${pipelineValue.toLocaleString()} weighted pipeline`}
        actions={
          <>
            <div className="flex items-center rounded-lg border border-border p-0.5">
              {(["pipeline", "table"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={`${v} view`}
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-md transition-colors duration-150",
                    view === v ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {v === "pipeline" ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                </button>
              ))}
            </div>
            <Button>
              <Plus className="h-4 w-4" />
              New lead
            </Button>
          </>
        }
      />

      {view === "pipeline" ? (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {leadStages.map((stage) => {
            const items = leads.filter((l) => l.stage === stage);
            return (
              <section key={stage} className="rounded-xl bg-muted/50 p-3">
                <header className="flex items-center justify-between px-1 pb-3">
                  <h3 className="text-sm font-semibold">{stage}</h3>
                  <span className="rounded-full bg-card px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {items.length}
                  </span>
                </header>
                <ul className="space-y-2">
                  {items.map((lead) => (
                    <li key={lead.id}>
                      <button
                        onClick={() => setActive(lead)}
                        className="w-full rounded-lg border border-border bg-card p-3 text-left shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-pop"
                      >
                        <p className="truncate text-sm font-medium">{lead.company}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {lead.contact} · {lead.role}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-primary">{lead.value}</span>
                          <UserAvatar id={lead.owner} size="sm" />
                        </div>
                        <p className="mt-2 text-[11px] text-muted-foreground">Close {lead.close}</p>
                      </button>
                    </li>
                  ))}
                  {items.length === 0 ? (
                    <li className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                      No deals
                    </li>
                  ) : null}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Company</TableHead>
                <TableHead className="hidden sm:table-cell">Contact</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="hidden md:table-cell">Close date</TableHead>
                <TableHead className="hidden lg:table-cell">Owner</TableHead>
                <TableHead className="text-right">Stage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.id} className="cursor-pointer" onClick={() => setActive(l)}>
                  <TableCell className="font-medium">{l.company}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {l.contact} · {l.role}
                  </TableCell>
                  <TableCell className="font-medium">{l.value}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{l.close}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <UserAvatar id={l.owner} size="sm" />
                      {byId(l.owner)?.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge tone={toneOf(l.stage)} dot>
                      {l.stage}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <LeadPanel lead={active} onClose={() => setActive(null)} />
    </>
  );
}
