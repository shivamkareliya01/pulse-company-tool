import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  Paperclip,
  CalendarDays,
  FileText,
  UploadCloud,
} from "lucide-react";

import { StatusBadge, toneOf, dotOf } from "@/components/status-badge";
import { AvatarStack, UserAvatar } from "@/components/user-avatar";
import { TaskPanel } from "@/components/task-panel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projectById, taskColumns, tasks, byId, type Task } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/projects/$projectId")({
  loader: ({ params }) => {
    const project = projectById(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable — Northwind" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — Northwind Operations Portal` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.name} · ${project.client}` },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectDetail,
});

const files = [
  { name: "Discovery workshop notes.docx", size: "148 KB", by: "priya-nair", date: "18 Jun 2026" },
  { name: "Information architecture v3.fig", size: "12.4 MB", by: "sofia-marchetti", date: "02 Jul 2026" },
  { name: "Migration runbook.pdf", size: "740 KB", by: "liam-chen", date: "21 Jul 2026" },
  { name: "SOW — signed.pdf", size: "310 KB", by: "amara-okafor", date: "02 Feb 2026" },
];

const activity = [
  { who: "liam-chen", text: "pushed 4 commits to feature/cms-migration", time: "35 minutes ago" },
  { who: "sofia-marchetti", text: "moved “Subscription paywall screens” to In Review", time: "2 hours ago" },
  { who: "priya-nair", text: "commented on “Design QA on new component library”", time: "Yesterday" },
  { who: "amara-okafor", text: "changed the milestone date to 28 Aug 2026", time: "2 days ago" },
];

const milestones = [
  { name: "Discovery & IA", start: 0, span: 22, tone: "bg-chart-4" },
  { name: "Design system", start: 18, span: 28, tone: "bg-chart-1" },
  { name: "Build & migration", start: 40, span: 38, tone: "bg-chart-2" },
  { name: "QA & launch", start: 74, span: 24, tone: "bg-chart-3" },
];

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const projectTasks = tasks.filter((t) => t.project === project.id);
  const [active, setActive] = useState<Task | null>(null);

  return (
    <>
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="card-surface p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
              <StatusBadge tone={toneOf(project.status)} dot>
                {project.status}
              </StatusBadge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
            <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
          </div>
          <div className="shrink-0 space-y-3">
            <AvatarStack ids={project.team} max={5} />
            <div className="w-48">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-1.5" />
            </div>
          </div>
        </div>
        <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-4">
          {[
            ["Start", project.start],
            ["Due", project.due],
            ["Budget", project.budget],
            ["Open tasks", `${projectTasks.filter((t) => t.status !== "Done").length}`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
              <dd className="mt-0.5 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Tabs defaultValue="board">
        <TabsList className="h-10 w-full justify-start overflow-x-auto rounded-lg">
          {["board", "list", "timeline", "files", "activity"].map((t) => (
            <TabsTrigger key={t} value={t} className="rounded-md capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="board" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-4">
            {taskColumns.map((col) => {
              const items = projectTasks.filter((t) => t.status === col);
              return (
                <section key={col} className="rounded-xl bg-muted/50 p-3">
                  <header className="flex items-center justify-between px-1 pb-3">
                    <h3 className="text-sm font-semibold">{col}</h3>
                    <span className="rounded-full bg-card px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {items.length}
                    </span>
                  </header>
                  <ul className="space-y-2">
                    {items.map((task) => (
                      <li key={task.id}>
                        <button
                          onClick={() => setActive(task)}
                          className="w-full cursor-grab rounded-lg border border-border bg-card p-3 text-left shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-pop active:cursor-grabbing"
                        >
                          <div className="flex items-start gap-2">
                            <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", dotOf(task.priority))} />
                            <p className="text-sm font-medium leading-snug">{task.title}</p>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <UserAvatar id={task.assignee} size="sm" />
                            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                              {task.comments > 0 ? (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  {task.comments}
                                </span>
                              ) : null}
                              {task.attachments > 0 ? (
                                <span className="flex items-center gap-1">
                                  <Paperclip className="h-3.5 w-3.5" />
                                  {task.attachments}
                                </span>
                              ) : null}
                              <span className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {task.due}
                              </span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                    {items.length === 0 ? (
                      <li className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        Nothing here yet
                      </li>
                    ) : null}
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full justify-start text-muted-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Add task
                  </Button>
                </section>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-5">
          <div className="card-surface overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Task</TableHead>
                  <TableHead className="hidden sm:table-cell">Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden md:table-cell">Due</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectTasks.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer" onClick={() => setActive(t)}>
                    <TableCell className="font-medium">{t.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <UserAvatar id={t.assignee} size="sm" />
                        {byId(t.assignee)?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={toneOf(t.priority)}>{t.priority}</StatusBadge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{t.due}</TableCell>
                    <TableCell className="text-right">
                      <StatusBadge tone={toneOf(t.status)} dot>
                        {t.status}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-5">
          <div className="card-surface p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Feb 2026</span>
              <span>May 2026</span>
              <span>Aug 2026</span>
            </div>
            <ul className="mt-4 space-y-4">
              {milestones.map((m) => (
                <li key={m.name} className="grid gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center">
                  <span className="text-sm font-medium">{m.name}</span>
                  <div className="relative h-7 rounded-md bg-muted">
                    <span
                      className={cn("absolute inset-y-0 rounded-md opacity-90", m.tone)}
                      style={{ left: `${m.start}%`, width: `${m.span}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-5 space-y-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center transition-colors duration-150 hover:border-primary/50 hover:bg-accent/30">
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">Drop files here to attach them to this project</p>
            <p className="text-xs text-muted-foreground">PDF, Figma, DOCX, PNG · up to 50 MB each</p>
          </div>
          <ul className="card-surface divide-y divide-border">
            {files.map((f) => (
              <li key={f.name} className="flex items-center gap-3 px-5 py-4 hover:bg-muted/50">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {f.size} · {byId(f.by)?.name} · {f.date}
                  </p>
                </div>
                <UserAvatar id={f.by} size="sm" />
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="activity" className="mt-5">
          <ol className="card-surface divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-4">
                <UserAvatar id={a.who} size="md" />
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{byId(a.who)?.name}</span>{" "}
                    <span className="text-muted-foreground">{a.text}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </TabsContent>
      </Tabs>

      <TaskPanel task={active} onClose={() => setActive(null)} />
    </>
  );
}
