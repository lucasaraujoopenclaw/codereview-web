import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/20">
              <Code2 className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CodeReview</h1>
              <p className="text-sm text-gray-400">
                Sign in to access your workspace
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <GoogleLogin
              theme="filled_black"
              size="large"
              shape="rectangular"
              width={320}
              onSuccess={async (credentialResponse) => {
                try {
                  setError(null);
                  const credential = credentialResponse.credential;
                  if (!credential) {
                    setError("Google did not return a credential.");
                    return;
                  }
                  await login(credential);
                  navigate("/", { replace: true });
                } catch {
                  setError("Could not sign in. Please try again.");
                }
              }}
              onError={() => {
                setError("Google sign-in failed. Please try again.");
              }}
            />
          </div>

          {error ? (
            <p className="mt-6 text-sm text-red-400 text-center">{error}</p>
          ) : (
            <p className="mt-6 text-xs text-gray-500 text-center">
              By signing in you agree to authenticate with Google.
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Configure <code className="text-gray-400">VITE_GOOGLE_CLIENT_ID</code>
          {" "}
          in your environment.
        </p>
      </div>
    </div>
  );
}
