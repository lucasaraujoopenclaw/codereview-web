import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Repositories } from "./pages/Repositories";
import { PullRequests } from "./pages/PullRequests";
import { PullRequestDetail } from "./pages/PullRequestDetail";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/pull-requests" element={<PullRequests />} />
        <Route path="/pull-requests/:id" element={<PullRequestDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
