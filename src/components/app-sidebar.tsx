import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  Clock,
  CalendarDays,
  Handshake,
  BarChart3,
  Settings,
  LogOut,
  Hexagon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { currentUser } from "@/lib/mock-data";

const workspace = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, exact: true },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
];

const operations = [
  { title: "Timesheets", url: "/timesheets", icon: Clock },
  { title: "Leave", url: "/leave", icon: CalendarDays },
  { title: "CRM", url: "/crm", icon: Handshake },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(`${url}/`);

  const renderGroup = (label: string, items: typeof workspace) => (
    <SidebarGroup>
      {!collapsed ? (
        <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </SidebarGroupLabel>
      ) : null}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url, item.exact)}
                tooltip={item.title}
                className="h-9 rounded-lg transition-colors duration-150"
              >
                <Link to={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Hexagon className="h-4.5 w-4.5" />
          </span>
          {!collapsed ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold leading-tight">Northwind</span>
              <span className="block truncate text-xs text-muted-foreground">Operations Portal</span>
            </span>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {renderGroup("Workspace", workspace)}
        {renderGroup("Operations", operations)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <UserAvatar id={currentUser.id} size="md" state="in" />
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-tight">{currentUser.name}</p>
                <p className="truncate text-xs text-muted-foreground">{currentUser.title}</p>
              </div>
              <Link
                to="/login"
                aria-label="Log out"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </>
          ) : null}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
