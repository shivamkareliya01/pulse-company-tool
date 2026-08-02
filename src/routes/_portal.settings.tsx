import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { User, Building2, ShieldCheck, BellRing, Plug } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Northwind Operations Portal" },
      {
        name: "description",
        content: "Manage your profile, company details, roles and permissions, notifications and integrations.",
      },
      { property: "og:title", content: "Settings — Northwind" },
      {
        property: "og:description",
        content: "Admin controls for company info, the role permission matrix and connected tools.",
      },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company info", icon: Building2 },
  { id: "roles", label: "Roles & permissions", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: BellRing },
  { id: "integrations", label: "Integrations", icon: Plug },
] as const;

const permissions = [
  "View employee directory",
  "Edit employee records",
  "Approve leave requests",
  "Manage projects & tasks",
  "Approve timesheets",
  "View salary & compensation",
  "Manage roles & permissions",
];

const matrix: Record<string, boolean[]> = {
  Admin: [true, true, true, true, true, true, true],
  Manager: [true, true, true, true, true, false, false],
  Employee: [true, false, false, false, false, false, false],
};

const integrations = [
  { name: "Slack", note: "Leave approvals and task mentions", on: true },
  { name: "Google Workspace", note: "SSO, calendar sync and directory", on: true },
  { name: "GitHub", note: "Commit activity on project boards", on: true },
  { name: "Xero", note: "Timesheet export for payroll", on: false },
];

function SettingsPage() {
  const [section, setSection] = useState<(typeof sections)[number]["id"]>("profile");

  return (
    <>
      <PageHeader title="Settings" description="Workspace configuration for Northwind Group" />

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav className="card-surface h-fit p-2">
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setSection(s.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                    section === s.id
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6">
          {section === "profile" ? (
            <div className="card-surface p-6">
              <h2 className="text-base font-semibold">Your profile</h2>
              <div className="mt-5 flex items-center gap-4">
                <UserAvatar id={currentUser.id} size="xl" />
                <div>
                  <Button variant="outline" size="sm">
                    Upload photo
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">PNG or JPG, at least 400×400px.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" defaultValue={currentUser.name} className="h-9 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job title</Label>
                  <Input id="title" defaultValue={currentUser.title} className="h-9 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail">Work email</Label>
                  <Input id="mail" defaultValue={currentUser.email} className="h-9 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tel">Phone</Label>
                  <Input id="tel" defaultValue={currentUser.phone} className="h-9 rounded-lg" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">About</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    className="rounded-lg"
                    defaultValue="Platform engineering lead. Focused on deploy reliability and developer experience."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
                <Button variant="ghost">Discard</Button>
                <Button>Save changes</Button>
              </div>
            </div>
          ) : null}

          {section === "company" ? (
            <div className="card-surface p-6">
              <h2 className="text-base font-semibold">Company information</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Legal name", "Northwind Group Ltd."],
                  ["Trading name", "Northwind"],
                  ["Registration no.", "GB-1184-77302"],
                  ["Head office", "18 Wharf Road, London N1 7GS"],
                  ["Fiscal year start", "1 April"],
                  ["Default currency", "USD"],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <Label>{label}</Label>
                    <Input defaultValue={value} className="h-9 rounded-lg" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
                <Button variant="ghost">Discard</Button>
                <Button>Save changes</Button>
              </div>
            </div>
          ) : null}

          {section === "roles" ? (
            <div className="card-surface overflow-hidden">
              <div className="border-b border-border px-6 py-5">
                <h2 className="text-base font-semibold">Roles & permissions</h2>
                <p className="text-sm text-muted-foreground">
                  Changes apply immediately to everyone holding the role.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Permission</th>
                      {Object.keys(matrix).map((role) => (
                        <th key={role} className="px-4 py-3 text-center font-medium text-muted-foreground">
                          {role}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, i) => (
                      <tr key={perm} className="border-b border-border last:border-0 hover:bg-muted/40">
                        <td className="px-6 py-3">{perm}</td>
                        {Object.keys(matrix).map((role) => (
                          <td key={role} className="px-4 py-3 text-center">
                            <Checkbox defaultChecked={matrix[role]![i]} aria-label={`${role}: ${perm}`} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
                <Button variant="ghost">Reset to defaults</Button>
                <Button>Save permissions</Button>
              </div>
            </div>
          ) : null}

          {section === "notifications" ? (
            <div className="card-surface p-6">
              <h2 className="text-base font-semibold">Notifications</h2>
              <ul className="mt-5 divide-y divide-border">
                {[
                  ["Leave requests awaiting approval", "Email and in-app", true],
                  ["Task assigned to me", "In-app only", true],
                  ["Project marked At Risk", "Email, in-app and Slack", true],
                  ["Weekly timesheet reminder", "Email every Friday at 16:00", true],
                  ["Company announcements", "In-app only", false],
                ].map(([label, note, on]) => (
                  <li key={label as string} className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{note}</p>
                    </div>
                    <Switch defaultChecked={on as boolean} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {section === "integrations" ? (
            <ul className="card-surface divide-y divide-border">
              {integrations.map((i) => (
                <li key={i.name} className="flex items-center gap-4 px-6 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground">
                    {i.name.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.note}</p>
                  </div>
                  <StatusBadge tone={i.on ? "green" : "gray"} dot>
                    {i.on ? "Connected" : "Not connected"}
                  </StatusBadge>
                  <Button variant="outline" size="sm" className="shrink-0">
                    {i.on ? "Manage" : "Connect"}
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}
