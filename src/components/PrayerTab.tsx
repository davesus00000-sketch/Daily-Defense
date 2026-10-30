import React, { useState } from "react";
import { PRAYER_SUGGESTIONS, TRADITIONAL_PRAYERS, TraditionalPrayer } from "../data/prayersData";
import { generatePrayer } from "../services/aiService";
import { useApp } from "../context/AppContext";
import {
  Heart,
  Sparkles,
  Loader2,
  BookmarkPlus,
  Check,
  Copy,
  BookOpen,
  X,
  Scroll,
} from "lucide-react";

export const PrayerTab: React.FC = () => {
  const { addNote, incrementStat } = useApp();
  const [situation, setSituation] = useState("");
  const [generatedPrayer, setGeneratedPrayer] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedToNotes, setSavedToNotes] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<TraditionalPrayer | null>(null);

  const handleGenerate = async (textToGen = situation) => {
    if (!textToGen.trim() || loading) return;
    setLoading(true);
    setGeneratedPrayer("");
    setSavedToNotes(false);

    try {
      const prayer = await generatePrayer(textToGen.trim());
      setGeneratedPrayer(prayer);
      incrementStat("prayersGenerated", 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotes = (title: string, text: string) => {
    addNote({
      title: title,
      content: text,
      category: "Prayer",
    });
    setSavedToNotes(true);
    setTimeout(() => setSavedToNotes(false), 2500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Banner */}
      <div className="bg-[#1e3a8a] text-white -mx-3 sm:-mx-6 -mt-3 sm:-mt-6 px-4 pt-3.5 pb-5 sm:pt-5 sm:pb-6 rounded-b-2xl shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#c9a84c] text-[#1e3a8a] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 sm:mb-2">
            Catholic Prayer & Devotion
          </span>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            Pray Without Ceasing
          </h2>
          <p className="text-[11px] sm:text-sm text-blue-200 mt-1 max-w-xl leading-relaxed">
            Apologetics begins and ends on our knees. Generate personalized petitions rooted in Catholic spiritual tradition or pray with the ancient prayers of the Church.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 px-1">
        {/* 1. AI Prayer Generator Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ddd6] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Sparkles className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">
                Personalized Catholic Prayer Generator
              </h3>
              <p className="text-xs text-gray-500">
                Describe your intention, debate anxiety, or need for intercession
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              rows={3}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Enter your intention (e.g., 'wisdom to speak with my Protestant brother', 'courage during exams', 'healing for my mother')..."
              className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-3 rounded-xl text-sm outline-none resize-none transition"
            />

            {/* Suggestions */}
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block mb-1.5">
                Quick Intentions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRAYER_SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSituation(sug);
                      handleGenerate(sug);
                    }}
                    className="text-[11px] bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#1e3a8a] border border-gray-200 px-2.5 py-1 rounded-lg transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleGenerate()}
                disabled={loading || !situation.trim()}
                className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#f0d080]" />
                ) : (
                  <Heart className="w-4 h-4 text-[#f0d080] fill-[#f0d080]" />
                )}
                <span>{loading ? "Composing Prayer..." : "Generate Catholic Prayer"}</span>
              </button>
            </div>
          </div>

          {/* Generated Output */}
          {generatedPrayer && (
            <div className="mt-4 p-5 rounded-2xl bg-[#fcfaf7] border-l-4 border-[#c9a84c] border-y border-r border-[#e2ddd6] shadow-sm space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#e2ddd6] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Prayer of Intercession</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(generatedPrayer)}
                    className="p-1.5 text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleSaveToNotes(`Prayer: ${situation}`, generatedPrayer)
                    }
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                      savedToNotes
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {savedToNotes ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <BookmarkPlus className="w-3.5 h-3.5 text-[#c9a84c]" />
                    )}
                    <span>{savedToNotes ? "Saved!" : "Save to Notes"}</span>
                  </button>
                </div>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed font-serif italic whitespace-pre-line">
                "{generatedPrayer}"
              </p>
            </div>
          )}
        </div>

        {/* 2. Traditional Catholic Prayers */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2ddd6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#1e3a8a] flex items-center gap-2">
                <Scroll className="w-5 h-5 text-[#c9a84c]" />
                <span>Treasury of Traditional Catholic Prayers</span>
              </h3>
              <p className="text-xs text-gray-500">
                Ancient petitions sanctified by centuries of saints and doctors
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRADITIONAL_PRAYERS.map((pr) => (
              <div
                key={pr.id}
                onClick={() => setSelectedPrayer(pr)}
                className="group p-4 rounded-xl border border-gray-200 hover:border-[#1e3a8a] hover:bg-[#fcfaf7] transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1e3a8a]">
                      {pr.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {pr.category}
                    </span>
                  </div>
                  {pr.latinTitle && (
                    <div className="text-[11px] text-amber-800 italic mb-1.5 font-serif">
                      {pr.latinTitle}
                    </div>
                  )}
                  <p className="text-xs text-gray-600 line-clamp-2 italic">
                    "{pr.text}"
                  </p>
                </div>
                <div className="pt-2 text-right">
                  <span className="text-[11px] text-[#1e3a8a] font-semibold group-hover:underline">
                    Read full prayer →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traditional Prayer Modal */}
      {selectedPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#c9a84c]">
                  {selectedPrayer.category}
                </span>
                <h3 className="text-xl font-bold text-[#1e3a8a] mt-0.5">
                  {selectedPrayer.title}
                </h3>
                {selectedPrayer.latinTitle && (
                  <p className="text-xs text-amber-800 italic font-serif">
                    {selectedPrayer.latinTitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedPrayer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#fcfaf7] border-l-4 border-[#c9a84c] p-4 rounded-r-xl">
              <p className="text-gray-900 text-sm sm:text-base leading-relaxed font-serif italic">
                "{selectedPrayer.text}"
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => handleCopy(selectedPrayer.text)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center gap-1.5 transition"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy Text"}</span>
              </button>
              <button
                onClick={() => {
                  handleSaveToNotes(selectedPrayer.title, selectedPrayer.text);
                  setSelectedPrayer(null);
                }}
                className="px-4 py-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition"
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-[#f0d080]" />
                <span>Save to Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
