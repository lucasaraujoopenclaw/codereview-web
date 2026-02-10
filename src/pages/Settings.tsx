import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";

interface ReviewRules {
  enableSecurity: boolean;
  enablePerformance: boolean;
  enableStyle: boolean;
  enableBugs: boolean;
  enableBestPractices: boolean;
  customPrompt: string;
  maxTokensPerReview: number;
  autoReviewOnPR: boolean;
}

const defaultRules: ReviewRules = {
  enableSecurity: true,
  enablePerformance: true,
  enableStyle: true,
  enableBugs: true,
  enableBestPractices: true,
  customPrompt: "",
  maxTokensPerReview: 4000,
  autoReviewOnPR: true,
};

export function Settings() {
  const [rules, setRules] = useState<ReviewRules>(defaultRules);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("reviewRules", JSON.stringify(rules));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setRules(defaultRules);
  };

  const categories = [
    { key: "enableSecurity" as const, label: "Security", desc: "SQL injection, XSS, auth issues" },
    { key: "enablePerformance" as const, label: "Performance", desc: "N+1 queries, memory leaks, slow algorithms" },
    { key: "enableStyle" as const, label: "Code Style", desc: "Naming conventions, unused imports, formatting" },
    { key: "enableBugs" as const, label: "Bugs", desc: "Null references, type errors, logic flaws" },
    { key: "enableBestPractices" as const, label: "Best Practices", desc: "SOLID principles, DRY, error handling" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-gray-400">Configure AI review rules and preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Categories */}
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-white">Review Categories</h2>
          <p className="mb-4 text-sm text-gray-400">Choose which categories the AI should check for</p>
          <div className="space-y-3">
            {categories.map(({ key, label, desc }) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-lg border border-gray-800 p-3 transition-colors hover:bg-gray-800/50"
              >
                <div>
                  <span className="text-sm font-medium text-white">{label}</span>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={rules[key]}
                  onChange={(e) => setRules({ ...rules, [key]: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-brand focus:ring-brand"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Custom prompt */}
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-white">Custom Instructions</h2>
          <textarea
            placeholder="Add custom instructions for the AI reviewer..."
            value={rules.customPrompt}
            onChange={(e) => setRules({ ...rules, customPrompt: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none"
          />
        </div>

        {/* Token limit */}
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-white">Token Limit</h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1000}
              max={16000}
              step={500}
              value={rules.maxTokensPerReview}
              onChange={(e) => setRules({ ...rules, maxTokensPerReview: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="min-w-[80px] text-right text-sm text-gray-300">
              {rules.maxTokensPerReview.toLocaleString()} tokens
            </span>
          </div>
        </div>

        {/* Auto review toggle */}
        <div className="card">
          <label className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Auto-Review on PR</h2>
              <p className="mt-1 text-sm text-gray-400">Automatically trigger AI review when a new PR is opened</p>
            </div>
            <input
              type="checkbox"
              checked={rules.autoReviewOnPR}
              onChange={(e) => setRules({ ...rules, autoReviewOnPR: e.target.checked })}
              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-brand focus:ring-brand"
            />
          </label>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Settings"}
          </button>
          <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
