import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronRight,
  CalendarCheck,
  AlertTriangle,
  AtSign,
  Check,
  Sparkles,
  CalendarClock,
} from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { currentUser, notifications, type NotificationItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  "": "Dashboard",
  employees: "Employees",
  projects: "Projects",
  tasks: "Tasks",
  timesheets: "Timesheets",
  leave: "Attendance & Leave",
  crm: "CRM",
  reports: "Reports",
  settings: "Settings",
};

const icons = {
  leave: CalendarCheck,
  alert: AlertTriangle,
  mention: AtSign,
  check: Check,
  lead: Sparkles,
  calendar: CalendarClock,
};

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="h-9 w-9 rounded-lg text-muted-foreground"
    >
      {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}

function NotificationList() {
  const render = (items: NotificationItem[], heading: string) => (
    <div>
      <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {heading}
      </p>
      <ul className="space-y-1">
        {items.map((n) => {
          const Icon = icons[n.kind];
          return (
            <li
              key={n.title}
              className={cn(
                "flex gap-3 rounded-lg p-3 transition-colors duration-150 hover:bg-muted",
                n.unread && "bg-accent/40",
              )}
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className="text-[11px] text-muted-foreground">{n.time}</span>
                {n.unread ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="space-y-5">
      {render(notifications.today, "Today")}
      {render(notifications.earlier, "Earlier")}
    </div>
  );
}

export function TopBar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const segments = pathname.split("/").filter(Boolean);
  const section = labels[segments[0] ?? ""] ?? "Dashboard";
  const unread = notifications.today.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <SidebarTrigger className="h-9 w-9 rounded-lg text-muted-foreground" />

        <nav className="hidden min-w-0 items-center gap-1.5 text-sm md:flex" aria-label="Breadcrumb">
          <span className="text-muted-foreground">Northwind</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="truncate font-medium">{section}</span>
          {segments.length > 1 ? (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
              <span className="truncate capitalize text-muted-foreground">
                {segments[1]!.replace(/-/g, " ")}
              </span>
            </>
          ) : null}
        </nav>

        <div className="relative mx-auto hidden w-full max-w-sm lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search people, projects, tasks…"
            className="h-9 rounded-lg border-border bg-muted/60 pl-9 text-sm"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative h-9 w-9 rounded-lg text-muted-foreground"
              >
                <Bell className="h-4 w-4" />
                {unread > 0 ? (
                  <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {unread}
                  </span>
                ) : null}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full p-0 sm:max-w-md">
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle className="text-base">Notifications</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto px-3 py-4">
                <NotificationList />
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger className="ml-1 rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring">
              <UserAvatar id={currentUser.id} size="md" state="in" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs font-normal text-muted-foreground">{currentUser.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/employees/$employeeId" params={{ employeeId: currentUser.id }}>
                  My profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
