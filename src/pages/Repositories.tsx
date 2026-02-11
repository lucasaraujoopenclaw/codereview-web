import { useState } from "react";
import { GitFork, Plus, Trash2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { getRepositories, createRepository, deleteRepository } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EmptyState } from "../components/ui/EmptyState";
import { formatRelativeTime } from "../lib/utils";

export function Repositories() {
  const { data: repos, loading, error, refetch } = useApi(getRepositories);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", fullName: "", rules: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createRepository(formData);
      setFormData({ name: "", fullName: "", rules: "" });
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error("Failed to create repository:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this repository?")) return;
    try {
      await deleteRepository(id);
      refetch();
    } catch (err) {
      console.error("Failed to delete repository:", err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Repositórios</h1>
          <p className="mt-1 text-gray-400">
            Repositórios habilitados para code review automático
          </p>
        </div>
        <Link to="/settings/github" className="btn-primary flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Gerenciar Repositórios
        </Link>
      </div>

      {/* List */}
      {!repos || repos.length === 0 ? (
        <EmptyState
          icon={GitFork}
          title="Nenhum repositório habilitado"
          description="Conecte sua conta GitHub e habilite repositórios para começar a receber code reviews automáticos."
          action={
            <Link to="/settings/github" className="btn-primary flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Conectar GitHub
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {repos.map((repo) => (
            <div key={repo.id} className="card flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-white">{repo.fullName}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Habilitado {formatRelativeTime(repo.createdAt)}
                </p>
                {repo.rules && (
                  <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                    Regras: {repo.rules}
                  </p>
                )}
              </div>
              <Link
                to="/settings/github"
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-700 hover:text-gray-300"
                title="Gerenciar no GitHub"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
