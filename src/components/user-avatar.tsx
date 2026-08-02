import { cn } from "@/lib/utils";
import { byId } from "@/lib/mock-data";

const sizes = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
  xl: "h-20 w-20 text-xl",
};

const dotTone: Record<string, string> = {
  in: "bg-success",
  remote: "bg-info",
  leave: "bg-warning",
  out: "bg-muted-foreground",
};

export function UserAvatar({
  id,
  size = "md",
  state,
  className,
}: {
  id: string;
  size?: keyof typeof sizes;
  state?: keyof typeof dotTone;
  className?: string;
}) {
  const person = byId(id);
  if (!person) return null;
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold ring-2 ring-card",
          person.tone,
          sizes[size],
        )}
        title={person.name}
      >
        {person.initials}
      </span>
      {state ? (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
            dotTone[state],
          )}
        />
      ) : null}
    </span>
  );
}

export function AvatarStack({ ids, max = 4 }: { ids: string[]; max?: number }) {
  const shown = ids.slice(0, max);
  const rest = ids.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((id) => (
        <UserAvatar key={id} id={id} size="sm" className="-ml-1.5 first:ml-0" />
      ))}
      {rest > 0 ? (
        <span className="-ml-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground ring-2 ring-card">
          +{rest}
        </span>
      ) : null}
    </div>
  );
}
