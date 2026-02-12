import { Link } from "react-router-dom";
import {
  GitFork,
  Settings,
  Shield,
  Activity,
  ExternalLink,
  ToggleRight,
} from "lucide-react";
import { getRepositories } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EmptyState } from "../components/ui/EmptyState";
import { formatRelativeTime } from "../lib/utils";
import type { Repository } from "../shared";

function RepoCard({ repo }: { repo: Repository }) {
  // Extract org/name from fullName
  const [org, name] = repo.fullName.includes("/")
    ? repo.fullName.split("/")
    : ["", repo.fullName];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 p-5 transition-all hover:border-brand/30 hover:bg-gray-900/80">
      {/* Active indicator bar */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-green-500" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {/* Status dot */}
          <div className="mt-1 flex-shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-white truncate">
                {name || repo.fullName}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-500/25">
                <ToggleRight className="h-3 w-3" />
                Ativo
              </span>
            </div>
            {org && (
              <p className="mt-0.5 text-sm text-gray-500">{org}</p>
            )}
          </div>
        </div>

        <Link
          to="/settings/github"
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-700/50 hover:text-gray-300"
          title="Gerenciar"
        >
          <Settings className="h-4 w-4" />
        </Link>
      </div>

      {/* Rules badge */}
      {repo.rules && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-gray-800/60 px-3 py-2">
          <Shield className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" />
          <p className="text-xs text-gray-400 line-clamp-2">{repo.rules}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Activity className="h-3 w-3" />
            Habilitado {formatRelativeTime(repo.createdAt)}
          </span>
        </div>

        <a
          href={`https://github.com/${repo.fullName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-600 transition-colors hover:text-gray-400"
        >
          <ExternalLink className="h-3 w-3" />
          GitHub
        </a>
      </div>
    </div>
  );
}

export function Repositories() {
  const { data: repos, loading, error } = useApi(getRepositories);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Erro: {error}</div>;

  const repoCount = repos?.length ?? 0;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Repositórios</h1>
          <p className="mt-1 text-gray-400">
            {repoCount > 0
              ? `${repoCount} repositório${repoCount > 1 ? "s" : ""} com code review ativo`
              : "Repositórios habilitados para code review automático"}
          </p>
        </div>
        <Link
          to="/settings/github"
          className="btn-primary flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Gerenciar Repositórios
        </Link>
      </div>

      {!repos || repos.length === 0 ? (
        <EmptyState
          icon={GitFork}
          title="Nenhum repositório habilitado"
          description="Conecte sua conta GitHub e habilite repositórios para começar a receber code reviews automáticos."
          action={
            <Link
              to="/settings/github"
              className="btn-primary flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Conectar GitHub
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
