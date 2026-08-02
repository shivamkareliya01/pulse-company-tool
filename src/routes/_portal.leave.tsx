import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, Check, X } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge, toneOf } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { byId, leaveRequests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/leave")({
  head: () => ({
    meta: [
      { title: "Attendance & Leave — Northwind Operations Portal" },
      {
        name: "description",
        content: "Monthly attendance calendar, leave balances and manager approvals for leave requests.",
      },
      { property: "og:title", content: "Attendance & Leave — Northwind" },
      {
        property: "og:description",
        content: "Colour-coded attendance calendar plus approve/reject queue for pending leave.",
      },
    ],
  }),
  component: LeavePage,
});

// 1 Aug 2026 is a Saturday: five leading blanks, then day cells.
const dayStates = [
  ...Array.from({ length: 5 }, () => "blank" as const),
  ...(["holiday", "holiday", "present", "present", "leave", "present", "present", "holiday", "holiday",
    "present", "present", "present", "remote", "present", "holiday", "holiday", "present", "present",
    "present", "present", "absent", "holiday", "holiday", "present", "present", "remote", "present",
    "present", "holiday", "holiday", "present"] as const),
];

const stateTone: Record<string, string> = {
  present: "bg-success/70 text-success-foreground",
  remote: "bg-info/60 text-info-foreground",
  leave: "bg-warning/70 text-warning-foreground",
  absent: "bg-destructive/60 text-destructive-foreground",
  holiday: "bg-muted text-muted-foreground",
};

const legend = [
  ["Present", "bg-success/70"],
  ["Remote", "bg-info/60"],
  ["On leave", "bg-warning/70"],
  ["Absent", "bg-destructive/60"],
  ["Weekend / holiday", "bg-muted"],
];

function ApplyLeaveDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="h-4 w-4" />
          Apply for leave
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for leave</DialogTitle>
          <DialogDescription>
            Requests go to your reporting manager and HR for approval.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label>Leave type</Label>
            <Select defaultValue="Earned">
              <SelectTrigger className="h-9 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Sick", "Casual", "Earned", "Parental"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t} leave
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input id="from" type="date" defaultValue="2026-08-17" className="h-9 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" type="date" defaultValue="2026-08-21" className="h-9 rounded-lg" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              rows={3}
              placeholder="A short note for your manager"
              className="rounded-lg"
            />
            <p className="text-xs text-muted-foreground">5 working days will be deducted from Earned leave.</p>
          </div>
        </form>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Submit request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LeavePage() {
  const pending = leaveRequests.filter((l) => l.status === "Pending");

  return (
    <>
      <PageHeader
        title="Attendance & leave"
        description="August 2026 · your team of 9 direct and indirect reports"
        actions={<ApplyLeaveDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Sick leave", 7, 10],
          ["Casual leave", 4, 12],
          ["Earned leave", 13, 21],
        ].map(([label, left, total]) => (
          <div key={label as string} className="card-surface p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {left} <span className="text-base font-normal text-muted-foreground">/ {total} days</span>
            </p>
            <Progress value={((left as number) / (total as number)) * 100} className="mt-3 h-1.5" />
          </div>
        ))}
      </div>

      <div className="card-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">August 2026</h2>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {legend.map(([label, tone]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={cn("h-3 w-3 rounded-sm", tone)} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d} className="pb-1 text-center text-xs text-muted-foreground">
              {d}
            </span>
          ))}
          {dayStates.map((state, i) => {
            if (state === "blank") return <span key={`b${i}`} />;
            const dayNumber = i - 4;
            return (
              <span
                key={i}
                className={cn(
                  "grid aspect-square place-items-center rounded-lg text-sm font-medium transition-transform duration-150 hover:scale-[1.04]",
                  stateTone[state],
                )}
                title={`${dayNumber} August — ${state}`}
              >
                {dayNumber}
              </span>
            );
          })}
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Leave requests</h2>
            <p className="text-sm text-muted-foreground">{pending.length} awaiting your decision</p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Employee</TableHead>
              <TableHead className="hidden md:table-cell">Dates</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden lg:table-cell">Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveRequests.map((l) => (
              <TableRow key={l.id}>
                <TableCell>
                  <span className="flex items-center gap-2.5">
                    <UserAvatar id={l.employee} size="sm" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{byId(l.employee)?.name}</span>
                      <span className="block text-xs text-muted-foreground md:hidden">
                        {l.from} → {l.to}
                      </span>
                    </span>
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {l.from} → {l.to} · {l.days}d
                </TableCell>
                <TableCell>{l.type}</TableCell>
                <TableCell className="hidden lg:table-cell max-w-[240px] truncate text-muted-foreground">
                  {l.reason}
                </TableCell>
                <TableCell>
                  <StatusBadge tone={toneOf(l.status)} dot>
                    {l.status}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-right">
                  {l.status === "Pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 text-destructive hover:text-destructive">
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Closed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
