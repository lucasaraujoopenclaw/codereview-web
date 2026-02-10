import { Link } from "react-router-dom";
import { GitPullRequest, ExternalLink } from "lucide-react";
import { getPullRequests } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EmptyState } from "../components/ui/EmptyState";
import { StatusBadge } from "../components/ui/StatusBadge";
import { formatRelativeTime } from "../lib/utils";

export function PullRequests() {
  const { data, loading, error } = useApi(() => getPullRequests());

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  const pullRequests = data?.data || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Pull Requests</h1>
        <p className="mt-1 text-gray-400">
          All pull requests that have been reviewed by AI
        </p>
      </div>

      {pullRequests.length === 0 ? (
        <EmptyState
          icon={GitPullRequest}
          title="No pull requests yet"
          description="Pull requests will appear here once GitHub webhooks send PR events."
        />
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-400">
                  Repository
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-400">
                  Author
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-400">
                  Review
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {pullRequests.map((pr) => (
                <tr
                  key={pr.id}
                  className="transition-colors hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/pull-requests/${pr.id}`}
                      className="font-medium text-white hover:text-brand"
                    >
                      #{pr.number} {pr.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {pr.repository?.fullName || pr.repoId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {pr.author}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={pr.status} />
                  </td>
                  <td className="px-6 py-4">
                    {pr.reviews && pr.reviews.length > 0 ? (
                      <StatusBadge status={pr.reviews[0].status} />
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatRelativeTime(pr.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-brand"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-800 px-6 py-3">
              <p className="text-sm text-gray-500">
                Page {data.page} of {data.totalPages} ({data.total} total)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
