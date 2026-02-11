import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GitFork,
  GitPullRequest,
  Settings,
  Code2,
  LogOut,
  UserCircle,
  Github,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/repositories", icon: GitFork, label: "Repositories" },
  { to: "/pull-requests", icon: GitPullRequest, label: "Pull Requests" },
  { to: "/settings/github", icon: Github, label: "GitHub" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const { user, logout } = useAuth();

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
      <div className="border-t border-sidebar-accent px-4 py-4 space-y-3">
        <div className="flex items-center gap-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-9 w-9 rounded-full border border-sidebar-accent"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-hover border border-sidebar-accent">
              <UserCircle className="h-5 w-5 text-sidebar-foreground" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.name ?? ""}
            </p>
            <p className="truncate text-xs text-gray-400">{user?.email ?? ""}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

        <p className="text-xs text-gray-500 px-2">v0.1.0 — Development</p>
      </div>
    </aside>
  );
}
