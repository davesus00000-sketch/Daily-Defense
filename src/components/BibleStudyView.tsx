import React, { useState, useEffect } from "react";
import { FEATURED_VERSES } from "../data/versesData";
import { useApp } from "../context/AppContext";
import { explainScripture } from "../services/aiService";
import { GroundingSource } from "../types";
import { Search, Book, Sparkles, BookmarkPlus, Check, Loader2, Globe, ExternalLink } from "lucide-react";

interface BibleStudyViewProps {
  initialVerse?: string;
}

export const BibleStudyView: React.FC<BibleStudyViewProps> = ({
  initialVerse = "John 6:53",
}) => {
  const { addNote, incrementStat } = useApp();
  const [query, setQuery] = useState(initialVerse);
  const [currentRef, setCurrentRef] = useState(initialVerse);
  const [verseText, setVerseText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fetchVerse = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);
    setVerseText("");
    setExplanation("");
    setCurrentRef(ref);

    try {
      const formatted = encodeURIComponent(ref.trim().toLowerCase().replace(/\s+/g, "+"));
      const res = await fetch(`https://bible-api.com/${formatted}?translation=kjv`);
      const data = await res.json();

      if (data.text && data.reference) {
        setVerseText(data.text.trim());
        setCurrentRef(data.reference);
        incrementStat("versesStudied", 1);

        // Fetch Catholic commentary with Google Search Grounding
        setExplaining(true);
        const result = await explainScripture(data.reference, data.text.trim());
        setExplanation(result.explanation);
        setGroundingSources(result.groundingSources || []);
        setExplaining(false);
      } else {
        setError("Verse not found. Please try standard formats like 'John 6:53', 'Matthew 16:18', or 'Luke 1:28'.");
      }
    } catch {
      setError("Unable to connect to Scripture service. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialVerse) {
      fetchVerse(initialVerse);
    }
  }, [initialVerse]);

  const handleSaveToNotes = () => {
    addNote({
      title: `Scripture Study: ${currentRef}`,
      content: `"${verseText}"\n\nCatholic Theological Commentary:\n${explanation}`,
      category: "Scripture",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm space-y-3.5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1e3a8a] flex items-center gap-2">
            <Book className="w-5 h-5 text-[#c9a84c] shrink-0" />
            <span>Bible Study & Catholic Commentary</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Lookup any chapter and verse with authentic Catholic apologetics insights
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchVerse(query);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Matthew 16:18, John 6:53..."
              className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 sm:px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50 cursor-pointer shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-[#f0d080]" />
            )}
            <span>Lookup</span>
          </button>
        </form>

        {/* Quick select buttons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-gray-400 self-center mr-1">
            Quick:
          </span>
          {FEATURED_VERSES.slice(0, 5).map((v) => (
            <button
              key={v.ref}
              type="button"
              onClick={() => {
                setQuery(v.ref);
                fetchVerse(v.ref);
              }}
              className="text-[11px] bg-gray-100 hover:bg-blue-100 text-[#1e3a8a] px-2.5 py-1 rounded-lg font-medium transition cursor-pointer"
            >
              {v.ref}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 text-center shadow-sm space-y-2">
          <Loader2 className="w-8 h-8 text-[#1e3a8a] animate-spin mx-auto" />
          <p className="text-xs text-gray-600 font-medium">
            Fetching Scripture from manuscript database...
          </p>
        </div>
      )}

      {/* Result Display */}
      {verseText && !loading && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-md space-y-4 sm:space-y-5">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 border-b border-gray-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9a84c]">
                Scripture Passage
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1e3a8a] mt-0.5">
                {currentRef}
              </h3>
            </div>
            <button
              onClick={handleSaveToNotes}
              className={`self-start xs:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                saved
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
                  <span>Save to Notes</span>
                </>
              )}
            </button>
          </div>

          {/* Scripture Quote */}
          <div className="bg-[#fcfaf7] border-l-4 border-[#c9a84c] p-4 rounded-r-xl">
            <p className="italic text-gray-900 text-base leading-relaxed font-serif">
              "{verseText}"
            </p>
          </div>

          {/* Catholic Commentary */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-sm text-[#1e3a8a] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c9a84c]" />
                <span>Catholic Apologetics & Patristic Context</span>
              </h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <Globe className="w-3 h-3 text-emerald-600" />
                <span>Google Search Grounded</span>
              </span>
            </div>

            {explaining ? (
              <div className="flex items-center gap-2 text-xs text-gray-500 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-[#1e3a8a]" />
                <span>Searching web & formulating theological commentary...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-700 leading-relaxed bg-blue-50/40 p-4 rounded-xl border border-blue-100/80">
                  {explanation}
                </div>

                {groundingSources.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                      Verified Web References:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {groundingSources.map((src, i) => (
                        <a
                          key={i}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] bg-gray-50 hover:bg-blue-50 text-blue-900 border border-gray-200 hover:border-blue-300 px-2.5 py-1 rounded-lg transition"
                        >
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                          <span className="max-w-[200px] truncate">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
