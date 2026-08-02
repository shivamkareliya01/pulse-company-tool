import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, ArrowUpDown } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge, toneOf } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { TaskPanel } from "@/components/task-panel";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { byId, projectById, projects, tasks, type Task } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Northwind Operations Portal" },
      {
        name: "description",
        content: "Every open and completed task across Northwind projects with owner, priority and due date.",
      },
      { property: "og:title", content: "Tasks — Northwind" },
      {
        property: "og:description",
        content: "Cross-project task list with priority, assignee and status filtering.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [project, setProject] = useState("all");
  const [status, setStatus] = useState("all");
  const [active, setActive] = useState<Task | null>(null);

  const list = tasks.filter(
    (t) => (project === "all" || t.project === project) && (status === "all" || t.status === status),
  );

  return (
    <>
      <PageHeader
        title="Tasks"
        description={`${tasks.filter((t) => t.status !== "Done").length} open tasks across 6 projects`}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New task
          </Button>
        }
      />

      <div className="card-surface flex flex-wrap items-center gap-3 p-4">
        <Select value={project} onValueChange={setProject}>
          <SelectTrigger className="h-9 w-[220px] rounded-lg">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-9 w-[160px] rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            {["To Do", "In Progress", "In Review", "Done"].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="ml-auto text-sm text-muted-foreground">{list.length} results</span>
      </div>

      <div className="card-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <span className="inline-flex items-center gap-1">
                  Task <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                </span>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Project</TableHead>
              <TableHead className="hidden sm:table-cell">Assignee</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="hidden md:table-cell">Due</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((t) => (
              <TableRow key={t.id} className="cursor-pointer" onClick={() => setActive(t)}>
                <TableCell>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground lg:hidden">
                    {projectById(t.project)?.name}
                  </p>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {projectById(t.project)?.name}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <UserAvatar id={t.assignee} size="sm" />
                    <span className="truncate">{byId(t.assignee)?.name}</span>
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

      <TaskPanel task={active} onClose={() => setActive(null)} />
    </>
  );
}
