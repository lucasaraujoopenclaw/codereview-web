import { useEffect, useState } from "react";
import { KeyRound, Save, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getOpenAISettings, setOpenAIKey, deleteOpenAIKey, type OpenAISettings } from "../lib/api";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export function OpenAISettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [settings, setSettings] = useState<OpenAISettings | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      const s = await getOpenAISettings();
      setSettings(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao carregar configuração");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await setOpenAIKey(apiKey);
      setApiKey("");
      setSuccess("Chave salva com sucesso.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao salvar chave");
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(null), 2500);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Remover a chave da OpenAI?")) return;
    setRemoving(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteOpenAIKey();
      setSuccess("Chave removida.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao remover chave");
    } finally {
      setRemoving(false);
      setTimeout(() => setSuccess(null), 2500);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">OpenAI</h1>
        <p className="mt-1 text-gray-400">
          Configure a chave da OpenAI para o QualityGate gerar reviews automaticamente.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div>
            <p className="font-medium">Erro</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-green-500/40 bg-green-500/10 p-4 text-green-200">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div>
            <p className="font-medium">OK</p>
            <p className="text-sm opacity-90">{success}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl space-y-6">
        <div className="card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Status</h2>
              <p className="mt-1 text-sm text-gray-400">
                {settings?.configured
                  ? `Chave configurada (termina em ${settings.last4 ?? "****"}).`
                  : "Nenhuma chave configurada."}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                A chave é armazenada criptografada no servidor e nunca é exibida novamente.
              </p>
            </div>

            {settings?.configured && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={removing}
                className="btn-secondary flex items-center gap-2 text-red-400 hover:text-red-300 hover:border-red-500/50"
              >
                <Trash2 className="h-4 w-4" />
                {removing ? "Removendo..." : "Remover"}
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="card space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Salvar chave</h2>
            <p className="mt-1 text-sm text-gray-400">
              Cole sua chave da OpenAI (ex: <code className="text-gray-300">sk-...</code>).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">OpenAI API Key</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none"
                autoComplete="off"
              />
            </div>
            <p className="text-xs text-gray-500">
              Dica: use uma key com permissões mínimas. Rotacione se necessário.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || apiKey.trim().length < 10}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
