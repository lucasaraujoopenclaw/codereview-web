import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div className={cn("card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p
              className={cn(
                "mt-1 text-sm",
                trend === "up" && "text-green-400",
                trend === "down" && "text-red-400",
                (!trend || trend === "neutral") && "text-gray-500"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-brand/10 p-3">
          <Icon className="h-5 w-5 text-brand" />
        </div>
      </div>
    </div>
  );
}
