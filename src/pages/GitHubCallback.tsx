import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Github, CheckCircle, XCircle } from "lucide-react";

export function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(2);

  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/settings/github");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [success, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card text-center">
          {success ? (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                GitHub Conectado com Sucesso!
              </h1>
              <p className="text-gray-400 mb-6">
                Sua conta GitHub foi conectada ao QualityGate.
              </p>
              <div className="rounded-lg bg-gray-800 p-4 mb-4">
                <p className="text-sm text-gray-300">
                  Redirecionando em <span className="font-bold text-brand">{countdown}</span> segundos...
                </p>
              </div>
              <button
                onClick={() => navigate("/settings/github")}
                className="btn-primary w-full"
              >
                Ir para Configurações
              </button>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Erro na Conexão
              </h1>
              <p className="text-gray-400 mb-4">
                Não foi possível conectar sua conta GitHub.
              </p>
              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 mb-6">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
              <button
                onClick={() => navigate("/settings/github")}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Github className="h-5 w-5" />
                Tentar Novamente
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
