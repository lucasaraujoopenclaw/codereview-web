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

export default api;
