import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus, CalendarDays, ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge, toneOf } from "@/components/status-badge";
import { AvatarStack } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Northwind Operations Portal" },
      {
        name: "description",
        content:
          "Track delivery health, progress and staffing across every active Northwind client project.",
      },
      { property: "og:title", content: "Projects — Northwind" },
      {
        property: "og:description",
        content: "Six engagements with progress, owners, budgets and delivery risk at a glance.",
      },
    ],
  }),
  component: ProjectsOverview,
});

function ProjectsOverview() {
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("due");

  const list = projects
    .filter((p) => status === "all" || p.status === status)
    .slice()
    .sort((a, b) =>
      sort === "progress" ? b.progress - a.progress : a.name.localeCompare(b.name),
    );

  return (
    <>
      <PageHeader
        title="Projects"
        description="18 active engagements · 6 shown in this workspace"
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New project
          </Button>
        }
      />

      <div className="card-surface flex flex-wrap items-center gap-3 p-4">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-9 w-[160px] rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="On Track">On Track</SelectItem>
            <SelectItem value="At Risk">At Risk</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-9 w-[180px] rounded-lg">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="due">Sort by name</SelectItem>
            <SelectItem value="progress">Sort by progress</SelectItem>
          </SelectContent>
        </Select>
        <span className="ml-auto text-sm text-muted-foreground">{list.length} projects</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.id}
            to="/projects/$projectId"
            params={{ projectId: p.id }}
            className="card-surface group flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium group-hover:text-primary">{p.name}</p>
                <p className="truncate text-sm text-muted-foreground">{p.client}</p>
              </div>
              <StatusBadge tone={toneOf(p.status)} dot>
                {p.status}
              </StatusBadge>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{p.progress}%</span>
              </div>
              <Progress value={p.progress} className="h-1.5" />
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
              <AvatarStack ids={p.team} />
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                Due {p.due}
              </span>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open board <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
