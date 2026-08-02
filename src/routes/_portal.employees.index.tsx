import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, LayoutGrid, List, Plus, Mail, UserRoundX } from "lucide-react";

import { PageHeader, EmptyState } from "@/components/page-header";
import { StatusBadge, toneOf } from "@/components/status-badge";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { departments, employees } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal/employees/")({
  head: () => ({
    meta: [
      { title: "Employee Directory — Northwind Operations Portal" },
      {
        name: "description",
        content:
          "Search and filter the Northwind employee directory by department, role and availability status.",
      },
      { property: "og:title", content: "Employee Directory — Northwind" },
      {
        property: "og:description",
        content: "142 people across Engineering, Design, HR, Sales and Marketing.",
      },
    ],
  }),
  component: EmployeeDirectory,
});

function EmployeeDirectory() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = employees.filter(
    (e) =>
      (dept === "all" || e.department === dept) &&
      (status === "all" || e.status === status) &&
      (e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.title.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Employee directory"
        description={`${employees.length} people shown from 142 total records`}
        actions={
          <>
            <div className="flex items-center rounded-lg border border-border p-0.5">
              {(["grid", "table"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={`${v} view`}
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-md transition-colors duration-150",
                    view === v
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {v === "grid" ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                </button>
              ))}
            </div>
            <Button>
              <Plus className="h-4 w-4" />
              Add employee
            </Button>
          </>
        }
      />

      <div className="card-surface flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or title"
            className="h-9 rounded-lg pl-9"
          />
        </div>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="h-9 w-[170px] rounded-lg">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-9 w-[150px] rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<UserRoundX className="h-5 w-5" />}
          title="No matching employees"
          body="Nobody matches these filters. Try clearing the department or status filter."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setDept("all");
                setStatus("all");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <Link
              key={e.id}
              to="/employees/$employeeId"
              params={{ employeeId: e.id }}
              className="card-surface group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop"
            >
              <div className="flex items-start gap-3">
                <UserAvatar id={e.id} size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium group-hover:text-primary">{e.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{e.title}</p>
                </div>
                <StatusBadge tone={toneOf(e.status)} dot>
                  {e.status}
                </StatusBadge>
              </div>
              <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Department</dt>
                  <dd className="truncate font-medium">{e.department}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="truncate">{e.location}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="flex min-w-0 items-center gap-1.5 truncate text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{e.email}</span>
                  </dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Title</TableHead>
                <TableHead className="hidden lg:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} className="transition-colors duration-150">
                  <TableCell>
                    <Link
                      to="/employees/$employeeId"
                      params={{ employeeId: e.id }}
                      className="flex items-center gap-3 font-medium hover:text-primary"
                    >
                      <UserAvatar id={e.id} size="sm" />
                      <span className="truncate">{e.name}</span>
                    </Link>
                    <span className="mt-1 block text-xs text-muted-foreground md:hidden">
                      {e.title} · {e.department}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{e.title}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {e.department}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{e.email}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge tone={toneOf(e.status)} dot>
                      {e.status}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
            <span>
              Showing 1–{filtered.length} of {employees.length}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
