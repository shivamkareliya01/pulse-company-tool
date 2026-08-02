import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Pencil,
  MessageSquare,
  FileText,
  Laptop,
  IdCard,
  Headphones,
  Download,
} from "lucide-react";

import { StatusBadge, toneOf } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { byId, leaveRequests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/employees/$employeeId")({
  loader: ({ params }) => {
    const employee = byId(params.employeeId);
    if (!employee) throw notFound();
    return { employee };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Employee unavailable — Northwind" }, { name: "robots", content: "noindex" }],
      };
    }
    const { employee } = loaderData;
    return {
      meta: [
        { title: `${employee.name} — Northwind Operations Portal` },
        {
          name: "description",
          content: `${employee.name} is a ${employee.title} in ${employee.department} at Northwind, based in ${employee.location}.`,
        },
        { property: "og:title", content: `${employee.name} — ${employee.title}` },
        {
          property: "og:description",
          content: `Profile, attendance, leave history and assigned assets for ${employee.name}.`,
        },
      ],
    };
  },
  component: EmployeeDetail,
});

const documents = [
  { name: "Offer letter — signed.pdf", size: "212 KB", date: "12 Mar 2019" },
  { name: "Employment contract.pdf", size: "486 KB", date: "12 Mar 2019" },
  { name: "Tax declaration 2026.pdf", size: "98 KB", date: "14 Apr 2026" },
  { name: "Certification — AWS Solutions Architect.pdf", size: "1.2 MB", date: "08 Jan 2025" },
];

const assets = [
  { icon: Laptop, name: 'MacBook Pro 16" M4', tag: "NW-LT-0421", issued: "04 Feb 2025" },
  { icon: IdCard, name: "Access badge — HQ floor 4", tag: "NW-ID-1180", issued: "12 Mar 2019" },
  { icon: Headphones, name: "Sony WH-1000XM5", tag: "NW-AC-0910", issued: "22 Sep 2024" },
];

const goals = [
  { title: "Reduce deploy lead time to under 2 hours", progress: 78, cycle: "H2 2026" },
  { title: "Grow platform team to 12 engineers", progress: 55, cycle: "H2 2026" },
  { title: "Ship internal service catalogue", progress: 100, cycle: "H1 2026" },
];

const heat = [0, 1, 2, 2, 1, 3, 0, 2, 2, 2, 1, 2, 0, 0, 2, 2, 3, 2, 1, 0, 0, 2, 2, 2, 2, 1, 0, 0, 2, 2, 1];
const heatTone = ["bg-muted", "bg-warning/40", "bg-success/70", "bg-info/60"];
const heatLabel = ["Weekend / holiday", "Half day", "Present", "Remote"];

function EmployeeDetail() {
  const { employee } = Route.useLoaderData();
  const history = leaveRequests.filter((l) => l.employee === employee.id);

  return (
    <>
      <Link
        to="/employees"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <div className="card-surface p-6">
        <div className="flex flex-wrap items-start gap-5">
          <UserAvatar id={employee.id} size="xl" state="in" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{employee.name}</h1>
              <StatusBadge tone={toneOf(employee.status)} dot>
                {employee.status}
              </StatusBadge>
            </div>
            <p className="mt-1 text-muted-foreground">
              {employee.title} · {employee.department}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                {employee.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                {employee.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {employee.location}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="h-10 w-full justify-start overflow-x-auto rounded-lg">
          {["overview", "documents", "attendance", "leave", "performance", "assets"].map((t) => (
            <TabsTrigger key={t} value={t} className="rounded-md capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-5 grid gap-6 lg:grid-cols-3">
          <div className="card-surface p-5 lg:col-span-2">
            <h2 className="text-base font-semibold">Personal information</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Full name", employee.name],
                ["Employee ID", `NW-${employee.initials}-2291`],
                ["Job title", employee.title],
                ["Department", employee.department],
                ["Reporting manager", employee.manager],
                ["Joining date", employee.joined],
                ["Employment type", "Full time · Permanent"],
                ["Work location", employee.location],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-base font-semibold">Leave balance</h2>
            <ul className="mt-4 space-y-4">
              {[
                ["Sick leave", 7, 10],
                ["Casual leave", 4, 12],
                ["Earned leave", 13, 21],
              ].map(([label, left, total]) => (
                <li key={label as string}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">
                      {left} / {total} days
                    </span>
                  </div>
                  <Progress value={((left as number) / (total as number)) * 100} className="h-1.5" />
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-5">
          <ul className="card-surface divide-y divide-border">
            {documents.map((doc) => (
              <li
                key={doc.name}
                className="flex items-center gap-3 px-5 py-4 transition-colors duration-150 hover:bg-muted/50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} · uploaded {doc.date}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="attendance" className="mt-5">
          <div className="card-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">July 2026</h2>
                <p className="text-sm text-muted-foreground">21 present · 2 remote · 1 half day</p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {heatLabel.map((l, i) => (
                  <span key={l} className="flex items-center gap-1.5">
                    <span className={cn("h-3 w-3 rounded-sm", heatTone[i])} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-center text-xs text-muted-foreground">
                  {d}
                </span>
              ))}
              {heat.map((level, i) => (
                <span
                  key={i}
                  title={`${i + 1} July — ${heatLabel[level]}`}
                  className={cn(
                    "grid aspect-square place-items-center rounded-md text-xs font-medium transition-transform duration-150 hover:scale-105",
                    heatTone[level],
                  )}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leave" className="mt-5">
          <div className="card-surface overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Request</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Dates</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                      No leave taken in the last 12 months.
                    </TableCell>
                  </TableRow>
                ) : (
                  history.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">{l.id}</TableCell>
                      <TableCell>{l.type}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {l.from} → {l.to}
                      </TableCell>
                      <TableCell>{l.days}</TableCell>
                      <TableCell className="text-right">
                        <StatusBadge tone={toneOf(l.status)}>{l.status}</StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="card-surface p-5">
            <h2 className="text-base font-semibold">Current goals</h2>
            <ul className="mt-4 space-y-5">
              {goals.map((g) => (
                <li key={g.title}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{g.title}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">{g.cycle}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={g.progress} className="h-1.5" />
                    <span className="w-9 shrink-0 text-right text-xs font-medium">{g.progress}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-base font-semibold">Review history</h2>
            <ul className="mt-4 divide-y divide-border">
              {[
                ["H1 2026", "Exceeds expectations", "Marcus Webb"],
                ["H2 2025", "Meets expectations", "Marcus Webb"],
                ["H1 2025", "Exceeds expectations", "Daniel Reyes"],
              ].map(([cycle, rating, reviewer]) => (
                <li key={cycle} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium">{cycle}</p>
                    <p className="text-xs text-muted-foreground">Reviewed by {reviewer}</p>
                  </div>
                  <StatusBadge tone={rating === "Exceeds expectations" ? "green" : "blue"}>
                    {rating}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="mt-5">
          <ul className="card-surface divide-y divide-border">
            {assets.map((a) => (
              <li key={a.tag} className="flex items-center gap-3 px-5 py-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <a.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Asset tag {a.tag} · issued {a.issued}
                  </p>
                </div>
                <StatusBadge tone="green">Assigned</StatusBadge>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </>
  );
}
