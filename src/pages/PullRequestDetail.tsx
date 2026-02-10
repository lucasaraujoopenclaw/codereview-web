import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  FileCode,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";
import { getPullRequest } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { StatusBadge } from "../components/ui/StatusBadge";
import { formatDate } from "../lib/utils";
import type { CommentSeverity } from "../shared";

const severityIcon: Record<CommentSeverity, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const severityColor: Record<CommentSeverity, string> = {
  info: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  warning: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  error: "text-red-400 bg-red-500/10 border-red-500/30",
};

export function PullRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    data: pr,
    loading,
    error,
  } = useApi(() => getPullRequest(id!), [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Error: {error}</div>;
  if (!pr) return <div className="text-gray-400">Pull request not found</div>;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/pull-requests"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pull Requests
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              #{pr.number} {pr.title}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <StatusBadge status={pr.status} />
              <span className="text-sm text-gray-400">by {pr.author}</span>
              <span className="text-sm text-gray-500">
                {formatDate(pr.createdAt)}
              </span>
              {pr.repository && (
                <span className="text-sm text-gray-500">
                  in {pr.repository.fullName}
                </span>
              )}
            </div>
          </div>
          <a
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </div>

      {/* Reviews */}
      {pr.reviews && pr.reviews.length > 0 ? (
        pr.reviews.map((review) => (
          <div key={review.id} className="mb-8">
            <div className="card mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-white">
                    Review
                  </h2>
                  <StatusBadge status={review.status} />
                </div>
                {review.tokensUsed && (
                  <span className="text-xs text-gray-500">
                    {review.tokensUsed} tokens used
                  </span>
                )}
              </div>
              {review.summary && (
                <p className="mt-3 text-sm text-gray-300">{review.summary}</p>
              )}
              {review.completedAt && (
                <p className="mt-2 text-xs text-gray-500">
                  Completed {formatDate(review.completedAt)}
                </p>
              )}
            </div>

            {/* Comments */}
            {review.comments && review.comments.length > 0 && (
              <div className="space-y-3">
                {review.comments.map((comment) => {
                  const severity = comment.severity as CommentSeverity;
                  const SeverityIcon = severityIcon[severity] || Info;
                  return (
                    <div
                      key={comment.id}
                      className={`rounded-lg border p-4 ${severityColor[severity] || severityColor.info}`}
                    >
                      <div className="flex items-start gap-3">
                        <SeverityIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs opacity-75">
                              <FileCode className="h-3 w-3" />
                              <span>
                                {comment.filePath}:{comment.line}
                              </span>
                            </div>
                            <span className="badge text-xs">
                              {comment.category}
                            </span>
                          </div>
                          <p className="mt-1 text-sm">{comment.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="card text-center text-gray-400">
          No reviews yet for this pull request.
        </div>
      )}
    </div>
  );
}
