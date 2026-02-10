import {
  GitPullRequest,
  Eye,
  ShieldAlert,
  Bug,
  Zap,
  Paintbrush,
} from "lucide-react";
import { getStats } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { StatCard } from "../components/ui/StatCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export function Dashboard() {
  const { data: stats, loading, error } = useApi(getStats);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Error: {error}</div>;
  if (!stats) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-400">
          Overview of your AI-powered code reviews
        </p>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total PRs"
          value={stats.totalPullRequests}
          icon={GitPullRequest}
        />
        <StatCard
          title="Reviews Today"
          value={stats.reviewsToday}
          icon={Eye}
        />
        <StatCard
          title="Total Reviews"
          value={stats.totalReviews}
          icon={Eye}
        />
        <StatCard
          title="Repositories"
          value={stats.totalRepositories}
          icon={GitPullRequest}
        />
      </div>

      {/* Issues breakdown */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Issues by Category
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="card flex items-center gap-3">
            <div className="rounded-lg bg-red-500/10 p-2">
              <ShieldAlert className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {stats.issuesByCategory.security}
              </p>
              <p className="text-xs text-gray-400">Security</p>
            </div>
          </div>

          <div className="card flex items-center gap-3">
            <div className="rounded-lg bg-orange-500/10 p-2">
              <Zap className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {stats.issuesByCategory.performance}
              </p>
              <p className="text-xs text-gray-400">Performance</p>
            </div>
          </div>

          <div className="card flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Paintbrush className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {stats.issuesByCategory.style}
              </p>
              <p className="text-xs text-gray-400">Style</p>
            </div>
          </div>

          <div className="card flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Bug className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {stats.issuesByCategory.bug}
              </p>
              <p className="text-xs text-gray-400">Bugs</p>
            </div>
          </div>

          <div className="card flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2">
              <Eye className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {stats.issuesByCategory["best-practice"]}
              </p>
              <p className="text-xs text-gray-400">Best Practice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Severity breakdown */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Issues by Severity
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Info</span>
              <span className="badge-info">{stats.issuesBySeverity.info}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-800">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${Math.min(100, (stats.issuesBySeverity.info / Math.max(1, stats.issuesBySeverity.info + stats.issuesBySeverity.warning + stats.issuesBySeverity.error)) * 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Warning</span>
              <span className="badge-warning">
                {stats.issuesBySeverity.warning}
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-800">
              <div
                className="h-2 rounded-full bg-yellow-500"
                style={{
                  width: `${Math.min(100, (stats.issuesBySeverity.warning / Math.max(1, stats.issuesBySeverity.info + stats.issuesBySeverity.warning + stats.issuesBySeverity.error)) * 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Error</span>
              <span className="badge-error">
                {stats.issuesBySeverity.error}
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-800">
              <div
                className="h-2 rounded-full bg-red-500"
                style={{
                  width: `${Math.min(100, (stats.issuesBySeverity.error / Math.max(1, stats.issuesBySeverity.info + stats.issuesBySeverity.warning + stats.issuesBySeverity.error)) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
