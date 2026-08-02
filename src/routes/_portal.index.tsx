import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Users,
  FolderKanban,
  CalendarClock,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/page-header";
import { StatusBadge, toneOf, dotOf } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  activityFeed,
  attendanceToday,
  attendanceTrend,
  byId,
  currentUser,
  employees,
  leaveRequests,
  projects,
  tasks,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Northwind Operations Portal" },
      {
        name: "description",
        content:
          "Company-wide snapshot of headcount, active projects, pending leave requests and tasks due this week.",
      },
      { property: "og:title", content: "Dashboard — Northwind Operations Portal" },
      {
        property: "og:description",
        content: "Headcount, project health, attendance and task load in one internal dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  {
    label: "Total Employees",
    value: "142",
    delta: "+6 this quarter",
    up: true,
    icon: Users,
  },
  {
    label: "Active Projects",
    value: "18",
    delta: "+2 vs last month",
    up: true,
    icon: FolderKanban,
  },
  {
    label: "Pending Leave Requests",
    value: "3",
    delta: "2 need action today",
    up: false,
    icon: CalendarClock,
  },
  {
    label: "Tasks Due This Week",
    value: "27",
    delta: "-4 vs last week",
    up: true,
    icon: CheckSquare,
  },
];

const progressData = projects
  .filter((p) => p.status !== "Completed")
  .map((p) => ({ name: p.name.split(" ")[0], progress: p.progress }));

const stateLabel: Record<string, string> = {
  in: "In office",
  remote: "Remote",
  leave: "On leave",
  out: "Out",
};

function Dashboard() {
  const myTasks = tasks.filter((t) => t.assignee === currentUser.id && t.status !== "Done");
  const pending = leaveRequests.filter((l) => l.status === "Pending");

  return (
    <>
      <PageHeader
        title={`Good afternoon, ${currentUser.name.split(" ")[0]}`}
        description="Sunday, 2 August 2026 · Engineering, 142 people across 5 departments"
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/reports">View reports</Link>
            </Button>
            <Button asChild>
              <Link to="/projects">Open projects</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-surface p-5 transition-shadow duration-200 hover:shadow-pop">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                <kpi.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{kpi.value}</p>
            <p
              className={cn(
                "mt-2 flex items-center gap-1 text-xs font-medium",
                kpi.up ? "text-success" : "text-warning",
              )}
            >
              {kpi.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold">Project progress</h2>
              <p className="text-sm text-muted-foreground">Completion % across active engagements</p>
            </div>
            <StatusBadge tone="green" dot>
              5 of 6 on track
            </StatusBadge>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} barSize={34}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-popover)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="progress" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <h2 className="text-base font-semibold">Attendance trend</h2>
          <p className="text-sm text-muted-foreground">Present % over the last six weeks</p>
          <div className="mt-6 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis
                  domain={[70, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-popover)",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
            Average presence is up 2.4 points since the hybrid policy update in June.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">My tasks</h2>
            <Link
              to="/tasks"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              All tasks <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {myTasks.map((task) => (
              <li
                key={task.id}
                className="rounded-lg border border-border p-3 transition-colors duration-150 hover:bg-muted/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 text-sm font-medium leading-snug">{task.title}</p>
                  <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", dotOf(task.priority))} />
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Due {task.due}</span>
                  <span>·</span>
                  <StatusBadge tone={toneOf(task.priority)}>{task.priority}</StatusBadge>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Recent activity</h2>
          <ol className="mt-5 space-y-5">
            {activityFeed.map((item, i) => (
              <li key={i} className="relative flex gap-3 pl-1">
                {i !== activityFeed.length - 1 ? (
                  <span className="absolute left-[18px] top-9 h-[calc(100%-12px)] w-px bg-border" />
                ) : null}
                <UserAvatar id={item.who} size="md" />
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{byId(item.who)?.name}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Team today</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success" /> In office
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-info" /> Remote
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warning" /> On leave
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground" /> Out
              </span>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            {attendanceToday.map((row) => (
              <Link
                key={row.id}
                to="/employees/$employeeId"
                params={{ employeeId: row.id }}
                className="group flex w-20 flex-col items-center gap-1.5 text-center"
              >
                <UserAvatar id={row.id} size="lg" state={row.state} />
                <span className="w-full truncate text-xs font-medium group-hover:text-primary">
                  {byId(row.id)?.name.split(" ")[0]}
                </span>
                <span className="text-[11px] text-muted-foreground">{stateLabel[row.state]}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Awaiting approval</h2>
            <Link to="/leave" className="text-xs font-medium text-primary hover:underline">
              Review
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {pending.map((req) => (
              <li key={req.id} className="flex items-center gap-3">
                <UserAvatar id={req.employee} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{byId(req.employee)?.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {req.type} · {req.days} day{req.days > 1 ? "s" : ""} · from {req.from}
                  </p>
                </div>
                <StatusBadge tone="yellow">Pending</StatusBadge>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-sm font-medium">Headcount by department</p>
            <ul className="mt-3 space-y-3">
              {["Engineering", "Design", "Sales", "Marketing", "HR"].map((dept) => {
                const count = employees.filter((e) => e.department === dept).length;
                return (
                  <li key={dept}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{dept}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <Progress value={(count / 4) * 100} className="h-1.5" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
