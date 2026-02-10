import { useState } from "react";
import { GitFork, Plus, Trash2 } from "lucide-react";
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
          <h1 className="text-2xl font-bold text-white">Repositories</h1>
          <p className="mt-1 text-gray-400">
            Manage repositories for AI code review
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          Add Repository
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <h3 className="mb-4 text-lg font-medium text-white">
            Add New Repository
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <input
                type="text"
                placeholder="my-repo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">
                Full Name (owner/repo)
              </label>
              <input
                type="text"
                placeholder="octocat/my-repo"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-400">
              Review Rules (optional)
            </label>
            <textarea
              placeholder="Focus on security and performance issues..."
              value={formData.rules}
              onChange={(e) =>
                setFormData({ ...formData, rules: e.target.value })
              }
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Adding..." : "Add Repository"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {!repos || repos.length === 0 ? (
        <EmptyState
          icon={GitFork}
          title="No repositories"
          description="Add a repository to start receiving AI code reviews on your pull requests."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {repos.map((repo) => (
            <div key={repo.id} className="card flex items-start justify-between">
              <div>
                <h3 className="font-medium text-white">{repo.fullName}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Added {formatRelativeTime(repo.createdAt)}
                </p>
                {repo.rules && (
                  <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                    Rules: {repo.rules}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(repo.id)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
