import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Open: "bg-success/15 text-success border-success/30",
  "In Progress": "bg-info/15 text-info border-info/30",
  Completed: "bg-muted text-muted-foreground border-border",
  Pending: "bg-warning/20 text-warning border-warning/30",
  Reviewed: "bg-info/15 text-info border-info/30",
  Accepted: "bg-success/15 text-success border-success/30",
  Rejected: "bg-destructive/15 text-destructive border-destructive/30",
  Paid: "bg-success/15 text-success border-success/30",
  Processing: "bg-info/15 text-info border-info/30",
  Active: "bg-success/15 text-success border-success/30",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        map[status] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}