import { useState, useEffect } from "react";
import { Github, ExternalLink, Check, X, RefreshCw } from "lucide-react";
import {
  getGitHubStatus,
  getGitHubRepos,
  enableRepo,
  disableRepo,
  disconnectGitHub,
  type GitHubStatus,
  type GitHubRepo,
} from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EmptyState } from "../components/ui/EmptyState";
import { StatusBadge } from "../components/ui/StatusBadge";
import { formatRelativeTime } from "../lib/utils";

export function GitHubConnect() {
  const { token } = useAuth();
  const [status, setStatus] = useState<GitHubStatus | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [reposLoading, setReposLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingRepos, setProcessingRepos] = useState<Set<string>>(new Set());

  const apiUrl = import.meta.env.VITE_API_URL || "";

  const loadStatus = async () => {
    try {
      setError(null);
      const statusData = await getGitHubStatus();
      setStatus(statusData);
      
      if (statusData.connected) {
        setReposLoading(true);
        const reposData = await getGitHubRepos();
        setRepos(reposData);
        setReposLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load GitHub status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleConnect = () => {
    // Open GitHub OAuth with JWT in query param
    window.location.href = `${apiUrl}/auth/github?token=${token}`;
  };

  const handleDisconnect = async () => {
    if (!confirm("Desconectar sua conta GitHub? Todos os repositórios habilitados serão desabilitados.")) {
      return;
    }

    try {
      await disconnectGitHub();
      setStatus({ connected: false });
      setRepos([]);
    } catch (err) {
      alert("Erro ao desconectar: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleToggleRepo = async (repo: GitHubRepo) => {
    const repoKey = repo.fullName;
    setProcessingRepos((prev) => new Set(prev).add(repoKey));

    try {
      if (repo.enabled) {
        // Disable
        if (repo.qualityGateId) {
          await disableRepo(repo.qualityGateId);
        }
      } else {
        // Enable
        await enableRepo(repo.fullName);
      }

      // Refresh repos list
      const reposData = await getGitHubRepos();
      setRepos(reposData);
    } catch (err) {
      alert("Erro ao atualizar repositório: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessingRepos((prev) => {
        const updated = new Set(prev);
        updated.delete(repoKey);
        return updated;
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
        <p className="font-medium">Erro ao carregar integração GitHub</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Integração GitHub</h1>
        <p className="mt-1 text-gray-400">
          Conecte sua conta GitHub para habilitar code reviews automáticos
        </p>
      </div>

      {!status?.connected ? (
        <div className="card">
          <div className="flex flex-col items-center text-center py-8">
            <div className="rounded-full bg-gray-800 p-6 mb-4">
              <Github className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Conecte sua conta GitHub
            </h2>
            <p className="text-gray-400 max-w-md mb-6">
              Conecte sua conta GitHub para habilitar code reviews automáticos nos seus repositórios.
              O QualityGate irá analisar os pull requests e fornecer feedback detalhado.
            </p>
            <button
              onClick={handleConnect}
              className="btn-primary flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              Conectar GitHub
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Connected Status */}
          <div className="card mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-500/20 p-3">
                  <Github className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-white">
                      Conectado como @{status.username}
                    </h3>
                    <StatusBadge status="done" className="text-xs" />
                  </div>
                  {status.connectedAt && (
                    <p className="text-sm text-gray-400">
                      Conectado {formatRelativeTime(status.connectedAt)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="btn-secondary text-red-400 hover:text-red-300 hover:border-red-500/50"
              >
                Desconectar
              </button>
            </div>
          </div>

          {/* Repository List */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Seus Repositórios
              </h2>
              <button
                onClick={loadStatus}
                disabled={reposLoading}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${reposLoading ? "animate-spin" : ""}`} />
                Atualizar
              </button>
            </div>

            {reposLoading ? (
              <LoadingSpinner size="sm" />
            ) : repos.length === 0 ? (
              <EmptyState
                icon={Github}
                title="Nenhum repositório encontrado"
                description="Nenhum repositório foi encontrado na sua conta GitHub."
              />
            ) : (
              <div className="space-y-3">
                {repos.map((repo) => {
                  const isProcessing = processingRepos.has(repo.fullName);

                  return (
                    <div
                      key={repo.id}
                      className="flex items-start justify-between rounded-lg border border-gray-700 bg-gray-800/50 p-4 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white truncate">
                            {repo.fullName}
                          </h3>
                          {repo.private && (
                            <span className="badge bg-gray-600/50 text-gray-300 text-xs">
                              Privado
                            </span>
                          )}
                          {repo.enabled && (
                            <span className="badge bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Ativo
                            </span>
                          )}
                        </div>
                        
                        {repo.description && (
                          <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                            {repo.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                              {repo.language}
                            </span>
                          )}
                          <span>
                            Atualizado {formatRelativeTime(repo.updatedAt)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleRepo(repo)}
                        disabled={isProcessing}
                        className={`ml-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          repo.enabled
                            ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/50"
                            : "bg-brand/10 text-brand hover:bg-brand/20 border border-brand/50"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Processando...
                          </>
                        ) : repo.enabled ? (
                          <>
                            <X className="h-4 w-4" />
                            Desabilitar
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4" />
                            Habilitar
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
