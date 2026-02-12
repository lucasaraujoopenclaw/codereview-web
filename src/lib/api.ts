import axios from "axios";
import type {
  Repository,
  PullRequest,
  Review,
  StatsResponse,
  PaginatedResponse,
  CreateRepositoryRequest,
} from "../shared";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Repositories
export async function getRepositories(): Promise<Repository[]> {
  const { data } = await api.get("/api/repositories");
  return data;
}

export async function createRepository(
  payload: CreateRepositoryRequest
): Promise<Repository> {
  const { data } = await api.post("/api/repositories", payload);
  return data;
}

export async function deleteRepository(id: string): Promise<void> {
  await api.delete(`/api/repositories/${id}`);
}

// Pull Requests
export async function getPullRequests(params?: {
  repoId?: string;
  status?: string;
  author?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<PullRequest>> {
  const { data } = await api.get("/api/pull-requests", { params });
  return data;
}

export async function getPullRequest(id: string): Promise<PullRequest> {
  const { data } = await api.get(`/api/pull-requests/${id}`);
  return data;
}

// Reviews
export async function getReview(id: string): Promise<Review> {
  const { data } = await api.get(`/api/reviews/${id}`);
  return data;
}

// Stats
export async function getStats(): Promise<StatsResponse> {
  const { data } = await api.get("/api/stats");
  return data;
}

// GitHub Integration
export interface GitHubStatus {
  connected: boolean;
  username?: string;
  connectedAt?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  private: boolean;
  updatedAt: string;
  enabled?: boolean;
  qualityGateId?: string;
}

export async function getGitHubStatus(): Promise<GitHubStatus> {
  const { data } = await api.get("/api/github/status");
  return data;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  // Fetch GitHub repos and enabled repos in parallel
  const [ghResponse, enabledResponse] = await Promise.all([
    api.get("/api/github/repos"),
    api.get("/api/repositories").catch(() => ({ data: [] })),
  ]);

  const ghRepos = ghResponse.data;
  const enabledRepos: Record<string, unknown>[] = enabledResponse.data;

  // Build map of enabled repos by fullName
  const enabledMap = new Map<string, string>();
  for (const r of enabledRepos) {
    const fn = (r.fullName ?? r.full_name) as string;
    if (fn) enabledMap.set(fn, r.id as string);
  }

  // Backend returns snake_case, frontend expects camelCase
  return ghRepos.map((repo: Record<string, unknown>) => {
    const fullName = (repo.full_name ?? repo.fullName) as string;
    return {
      id: repo.id,
      name: repo.name,
      fullName,
      description: repo.description,
      language: repo.language,
      private: repo.private,
      updatedAt: repo.updated_at ?? repo.updatedAt,
      htmlUrl: repo.html_url ?? repo.htmlUrl,
      defaultBranch: repo.default_branch ?? repo.defaultBranch,
      enabled: enabledMap.has(fullName),
      qualityGateId: enabledMap.get(fullName) ?? undefined,
    };
  });
}

export async function enableRepo(repoFullName: string): Promise<void> {
  await api.post("/api/github/repos/enable", { repoFullName });
}

export async function disableRepo(id: string): Promise<void> {
  await api.delete(`/api/github/repos/${id}/disable`);
}

export async function disconnectGitHub(): Promise<void> {
  await api.delete("/api/github/disconnect");
}

export default api;
