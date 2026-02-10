import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  open: "bg-green-500/20 text-green-400",
  closed: "bg-gray-500/20 text-gray-400",
  merged: "bg-purple-500/20 text-purple-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  running: "bg-blue-500/20 text-blue-400",
  done: "bg-green-500/20 text-green-400",
  error: "bg-red-500/20 text-red-400",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        statusStyles[status] || "bg-gray-500/20 text-gray-400",
        className
      )}
    >
      {status}
    </span>
  );
}
