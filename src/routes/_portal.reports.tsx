import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/page-header";
import { StatusBadge, toneOf } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { attendanceTrend, projects, tasks, taskColumns } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — Northwind Operations Portal" },
      {
        name: "description",
        content: "Delivery, attendance and workload analytics with exportable summaries by date range.",
      },
      { property: "og:title", content: "Reports & Analytics — Northwind" },
      {
        property: "og:description",
        content: "Project status distribution, attendance trend and task load in one report view.",
      },
    ],
  }),
  component: Reports,
});

const statusData = ["On Track", "At Risk", "Delayed", "Completed"].map((s) => ({
  name: s,
  count: projects.filter((p) => p.status === s).length,
}));

const donutData = taskColumns.map((c) => ({
  name: c,
  value: tasks.filter((t) => t.status === c).length,
}));

const donutColors = ["var(--color-chart-3)", "var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-4)"];

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-popover)",
  fontSize: 12,
};

function Reports() {
  return (
    <>
      <PageHeader
        title="Reports & analytics"
        description="Rolled up nightly from projects, timesheets and the attendance log"
        actions={
          <>
            <Select defaultValue="90">
              <SelectTrigger className="h-9 w-[170px] rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Project status distribution</h2>
          <p className="text-sm text-muted-foreground">Engagements grouped by delivery health</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} barSize={44}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="var(--color-chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <h2 className="text-base font-semibold">Task distribution</h2>
          <p className="text-sm text-muted-foreground">By board column</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={3}>
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={donutColors[i]} stroke="var(--color-card)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-2">
            {donutData.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: donutColors[i] }} />
                  {d.name}
                </span>
                <span className="font-medium">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-surface p-5">
        <h2 className="text-base font-semibold">Attendance trend</h2>
        <p className="text-sm text-muted-foreground">Present, remote and absent share by week</p>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="present" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="remote" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="absent" stroke="var(--color-chart-5)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">Project detail</h2>
          <p className="text-sm text-muted-foreground">Exportable summary for the selected range</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Project</TableHead>
              <TableHead className="hidden sm:table-cell">Client</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="hidden md:table-cell">Budget</TableHead>
              <TableHead className="hidden lg:table-cell">Due</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{p.client}</TableCell>
                <TableCell>{p.progress}%</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{p.budget}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{p.due}</TableCell>
                <TableCell className="text-right">
                  <StatusBadge tone={toneOf(p.status)} dot>
                    {p.status}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
