import { Paperclip, UploadCloud } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/user-avatar";
import { employees, projectById, byId, type Task } from "@/lib/mock-data";

const comments = [
  {
    who: "amara-okafor",
    text: "Let's keep the scope to the primary flow this sprint — the edge cases can wait for 32.",
    time: "Today, 09:14",
  },
  {
    who: "liam-chen",
    text: "Dry run finished on staging, 3 pages failed on missing hero images. Logged separately.",
    time: "Today, 11:02",
  },
  {
    who: "priya-nair",
    text: "Design QA pass done, only the annual toggle spacing needs a tweak.",
    time: "Yesterday, 16:40",
  },
];

export function TaskPanel({ task, onClose }: { task: Task | null; onClose: () => void }) {
  return (
    <Sheet open={!!task} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-xl">
        {task ? (
          <>
            <SheetHeader className="border-b border-border px-5 py-4">
              <p className="text-xs text-muted-foreground">
                {task.id} · {projectById(task.project)?.name}
              </p>
              <SheetTitle className="text-left text-lg leading-snug">{task.title}</SheetTitle>
            </SheetHeader>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Select defaultValue={task.assignee}>
                    <SelectTrigger className="h-9 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due">Due date</Label>
                  <Input id="due" defaultValue={`${task.due} 2026`} className="h-9 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select defaultValue={task.priority}>
                    <SelectTrigger className="h-9 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Low", "Medium", "High", "Urgent"].map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={task.status}>
                    <SelectTrigger className="h-9 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["To Do", "In Progress", "In Review", "Done"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" defaultValue={task.description} rows={4} className="rounded-lg" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Subtasks</Label>
                  <span className="text-xs text-muted-foreground">
                    {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length} done
                  </span>
                </div>
                <ul className="mt-2 space-y-1">
                  {task.subtasks.length === 0 ? (
                    <li className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-xs text-muted-foreground">
                      No subtasks yet
                    </li>
                  ) : (
                    task.subtasks.map((s) => (
                      <li
                        key={s.label}
                        className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-muted/60"
                      >
                        <Checkbox defaultChecked={s.done} id={s.label} />
                        <Label
                          htmlFor={s.label}
                          className="text-sm font-normal data-[done=true]:line-through"
                          data-done={s.done}
                        >
                          {s.label}
                        </Label>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div>
                <Label>Attachments</Label>
                <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-7 text-center transition-colors duration-150 hover:border-primary/50 hover:bg-accent/30">
                  <UploadCloud className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Drop files here or click to browse
                  </p>
                </div>
                {task.attachments > 0 ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Paperclip className="h-3.5 w-3.5" />
                    {task.attachments} file{task.attachments > 1 ? "s" : ""} already attached
                  </p>
                ) : null}
              </div>

              <div>
                <Label>Activity</Label>
                <ul className="mt-3 space-y-4">
                  {comments.map((c, i) => (
                    <li key={i} className="flex gap-3">
                      <UserAvatar id={c.who} size="md" />
                      <div className="min-w-0 flex-1 rounded-lg bg-muted/60 px-3 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{byId(c.who)?.name}</p>
                          <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <Input placeholder="Write a comment…" className="h-9 rounded-lg" />
                  <Button size="sm" className="h-9">
                    Send
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>Save changes</Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
