# Team Hub

# AI Prompt: Internal Company Management System — UI Prototype

*Copy everything below into your AI website builder (v0.dev, Lovable, Bolt, Claude, Cursor, etc.)*

---

## PROMPT START

Design and build a **modern, clean, professional web application UI** for an **Internal Company Management System** (a private admin portal used by employees, managers, and admins — not a public-facing website). This is a prototype/UI-only build — use realistic dummy/placeholder data throughout so every screen looks fully populated and real, not empty.

### 1. Overall Design Direction

- Style: **Modern SaaS dashboard aesthetic** — think Linear, Notion, Vercel dashboard, or Ramp. Clean, minimal, generous whitespace, subtle depth (soft shadows, not heavy borders).

- Avoid generic "Bootstrap admin template" look. Avoid default purple-gradient AI-generated look. Make it feel custom and intentional.

- Color palette: A neutral base (off-white/light gray background `#FAFAFA`, white cards `#FFFFFF`, dark slate text `#0F172A`) with **one confident accent color** (e.g., a deep indigo `#4F46E5` or teal `#0D9488`) used sparingly for primary actions, active states, and key data highlights. Include a **dark mode variant** using deep slate/near-black backgrounds (`#0B0F19`) with the same accent.

- Typography: A clean modern sans-serif (Inter, Geist, or similar). Clear type hierarchy — page titles bold and larger, body text comfortable at 14–15px, generous line height.

- Corner radius: consistent, medium rounding (8–12px) on cards, buttons, inputs — not overly rounded/bubbly.

- Spacing: consistent 8px-based spacing system. Cards should breathe — don't cram content.

- Icons: Use a consistent icon set (Lucide icons style) — outline style, consistent stroke width.

- Micro-interactions: hover states on all interactive elements, smooth transitions (150–200ms), subtle loading skeletons where data would load.

### 2. Global Layout Structure

- **Left sidebar navigation** (collapsible/expandable), containing:

  - Company logo/name at top

  - Main nav sections: Dashboard, Employees, Projects, Tasks, Timesheets, Leave, CRM (Leads/Clients), Reports, Settings

  - User profile card at the bottom of sidebar (avatar, name, role, quick logout)

- **Top bar** within main content area: page title/breadcrumb on left, global search bar in center, notification bell + user avatar dropdown on right.

- Main content area: consistent page padding, max-width container so it doesn't stretch too wide on large screens.

- Fully responsive: sidebar collapses to icon-only or hamburger drawer on tablet/mobile; tables convert to stacked cards on mobile.

### 3. Screens to Design (build all of these)

#### A. Login / Auth Screen

- Split-screen layout: left side branded illustration/gradient panel with company name and a short tagline, right side clean login form (email, password, "remember me", forgot password link).

- Minimal, no clutter.

#### B. Dashboard (Home) — role-aware

- Top row: 4 KPI summary cards (e.g., "Total Employees", "Active Projects", "Pending Leave Requests", "Tasks Due This Week") each with a number, small trend indicator, and icon.

- A chart section: e.g., a bar/line chart showing project progress or attendance trend over the month.

- A recent activity feed (timeline style) showing recent actions across the company.

- A "My Tasks" widget showing the logged-in user's upcoming tasks with due dates and priority tags.

- A team attendance snapshot (who's in/out/on leave today) as a compact avatar row with status dots.

#### C. Employee Directory

- Grid or table view toggle. Each employee card/row: avatar, name, role/title, department, email, status badge (Active/On Leave).

- Filters at top: by department, by role, by status. Search bar.

- Clicking an employee opens a detail page/panel (see below).

#### D. Employee Detail Page

- Header: large avatar, name, title, department, contact info, "Edit" and "Message" buttons.

- Tabs: **Overview** (personal info, reporting manager, joining date), **Documents** (uploaded files list with icons), **Attendance** (calendar heatmap style view), **Leave History** (table), **Performance** (goals/review history), **Assets** (assigned laptop, ID card, etc. as a simple list).

#### E. Attendance & Leave Management

- Calendar view showing the month with color-coded days (present/absent/leave/holiday).

- A "Apply for Leave" modal/form: leave type dropdown, date range picker, reason textarea, submit button.

- A leave requests table (for managers) with employee name, dates, type, status, and Approve/Reject action buttons with confirmation.

- Leave balance summary cards (Sick, Casual, Earned leave remaining) at the top.

#### F. Projects Overview

- Card grid of active projects: project name, client, progress bar, team avatars (stacked), due date, status tag (On Track/At Risk/Delayed) with color coding.

- Filter/sort bar: by status, by team, by due date.

- "+ New Project" button prominent at top right.

#### G. Project Detail Page (Kanban Board)

- Project header: name, client, description, timeline, team members (avatar stack), progress %.

- Tab switcher: **Board** (Kanban), **List**, **Timeline/Gantt**, **Files**, **Activity**.

- Kanban board: columns for To Do / In Progress / In Review / Done, drag-and-drop style task cards showing title, assignee avatar, priority flag (color dot), due date, small comment/attachment count icons.

- "+ Add Task" quick-add at bottom of each column.

#### H. Task Detail (modal or slide-over panel)

- Task title (editable inline), description, assignee dropdown, due date picker, priority selector, status dropdown.

- Subtasks checklist.

- Comments/activity thread below (chat-style, with avatars and timestamps).

- File attachment area (drag-drop zone).

#### I. Timesheets

- Weekly grid view: rows = projects/tasks, columns = days of the week, editable hour cells, daily/weekly total row at bottom.

- Simple, spreadsheet-like but styled cleanly with clear grid lines and hover highlight on active cell.

- Submit/approve status indicator at top.

#### J. CRM — Leads & Clients (if included)

- Pipeline/kanban view: stages (New, Contacted, Proposal Sent, Negotiation, Won, Lost) as columns, lead cards showing company name, contact person, deal value, expected close date.

- Leads table view alternative with sortable columns.

- Lead detail panel: contact info, activity timeline (calls/emails/meetings logged), notes section, "Convert to Client/Project" button.

#### K. Reports & Analytics

- A clean analytics page with multiple chart types: bar chart (project status distribution), line chart (attendance trend), donut chart (task distribution by status), a data table below for detailed export view.

- Date range filter at top right, "Export" button.

#### L. Settings

- Left-nested settings menu: Profile, Company Info, Roles & Permissions, Notifications, Integrations.

- Roles & Permissions screen: a table/matrix showing roles (Admin/Manager/Employee) vs. permissions (checkboxes) — visually clear grid.

#### M. Notifications Panel

- Slide-in panel from the top-right bell icon: list of notifications grouped by "Today" / "Earlier", each with icon, short description, timestamp, unread indicator dot.

### 4. Component Details (be consistent across all screens)

- **Buttons:** Primary (filled, accent color), Secondary (outline), Ghost/text button, Destructive (red, for delete actions). Consistent height and padding across all.

- **Status badges/tags:** pill-shaped, color-coded (green = active/done, yellow = pending/at-risk, red = overdue/rejected, gray = inactive/draft, blue = in-progress).

- **Avatars:** circular, with colored fallback initials when no image, small status dot overlay for online/leave status where relevant.

- **Tables:** clean row dividers (not heavy borders), hover row highlight, sortable column headers with subtle arrow icons, pagination at bottom.

- **Forms/inputs:** consistent border, clear focus state (accent-colored ring), floating or top-aligned labels, helper/error text below fields.

- **Modals/slide-overs:** consistent header with title + close icon, scrollable body, sticky footer with action buttons.

- **Empty states:** friendly icon + short message + primary action button (for when a section genuinely has no data, e.g., "No tasks yet — create your first task").

### 5. Data to populate (use realistic placeholder data, not "Lorem Ipsum" or "Item 1/2/3")

- 8–10 employee names with realistic titles (Software Engineer, Product Designer, HR Manager, Sales Executive, etc.) and departments (Engineering, Design, HR, Sales, Marketing).

- 4–6 sample projects with real-sounding names (e.g., "Website Redesign", "Mobile App v2", "Client Onboarding Portal") and clients.

- 10–15 sample tasks distributed across Kanban columns with varied priorities and due dates.

- Sample leave requests, sample CRM leads with company names and deal values.

### 6. Deliverable

Build this as a multi-page (or multi-route) prototype with working navigation between all the screens listed above, using consistent design tokens (colors, spacing, typography) throughout. Prioritize the **Dashboard, Employee Directory, Employee Detail, Projects Overview, and Project Kanban Board** screens as the most polished/complete if you need to prioritize — these are the core screens.

## PROMPT END

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/27c114f9-4c53-4d73-bf73-4b3d90f9f3bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
