import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { generateTopic } from "../services/aiService";
import { SavedTopic } from "../types";
import {
  Sparkles,
  Loader2,
  BookmarkPlus,
  Check,
  BookOpen,
  Scroll,
  ShieldCheck,
  Users,
  Lightbulb,
  Globe,
} from "lucide-react";

const EXAMPLE_OBJECTIONS = [
  "Why do Catholics confess sins to a mortal priest?",
  "The word Purgatory is never mentioned in the Bible",
  "Catholics believe they can buy salvation with works and indulgences",
  "The Catholic Church changed the Sabbath from Saturday to Sunday",
  "Jesus had biological brothers and sisters, so Mary wasn't a perpetual virgin",
  "Why do Catholics pray the Rosary with repetitive prayers?",
  "The Crusades prove the Catholic Church is corrupt",
];

export const TopicGeneratorView: React.FC<{
  onOpenSavedTopic?: (topic: SavedTopic) => void;
}> = () => {
  const { saveTopic, incrementStat } = useApp();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Omit<SavedTopic, "id" | "savedAt"> | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "summary" | "scripture" | "arguments" | "fathers" | "tips"
  >("summary");
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (textToGen = prompt) => {
    if (!textToGen.trim()) return;
    setLoading(true);
    setResult(null);
    setSaved(false);

    try {
      const generated = await generateTopic(textToGen.trim());
      setResult(generated);
      incrementStat("topicsGenerated", 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    saveTopic(result);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Input Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-sm space-y-3.5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c9a84c] shrink-0" />
              <span>Catholic AI Topic Generator</span>
            </h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>Google Search Grounded</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
            Enter any anti-Catholic objection, challenge, or question. Our AI apologetics engine searches the web first to compile a verified 5-part defense with Scripture, philosophical arguments, and Church Fathers.
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="Type any objection (e.g., 'Why do Catholics pray to dead saints?', 'Did the Church hide the Bible?')..."
            className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm outline-none transition resize-none"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-semibold text-gray-400 self-center mr-1">
                Try:
              </span>
              {EXAMPLE_OBJECTIONS.slice(0, 3).map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPrompt(ex);
                    handleGenerate(ex);
                  }}
                  className="text-[11px] bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                >
                  {ex.slice(0, 24)}...
                </button>
              ))}
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={loading || !prompt.trim()}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#f0d080]" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#f0d080]" />
              )}
              <span>{loading ? "Compiling..." : "Generate Guide"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 text-center shadow-sm space-y-3">
          <Loader2 className="w-8 h-8 text-[#1e3a8a] animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-800">
            Searching web with Google & synthesizing Scripture, Patristics, and Catholic Dogma...
          </p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Verifying cross-references and assembling authentic historical witness.
          </p>
        </div>
      )}

      {/* Generated Result */}
      {result && !loading && (
        <div className="bg-white rounded-2xl border border-[#e2ddd6] shadow-md overflow-hidden space-y-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2d4db8] text-white p-4 sm:p-5 flex flex-col xs:flex-row xs:items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="bg-[#c9a84c] text-[#1e3a8a] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Generated Apologetics Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                {result.title}
              </h3>
              <p className="text-xs text-blue-200 italic mt-0.5 line-clamp-2">
                Target objection: "{result.objection}"
              </p>
            </div>
            <button
              onClick={handleSave}
              className={`self-start xs:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow cursor-pointer shrink-0 ${
                saved
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Save Guide</span>
                </>
              )}
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex bg-[#f8f7f4] border-b border-gray-200 px-3 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === "summary"
                  ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Summary</span>
            </button>
            <button
              onClick={() => setActiveTab("scripture")}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === "scripture"
                  ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Scripture ({result.scripturePassages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("arguments")}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === "arguments"
                  ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Arguments ({result.mainArguments.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("fathers")}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === "fathers"
                  ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Fathers ({result.churchFathersQuotes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === "tips"
                  ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Tips</span>
            </button>
          </div>

          {/* Content Tab Details */}
          <div className="p-5 space-y-4 text-sm text-gray-800">
            {activeTab === "summary" && (
              <div className="bg-[#fcfaf7] border border-[#e2ddd6] rounded-xl p-4 leading-relaxed">
                <h4 className="font-bold text-[#1e3a8a] text-xs uppercase tracking-wide mb-1.5">
                  Core Catholic Response
                </h4>
                <p className="text-gray-800 text-sm">{result.summary}</p>
              </div>
            )}

            {activeTab === "scripture" && (
              <div className="space-y-3">
                {result.scripturePassages.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5"
                  >
                    <span className="font-bold text-[#1e3a8a] text-xs">
                      📜 {s.reference}
                    </span>
                    <p className="italic text-gray-800 text-xs font-serif bg-white p-2 rounded border border-gray-100">
                      "{s.text}"
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Catholic Context:</strong> {s.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "arguments" && (
              <div className="space-y-3">
                {result.mainArguments.map((arg, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white border border-gray-200 rounded-xl space-y-1"
                  >
                    <h5 className="font-bold text-[#1e3a8a] text-xs">
                      {idx + 1}. {arg.title}
                    </h5>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {arg.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "fathers" && (
              <div className="space-y-3">
                {result.churchFathersQuotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#f8f7f4] border border-[#e2ddd6] rounded-xl space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-[#1e3a8a]">
                      <span>🏛️ {q.father}</span>
                      <span className="text-[11px] font-normal italic text-gray-500">
                        {q.work}
                      </span>
                    </div>
                    <p className="italic text-xs text-gray-800">"{q.quote}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "tips" && (
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
                  <h5 className="font-bold text-emerald-900 text-xs uppercase mb-1">
                    Helpful Advice
                  </h5>
                  <ul className="text-xs text-emerald-950 space-y-1">
                    {result.practicalTips.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl">
                  <h5 className="font-bold text-rose-900 text-xs uppercase mb-1">
                    Mistakes to Avoid
                  </h5>
                  <ul className="text-xs text-rose-950 space-y-1">
                    {result.commonMistakes.map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
