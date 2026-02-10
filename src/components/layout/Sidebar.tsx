import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GitFork,
  GitPullRequest,
  Settings,
  Code2,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/repositories", icon: GitFork, label: "Repositories" },
  { to: "/pull-requests", icon: GitPullRequest, label: "Pull Requests" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-accent">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/20">
          <Code2 className="h-5 w-5 text-brand" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white">CodeReview Hub</h1>
          <p className="text-xs text-gray-500">AI-Powered Reviews</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand/10 text-brand"
                  : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-white"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-accent px-6 py-4">
        <p className="text-xs text-gray-500">v0.1.0 — Development</p>
      </div>
    </aside>
  );
}
