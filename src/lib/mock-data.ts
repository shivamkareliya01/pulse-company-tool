export type EmployeeStatus = "Active" | "On Leave" | "Remote";

export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: EmployeeStatus;
  manager: string;
  joined: string;
  initials: string;
  tone: string;
};

export const employees: Employee[] = [
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    title: "Engineering Manager",
    department: "Engineering",
    email: "amara.okafor@northwind.co",
    phone: "+1 (415) 220-8841",
    location: "San Francisco, CA",
    status: "Active",
    manager: "Daniel Reyes",
    joined: "12 Mar 2019",
    initials: "AO",
    tone: "bg-chart-1/15 text-chart-1",
  },
  {
    id: "liam-chen",
    name: "Liam Chen",
    title: "Senior Software Engineer",
    department: "Engineering",
    email: "liam.chen@northwind.co",
    phone: "+1 (206) 771-2210",
    location: "Seattle, WA",
    status: "Active",
    manager: "Amara Okafor",
    joined: "04 Jun 2021",
    initials: "LC",
    tone: "bg-chart-2/15 text-chart-2",
  },
  {
    id: "sofia-marchetti",
    name: "Sofia Marchetti",
    title: "Product Designer",
    department: "Design",
    email: "sofia.marchetti@northwind.co",
    phone: "+39 340 118 4420",
    location: "Milan, IT",
    status: "Remote",
    manager: "Priya Nair",
    joined: "18 Jan 2022",
    initials: "SM",
    tone: "bg-chart-5/15 text-chart-5",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    title: "Head of Design",
    department: "Design",
    email: "priya.nair@northwind.co",
    phone: "+91 98450 33112",
    location: "Bengaluru, IN",
    status: "Active",
    manager: "Daniel Reyes",
    joined: "22 Aug 2018",
    initials: "PN",
    tone: "bg-chart-3/15 text-chart-3",
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    title: "HR Manager",
    department: "HR",
    email: "marcus.webb@northwind.co",
    phone: "+44 7700 900412",
    location: "London, UK",
    status: "Active",
    manager: "Daniel Reyes",
    joined: "09 Feb 2020",
    initials: "MW",
    tone: "bg-chart-4/15 text-chart-4",
  },
  {
    id: "elena-petrova",
    name: "Elena Petrova",
    title: "Sales Executive",
    department: "Sales",
    email: "elena.petrova@northwind.co",
    phone: "+1 (312) 445-1180",
    location: "Chicago, IL",
    status: "On Leave",
    manager: "Tomás Ruiz",
    joined: "30 Sep 2021",
    initials: "EP",
    tone: "bg-chart-1/15 text-chart-1",
  },
  {
    id: "tomas-ruiz",
    name: "Tomás Ruiz",
    title: "Sales Director",
    department: "Sales",
    email: "tomas.ruiz@northwind.co",
    phone: "+34 611 220 933",
    location: "Madrid, ES",
    status: "Active",
    manager: "Daniel Reyes",
    joined: "15 Nov 2017",
    initials: "TR",
    tone: "bg-chart-2/15 text-chart-2",
  },
  {
    id: "hana-sato",
    name: "Hana Sato",
    title: "Marketing Lead",
    department: "Marketing",
    email: "hana.sato@northwind.co",
    phone: "+81 90 1234 5678",
    location: "Tokyo, JP",
    status: "Active",
    manager: "Daniel Reyes",
    joined: "07 Jul 2020",
    initials: "HS",
    tone: "bg-chart-3/15 text-chart-3",
  },
  {
    id: "noah-bergstrom",
    name: "Noah Bergström",
    title: "QA Engineer",
    department: "Engineering",
    email: "noah.bergstrom@northwind.co",
    phone: "+46 70 555 1290",
    location: "Stockholm, SE",
    status: "Remote",
    manager: "Amara Okafor",
    joined: "11 Apr 2023",
    initials: "NB",
    tone: "bg-chart-4/15 text-chart-4",
  },
  {
    id: "grace-adeyemi",
    name: "Grace Adeyemi",
    title: "Data Analyst",
    department: "Marketing",
    email: "grace.adeyemi@northwind.co",
    phone: "+1 (646) 200-7743",
    location: "New York, NY",
    status: "Active",
    manager: "Hana Sato",
    joined: "26 Feb 2022",
    initials: "GA",
    tone: "bg-chart-5/15 text-chart-5",
  },
];

export const departments = ["Engineering", "Design", "HR", "Sales", "Marketing"];

export const byId = (id: string) => employees.find((e) => e.id === id);

export type ProjectStatus = "On Track" | "At Risk" | "Delayed" | "Completed";

export type Project = {
  id: string;
  name: string;
  client: string;
  description: string;
  progress: number;
  due: string;
  start: string;
  status: ProjectStatus;
  team: string[];
  budget: string;
};

export const projects: Project[] = [
  {
    id: "website-redesign",
    name: "Website Redesign",
    client: "Northwind Internal",
    description:
      "Full rebuild of the marketing site with a new design system, CMS migration and Core Web Vitals targets.",
    progress: 72,
    start: "02 Feb 2026",
    due: "28 Aug 2026",
    status: "On Track",
    team: ["sofia-marchetti", "priya-nair", "liam-chen", "grace-adeyemi"],
    budget: "$84,000",
  },
  {
    id: "mobile-app-v2",
    name: "Mobile App v2",
    client: "Helio Fitness",
    description:
      "Rewrite of the customer mobile app with offline workouts, new onboarding and subscription billing.",
    progress: 45,
    start: "14 Apr 2026",
    due: "19 Sep 2026",
    status: "At Risk",
    team: ["liam-chen", "noah-bergstrom", "sofia-marchetti"],
    budget: "$156,500",
  },
  {
    id: "client-onboarding-portal",
    name: "Client Onboarding Portal",
    client: "Meridian Capital",
    description:
      "Self-serve onboarding with KYC document upload, e-signature and automated account provisioning.",
    progress: 28,
    start: "01 Jun 2026",
    due: "30 Oct 2026",
    status: "Delayed",
    team: ["amara-okafor", "liam-chen", "marcus-webb"],
    budget: "$210,000",
  },
  {
    id: "warehouse-analytics",
    name: "Warehouse Analytics",
    client: "Copperline Logistics",
    description:
      "Dashboards and forecasting for inbound freight, dwell time and pick accuracy across four sites.",
    progress: 88,
    start: "09 Jan 2026",
    due: "14 Aug 2026",
    status: "On Track",
    team: ["grace-adeyemi", "amara-okafor"],
    budget: "$62,300",
  },
  {
    id: "brand-refresh",
    name: "Brand Refresh",
    client: "Solene Skincare",
    description: "New identity, packaging system and a rollout kit for retail and social channels.",
    progress: 100,
    start: "05 Nov 2025",
    due: "20 Mar 2026",
    status: "Completed",
    team: ["priya-nair", "hana-sato", "sofia-marchetti"],
    budget: "$48,900",
  },
  {
    id: "sales-crm-migration",
    name: "Sales CRM Migration",
    client: "Northwind Internal",
    description: "Migrate 14k accounts off the legacy CRM, rebuild pipeline reporting and dedupe records.",
    progress: 56,
    start: "17 Mar 2026",
    due: "25 Sep 2026",
    status: "On Track",
    team: ["tomas-ruiz", "elena-petrova", "grace-adeyemi"],
    budget: "$71,200",
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);

export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Done";
export type Priority = "Low" | "Medium" | "High" | "Urgent";

export type Task = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  due: string;
  comments: number;
  attachments: number;
  description: string;
  subtasks: { label: string; done: boolean }[];
};

export const tasks: Task[] = [
  {
    id: "T-1042",
    title: "Rebuild pricing page with new tokens",
    project: "website-redesign",
    status: "In Progress",
    priority: "High",
    assignee: "sofia-marchetti",
    due: "07 Aug",
    comments: 4,
    attachments: 2,
    description:
      "Port the pricing page to the new design tokens, including the comparison table and annual toggle.",
    subtasks: [
      { label: "Audit current pricing components", done: true },
      { label: "Rebuild comparison table", done: true },
      { label: "Responsive pass at 375px", done: false },
    ],
  },
  {
    id: "T-1043",
    title: "CMS content migration script",
    project: "website-redesign",
    status: "In Progress",
    priority: "Urgent",
    assignee: "liam-chen",
    due: "05 Aug",
    comments: 9,
    attachments: 1,
    description: "Write and dry-run the migration for 240 legacy pages including redirects.",
    subtasks: [
      { label: "Map legacy fields", done: true },
      { label: "Dry run on staging", done: false },
    ],
  },
  {
    id: "T-1044",
    title: "Offline workout sync conflict handling",
    project: "mobile-app-v2",
    status: "To Do",
    priority: "High",
    assignee: "noah-bergstrom",
    due: "12 Aug",
    comments: 2,
    attachments: 0,
    description: "Define merge rules when a workout is edited on two devices while offline.",
    subtasks: [{ label: "Draft conflict matrix", done: false }],
  },
  {
    id: "T-1045",
    title: "Subscription paywall screens",
    project: "mobile-app-v2",
    status: "In Review",
    priority: "Medium",
    assignee: "sofia-marchetti",
    due: "04 Aug",
    comments: 6,
    attachments: 5,
    description: "Three paywall variants for the A/B test, plus restore-purchase states.",
    subtasks: [
      { label: "Variant A", done: true },
      { label: "Variant B", done: true },
      { label: "Variant C", done: false },
    ],
  },
  {
    id: "T-1046",
    title: "KYC document upload validation",
    project: "client-onboarding-portal",
    status: "To Do",
    priority: "Urgent",
    assignee: "liam-chen",
    due: "15 Aug",
    comments: 1,
    attachments: 3,
    description: "Server-side checks for file type, size and readability before submission.",
    subtasks: [{ label: "Agree limits with compliance", done: false }],
  },
  {
    id: "T-1047",
    title: "E-signature vendor evaluation",
    project: "client-onboarding-portal",
    status: "In Review",
    priority: "Medium",
    assignee: "amara-okafor",
    due: "08 Aug",
    comments: 12,
    attachments: 4,
    description: "Score three vendors on pricing, audit trail and regional compliance.",
    subtasks: [
      { label: "Collect quotes", done: true },
      { label: "Security review", done: false },
    ],
  },
  {
    id: "T-1048",
    title: "Dwell time forecasting model v2",
    project: "warehouse-analytics",
    status: "Done",
    priority: "High",
    assignee: "grace-adeyemi",
    due: "29 Jul",
    comments: 3,
    attachments: 1,
    description: "Retrain with Q2 data and ship the updated confidence intervals.",
    subtasks: [{ label: "Backtest against Q1", done: true }],
  },
  {
    id: "T-1049",
    title: "Pick accuracy dashboard polish",
    project: "warehouse-analytics",
    status: "Done",
    priority: "Low",
    assignee: "grace-adeyemi",
    due: "26 Jul",
    comments: 0,
    attachments: 0,
    description: "Fix axis labels, add site filter, tighten spacing on mobile.",
    subtasks: [],
  },
  {
    id: "T-1050",
    title: "Dedupe 14k legacy accounts",
    project: "sales-crm-migration",
    status: "In Progress",
    priority: "High",
    assignee: "elena-petrova",
    due: "18 Aug",
    comments: 7,
    attachments: 2,
    description: "Fuzzy-match on domain and phone, queue ambiguous pairs for manual review.",
    subtasks: [
      { label: "Matching rules signed off", done: true },
      { label: "First pass import", done: false },
    ],
  },
  {
    id: "T-1051",
    title: "Pipeline report parity check",
    project: "sales-crm-migration",
    status: "To Do",
    priority: "Medium",
    assignee: "tomas-ruiz",
    due: "22 Aug",
    comments: 2,
    attachments: 0,
    description: "Confirm new pipeline reports match legacy totals for the last four quarters.",
    subtasks: [],
  },
  {
    id: "T-1052",
    title: "Accessibility audit — nav & forms",
    project: "website-redesign",
    status: "To Do",
    priority: "Medium",
    assignee: "noah-bergstrom",
    due: "20 Aug",
    comments: 1,
    attachments: 0,
    description: "Keyboard traps, focus order and contrast across the top 20 pages.",
    subtasks: [{ label: "Automated scan", done: false }],
  },
  {
    id: "T-1053",
    title: "Launch email sequence copy",
    project: "brand-refresh",
    status: "Done",
    priority: "Low",
    assignee: "hana-sato",
    due: "12 Mar",
    comments: 5,
    attachments: 2,
    description: "Five-email rollout sequence for retail partners.",
    subtasks: [],
  },
  {
    id: "T-1054",
    title: "Onboarding provisioning webhook",
    project: "client-onboarding-portal",
    status: "In Progress",
    priority: "High",
    assignee: "amara-okafor",
    due: "11 Aug",
    comments: 3,
    attachments: 1,
    description: "Provision accounts automatically once compliance marks a client approved.",
    subtasks: [{ label: "Retry & idempotency plan", done: true }],
  },
  {
    id: "T-1055",
    title: "Design QA on new component library",
    project: "website-redesign",
    status: "In Review",
    priority: "Low",
    assignee: "priya-nair",
    due: "09 Aug",
    comments: 2,
    attachments: 0,
    description: "Review spacing, states and dark-mode contrast across 32 components.",
    subtasks: [],
  },
  {
    id: "T-1056",
    title: "Freight ingest retry queue",
    project: "warehouse-analytics",
    status: "In Progress",
    priority: "Medium",
    assignee: "liam-chen",
    due: "14 Aug",
    comments: 1,
    attachments: 0,
    description: "Dead-letter queue plus alerting when a carrier feed fails twice.",
    subtasks: [],
  },
];

export const taskColumns: TaskStatus[] = ["To Do", "In Progress", "In Review", "Done"];

export type LeaveRequest = {
  id: string;
  employee: string;
  type: "Sick" | "Casual" | "Earned" | "Parental";
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

export const leaveRequests: LeaveRequest[] = [
  {
    id: "LV-2201",
    employee: "elena-petrova",
    type: "Sick",
    from: "31 Jul 2026",
    to: "04 Aug 2026",
    days: 3,
    reason: "Flu, doctor's note attached.",
    status: "Pending",
  },
  {
    id: "LV-2202",
    employee: "liam-chen",
    type: "Earned",
    from: "17 Aug 2026",
    to: "21 Aug 2026",
    days: 5,
    reason: "Family trip booked in April.",
    status: "Pending",
  },
  {
    id: "LV-2203",
    employee: "noah-bergstrom",
    type: "Casual",
    from: "06 Aug 2026",
    to: "06 Aug 2026",
    days: 1,
    reason: "Apartment move.",
    status: "Pending",
  },
  {
    id: "LV-2204",
    employee: "hana-sato",
    type: "Earned",
    from: "13 Jul 2026",
    to: "24 Jul 2026",
    days: 10,
    reason: "Summer holiday.",
    status: "Approved",
  },
  {
    id: "LV-2205",
    employee: "grace-adeyemi",
    type: "Parental",
    from: "01 Sep 2026",
    to: "27 Nov 2026",
    days: 60,
    reason: "Parental leave, HR notified.",
    status: "Approved",
  },
  {
    id: "LV-2206",
    employee: "marcus-webb",
    type: "Casual",
    from: "22 Jun 2026",
    to: "23 Jun 2026",
    days: 2,
    reason: "Personal errand.",
    status: "Rejected",
  },
];

export type Lead = {
  id: string;
  company: string;
  contact: string;
  role: string;
  value: string;
  close: string;
  stage: "New" | "Contacted" | "Proposal Sent" | "Negotiation" | "Won" | "Lost";
  owner: string;
  email: string;
};

export const leads: Lead[] = [
  {
    id: "L-901",
    company: "Harborline Freight",
    contact: "Dana Whitfield",
    role: "COO",
    value: "$48,000",
    close: "29 Aug 2026",
    stage: "New",
    owner: "elena-petrova",
    email: "dana@harborline.com",
  },
  {
    id: "L-902",
    company: "Brightfold Studios",
    contact: "Owen Bassett",
    role: "Founder",
    value: "$22,500",
    close: "15 Aug 2026",
    stage: "New",
    owner: "tomas-ruiz",
    email: "owen@brightfold.studio",
  },
  {
    id: "L-903",
    company: "Verdant Grocers",
    contact: "Ines Moreau",
    role: "Head of Digital",
    value: "$96,000",
    close: "11 Sep 2026",
    stage: "Contacted",
    owner: "elena-petrova",
    email: "ines.moreau@verdant.fr",
  },
  {
    id: "L-904",
    company: "Kestrel Health",
    contact: "Robert Njoku",
    role: "CTO",
    value: "$134,000",
    close: "02 Oct 2026",
    stage: "Proposal Sent",
    owner: "tomas-ruiz",
    email: "r.njoku@kestrelhealth.io",
  },
  {
    id: "L-905",
    company: "Ridgeway Legal",
    contact: "Claire Duval",
    role: "Managing Partner",
    value: "$57,500",
    close: "19 Sep 2026",
    stage: "Proposal Sent",
    owner: "elena-petrova",
    email: "cduval@ridgewaylegal.com",
  },
  {
    id: "L-906",
    company: "Atlas Motorworks",
    contact: "Felix Braun",
    role: "VP Operations",
    value: "$188,000",
    close: "24 Aug 2026",
    stage: "Negotiation",
    owner: "tomas-ruiz",
    email: "f.braun@atlasmotorworks.de",
  },
  {
    id: "L-907",
    company: "Solene Skincare",
    contact: "Maya Lindqvist",
    role: "CMO",
    value: "$48,900",
    close: "20 Mar 2026",
    stage: "Won",
    owner: "tomas-ruiz",
    email: "maya@solene.com",
  },
  {
    id: "L-908",
    company: "Pinecrest Realty",
    contact: "Aaron Kelleher",
    role: "Director",
    value: "$31,000",
    close: "30 Jun 2026",
    stage: "Lost",
    owner: "elena-petrova",
    email: "aaron@pinecrestrealty.com",
  },
];

export const leadStages: Lead["stage"][] = [
  "New",
  "Contacted",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
];

export const activityFeed = [
  {
    who: "amara-okafor",
    action: "approved the deployment for",
    target: "Warehouse Analytics",
    time: "12 minutes ago",
  },
  {
    who: "sofia-marchetti",
    action: "moved 3 tasks to In Review on",
    target: "Mobile App v2",
    time: "48 minutes ago",
  },
  {
    who: "marcus-webb",
    action: "published the updated leave policy in",
    target: "Company Handbook",
    time: "2 hours ago",
  },
  {
    who: "tomas-ruiz",
    action: "advanced Atlas Motorworks to",
    target: "Negotiation",
    time: "3 hours ago",
  },
  {
    who: "grace-adeyemi",
    action: "submitted her timesheet for",
    target: "week 31",
    time: "5 hours ago",
  },
  {
    who: "liam-chen",
    action: "opened a blocker on",
    target: "CMS content migration",
    time: "Yesterday, 18:20",
  },
];

export const attendanceToday = [
  { id: "amara-okafor", state: "in" },
  { id: "liam-chen", state: "in" },
  { id: "sofia-marchetti", state: "remote" },
  { id: "priya-nair", state: "in" },
  { id: "marcus-webb", state: "in" },
  { id: "elena-petrova", state: "leave" },
  { id: "tomas-ruiz", state: "in" },
  { id: "hana-sato", state: "out" },
  { id: "noah-bergstrom", state: "remote" },
  { id: "grace-adeyemi", state: "in" },
] as const;

export const attendanceTrend = [
  { day: "Wk 27", present: 88, remote: 8, absent: 4 },
  { day: "Wk 28", present: 91, remote: 6, absent: 3 },
  { day: "Wk 29", present: 84, remote: 11, absent: 5 },
  { day: "Wk 30", present: 89, remote: 9, absent: 2 },
  { day: "Wk 31", present: 94, remote: 4, absent: 2 },
  { day: "Wk 32", present: 90, remote: 7, absent: 3 },
];

export type NotificationItem = {
  title: string;
  body: string;
  time: string;
  unread: boolean;
  kind: "leave" | "alert" | "mention" | "check" | "lead" | "calendar";
};

export const notifications: { today: NotificationItem[]; earlier: NotificationItem[] } = {
  today: [
    {
      title: "Leave request from Elena Petrova",
      body: "Sick leave, 31 Jul – 4 Aug. Needs your approval.",
      time: "12m",
      unread: true,
      kind: "leave",
    },
    {
      title: "Mobile App v2 flagged At Risk",
      body: "Sprint burndown slipped 2 days behind plan.",
      time: "1h",
      unread: true,
      kind: "alert",
    },
    {
      title: "Liam Chen mentioned you",
      body: "\"Can you review the migration dry run before Friday?\"",
      time: "3h",
      unread: true,
      kind: "mention",
    },
  ],
  earlier: [
    {
      title: "Timesheet approved",
      body: "Week 30 timesheet approved by Amara Okafor.",
      time: "Yesterday",
      unread: false,
      kind: "check",
    },
    {
      title: "New lead assigned",
      body: "Harborline Freight added to your pipeline.",
      time: "2d",
      unread: false,
      kind: "lead",
    },
    {
      title: "Quarterly review scheduled",
      body: "Performance review on 14 Aug at 10:00.",
      time: "4d",
      unread: false,
      kind: "calendar",
    },
  ],
};

export const currentUser: Employee = employees[0]!;
