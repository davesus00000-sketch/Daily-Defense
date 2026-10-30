import React, { useState, useEffect, useMemo } from "react";
import { DailyCatholicQuote, GroundingSource } from "../types";
import { fetchDailyQuotes, generateCustomDailyQuote } from "../services/aiService";
import { useApp } from "../context/AppContext";
import {
  Quote,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  BookmarkPlus,
  Globe,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Atom,
  Building2,
  ShieldAlert,
  Layers,
  Search,
  X,
  Share2,
  BookOpen,
  MessageSquare,
  Bookmark,
  CheckCircle2,
  Info,
  Calendar,
  Compass,
} from "lucide-react";

interface QuotesViewProps {
  onOpenNotes?: () => void;
  onOpenChat?: (prompt: string) => void;
}

export const QuotesView: React.FC<QuotesViewProps> = ({ onOpenNotes, onOpenChat }) => {
  const { addNote } = useApp();

  const [filter, setFilter] = useState<"all" | "scientists" | "fathers" | "apologists" | "saved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [quotes, setQuotes] = useState<DailyCatholicQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liveGrounded, setLiveGrounded] = useState(false);

  // Custom AI Search / Generator
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  // Local saved quote IDs (stored in localStorage)
  const [savedQuoteIds, setSavedQuoteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("daily_defense_saved_quotes");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI interaction states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [noteSavedId, setNoteSavedId] = useState<string | null>(null);
  const [expandedInsightId, setExpandedInsightId] = useState<string | null>(null);

  // Load quotes from backend / cache
  const loadQuotes = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);

    try {
      const queryCategory = filter === "saved" ? "all" : filter;
      const res = await fetchDailyQuotes(queryCategory, refresh);
      if (res.quotes && res.quotes.length > 0) {
        setQuotes(res.quotes);
        setLiveGrounded(res.liveGrounded);
      }
    } catch (e) {
      console.warn("Failed to fetch quotes:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadQuotes(false);
  }, [filter === "saved" ? "all" : filter]);

  // Persist savedQuoteIds to localStorage
  const toggleSaveQuote = (id: string) => {
    setSavedQuoteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("daily_defense_saved_quotes", JSON.stringify(next));
      } catch (err) {
        console.warn("Failed to save to localStorage:", err);
      }
      return next;
    });
  };

  // Filter and search
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      // Category filter
      if (filter === "saved" && !savedQuoteIds.includes(q.id)) return false;
      if (filter === "scientists" && q.category !== "catholic_scientist") return false;
      if (filter === "fathers" && q.category !== "church_father") return false;
      if (filter === "apologists" && q.category !== "apologetic_titan") return false;

      // Text search
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.author.toLowerCase().includes(query) ||
        q.quote.toLowerCase().includes(query) ||
        q.title.toLowerCase().includes(query) ||
        q.source.toLowerCase().includes(query) ||
        q.era.toLowerCase().includes(query) ||
        q.historicalImpact.toLowerCase().includes(query) ||
        q.faithAndReasonInsight.toLowerCase().includes(query)
      );
    });
  }, [quotes, filter, searchQuery, savedQuoteIds]);

  const handleCopyQuote = (q: DailyCatholicQuote) => {
    const text = `"${q.quote}"\n\n— ${q.author}\n${q.title} (${q.era})\nSource: ${q.source}\n\nHistorical Impact:\n${q.historicalImpact}\n\nVia Daily Defense Catholic Apologetics`;
    navigator.clipboard?.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleSaveToNotes = (q: DailyCatholicQuote) => {
    addNote({
      title: `${q.author}: ${q.title}`,
      content: `"${q.quote}"\n\nSource: ${q.source}\nEra: ${q.era}\n\nHistorical & Scientific Impact:\n${q.historicalImpact}\n\nFaith & Reason Insight:\n${q.faithAndReasonInsight}`,
      category: q.category === "catholic_scientist" ? "Science & Faith" : "Church History",
    });
    setNoteSavedId(q.id);
    setTimeout(() => setNoteSavedId(null), 2500);
  };

  const handleCustomSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGeneratingCustom(true);
    setCustomError(null);

    try {
      const res = await generateCustomDailyQuote(customPrompt.trim());
      if (res.quotes && res.quotes.length > 0) {
        // Prepend new verified quote(s) to list
        setQuotes((prev) => {
          const newQuotes = res.quotes.filter(
            (nq) => !prev.some((pq) => pq.id === nq.id || pq.quote === nq.quote)
          );
          return [...newQuotes, ...prev];
        });
        setLiveGrounded(true);
        setCustomPrompt("");
      } else {
        setCustomError("Could not retrieve a verified quote for that query. Try a recognized Catholic saint, scholar, or scientist.");
      }
    } catch (err) {
      setCustomError("Web search temporarily unavailable. Please try again shortly.");
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "catholic_scientist":
        return {
          label: "Catholic Science Father",
          icon: Atom,
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          accent: "text-emerald-700",
        };
      case "church_father":
        return {
          label: "Church Father",
          icon: Building2,
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          accent: "text-amber-700",
        };
      case "apologetic_titan":
        return {
          label: "Apologetics Titan",
          icon: ShieldAlert,
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          accent: "text-blue-700",
        };
      default:
        return {
          label: "Catholic Pillar",
          icon: Quote,
          bg: "bg-gray-100 text-gray-800 border-gray-200",
          accent: "text-gray-700",
        };
    }
  };

  // Formatted current date for "Quote of the Day"
  const today = useMemo(() => new Date(), []);
  const todayFormatted = useMemo(() => {
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [today]);

  // Compute strictly 1 deterministic quote of the day matching DailyQuotesCard
  const dailyQuote = useMemo(() => {
    if (!quotes || quotes.length === 0) return null;
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const deterministicSeed = today.getFullYear() * 366 + dayOfYear;
    const index = Math.abs(deterministicSeed) % quotes.length;
    return quotes[index];
  }, [quotes, today]);

  return (
    <div className="space-y-6">
      {/* Hero Header Banner */}
      <div className="bg-[#1e3a8a] text-white -mx-3 sm:-mx-6 -mt-3 sm:-mt-6 px-4 pt-5 pb-6 sm:pt-6 sm:pb-7 shadow-md rounded-b-3xl">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#c9a84c] text-[#1e3a8a] text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  Fides et Ratio
                </span>
                {liveGrounded ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-200 bg-emerald-950/60 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                    <Globe className="w-2.5 h-2.5 text-emerald-300" />
                    <span>Gemini Live Web Grounded</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-200 bg-amber-950/50 border border-amber-400/30 px-2 py-0.5 rounded-full">
                    <Compass className="w-2.5 h-2.5 text-amber-300" />
                    <span>Verified Historic Archive</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                <span>Catholic Pillars & Science Fathers</span>
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/90 mt-1 max-w-2xl leading-relaxed">
                Discover the authentic voices of Church Fathers, Apologetics Giants, and Catholic Priest-Scientists who founded the disciplines of modern astrophysics, genetics, microbiology, and geology.
              </p>
            </div>

            {/* Live Search Trigger */}
            <button
              onClick={() => loadQuotes(true)}
              disabled={refreshing || loading}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 bg-[#c9a84c] hover:bg-[#b8953f] active:bg-[#a68435] text-[#1e3a8a] font-bold text-xs rounded-xl transition shadow-md cursor-pointer disabled:opacity-60 shrink-0"
              title="Query the live web via Gemini for fresh verified Catholic quotes"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Searching Live Web..." : "Refresh Live Quotes"}</span>
            </button>
          </div>

          {/* Real-time Search Box */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by thinker (Pasteur, Augustine, Lemaître), book, science field, or concept..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white focus:text-[#1a1a2e] text-white placeholder-blue-300/70 pl-10 pr-9 py-2.5 rounded-2xl text-xs sm:text-sm outline-none transition border border-white/20 focus:border-white shadow-inner"
            />
            {searchQuery.length > 0 && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 px-1">
        {/* Quote of the Day Spotlight (Strictly 1 single quote for today) */}
        {!searchQuery.trim() && dailyQuote && (
          <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-100/30 border-2 border-[#c9a84c]/50 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-[#1e3a8a]">
                  Catholic Quote of the Day
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                  <Calendar className="w-3 h-3 text-amber-700" />
                  <span>{todayFormatted}</span>
                </span>
              </div>
              <span className="text-[11px] font-medium text-gray-500">
                1 quote per day • Archive below
              </span>
            </div>

            <div className="relative pl-3.5 border-l-3 border-[#c9a84c]">
              <p className="text-gray-900 text-sm sm:text-base font-serif italic leading-relaxed">
                "{dailyQuote.quote}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-600">
              <div>
                <span className="font-extrabold text-[#1e3a8a] text-sm block">
                  {dailyQuote.author}
                </span>
                <span className="text-[11px] text-gray-500">{dailyQuote.title}</span>
              </div>
              <div className="text-[11px] text-gray-500 sm:text-right">
                <span className="font-medium text-gray-700">Source: </span>
                <span className="italic">{dailyQuote.source}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-amber-200/40 text-xs">
              <button
                onClick={() => handleCopyQuote(dailyQuote)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition cursor-pointer"
              >
                {copiedId === dailyQuote.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy Today's Quote</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSaveToNotes(dailyQuote)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition cursor-pointer"
              >
                {noteSavedId === dailyQuote.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Saved to Notes!</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5 text-[#1e3a8a]" />
                    <span>Save to Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Category Filters Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition cursor-pointer whitespace-nowrap ${
              filter === "all"
                ? "bg-[#1e3a8a] text-white font-bold shadow-sm"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-[#e2ddd6]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Pillars ({quotes.length})</span>
          </button>

          <button
            onClick={() => setFilter("scientists")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition cursor-pointer whitespace-nowrap ${
              filter === "scientists"
                ? "bg-emerald-700 text-white font-bold shadow-sm"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-[#e2ddd6]"
            }`}
          >
            <Atom className="w-3.5 h-3.5 text-emerald-600" />
            <span>Catholic Science Fathers ({quotes.filter((q) => q.category === "catholic_scientist").length})</span>
          </button>

          <button
            onClick={() => setFilter("fathers")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition cursor-pointer whitespace-nowrap ${
              filter === "fathers"
                ? "bg-amber-700 text-white font-bold shadow-sm"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-[#e2ddd6]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Church Fathers ({quotes.filter((q) => q.category === "church_father").length})</span>
          </button>

          <button
            onClick={() => setFilter("apologists")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition cursor-pointer whitespace-nowrap ${
              filter === "apologists"
                ? "bg-blue-700 text-white font-bold shadow-sm"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-[#e2ddd6]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
            <span>Apologetic Titans ({quotes.filter((q) => q.category === "apologetic_titan").length})</span>
          </button>

          <button
            onClick={() => setFilter("saved")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition cursor-pointer whitespace-nowrap ${
              filter === "saved"
                ? "bg-[#c9a84c] text-[#1e3a8a] font-bold shadow-sm"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-[#e2ddd6]"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Favorites ({savedQuoteIds.length})</span>
          </button>
        </div>

        {/* AI Live Search / Custom Quote Generator */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#1e3a8a] rounded-2xl p-4 sm:p-5 text-white shadow-sm border border-blue-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f0d080]" />
              <h3 className="font-bold text-sm sm:text-base text-white">
                Live Web Quote Retrieval
              </h3>
            </div>
            <span className="text-[10px] text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full font-medium">
              Powered by Gemini & Google Search
            </span>
          </div>
          <p className="text-xs text-blue-100 leading-relaxed">
            Want a verified quote from a specific Catholic thinker, priest-scientist, or theological question? Enter their name or subject below to search the web and extract the academic source.
          </p>

          <form onSubmit={handleCustomSearch} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Blaise Pascal, Christopher Clavius, St. Thomas Aquinas on Faith & Science..."
              className="flex-1 bg-white/15 hover:bg-white/20 focus:bg-white focus:text-gray-900 text-white placeholder-blue-200/60 px-3.5 py-2 rounded-xl text-xs sm:text-sm outline-none border border-white/20 transition"
            />
            <button
              type="submit"
              disabled={isGeneratingCustom || !customPrompt.trim()}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#c9a84c] hover:bg-[#b8953f] active:bg-[#a68435] text-[#1e3a8a] font-bold text-xs rounded-xl transition shadow cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isGeneratingCustom ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching Web...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Find Verified Quote</span>
                </>
              )}
            </button>
          </form>

          {/* Suggested Quick Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-blue-200">
            <span className="text-blue-300 font-semibold mr-1">Suggested:</span>
            {[
              "Blaise Pascal (Pensées)",
              "Fr. Christopher Clavius (Gregorian Calendar)",
              "St. Albert the Great (Patron of Scientists)",
              "Ven. Fulton J. Sheen",
              "G.K. Chesterton (Orthodoxy)",
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCustomPrompt(p);
                }}
                className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-lg text-white text-[11px] transition cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {customError && (
            <div className="bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs px-3 py-2 rounded-xl">
              {customError}
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e2ddd6] space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#1e3a8a]" />
            <p className="text-sm font-bold text-gray-800">
              Gathering Catholic Wisdom & Scientific Foundations...
            </p>
            <p className="text-xs text-gray-500">
              Retrieving verified quotes from Church Fathers and Catholic Science pioneers
            </p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#e2ddd6] space-y-3 shadow-xs">
            <Quote className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-800 text-base">
              No matching quotes found
            </h4>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              {filter === "saved"
                ? "You haven't favorited any quotes yet. Click the bookmark icon on any quote card to save it here!"
                : "No quotes matched your search keywords. Try searching for a different name, field, or topic."}
            </p>
            {filter === "saved" ? (
              <button
                onClick={() => setFilter("all")}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition"
              >
                Browse All Pillars
              </button>
            ) : (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          /* Quotes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredQuotes.map((q) => {
              const badge = getCategoryBadge(q.category);
              const BadgeIcon = badge.icon;
              const isSaved = savedQuoteIds.includes(q.id);
              const isExpanded = expandedInsightId === q.id;

              return (
                <article
                  key={q.id}
                  className="bg-white rounded-2xl border border-[#e2ddd6] shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    {/* Category & Action row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${badge.bg}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {q.era}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleSaveQuote(q.id)}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          isSaved
                            ? "bg-amber-50 border-amber-300 text-[#c9a84c]"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-400 hover:text-gray-600"
                        }`}
                        title={isSaved ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Author & Vocation */}
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1e3a8a] tracking-tight">
                        {q.author}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium leading-snug mt-0.5">
                        {q.title}
                      </p>
                    </div>

                    {/* The Quote Text */}
                    <div className="relative bg-[#fcfaf7] border border-[#ece4d8] rounded-xl p-3.5 sm:p-4">
                      <Quote className="w-5 h-5 text-[#c9a84c]/40 absolute top-2.5 left-2.5 -scale-x-100 pointer-events-none" />
                      <p className="font-serif italic text-xs sm:text-sm text-gray-800 leading-relaxed pl-3.5">
                        "{q.quote}"
                      </p>
                      <p className="text-[11px] font-semibold text-gray-500 mt-2 text-right">
                        — {q.source}
                      </p>
                    </div>

                    {/* Deep Insights Drawer */}
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() =>
                          setExpandedInsightId(isExpanded ? null : q.id)
                        }
                        className="w-full flex items-center justify-between text-xs font-semibold text-[#1e3a8a] hover:text-blue-900 py-1 cursor-pointer transition"
                      >
                        <span className="flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-[#c9a84c]" />
                          <span>Historical Impact & Faith Harmony</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="bg-[#f8f7f4] rounded-xl p-3 border border-gray-200 text-xs space-y-2.5 animate-in fade-in duration-150">
                          <div>
                            <span className="font-bold text-gray-900 block text-[11px] uppercase tracking-wide text-emerald-800">
                              Historical Contribution:
                            </span>
                            <p className="text-gray-700 leading-relaxed mt-0.5">
                              {q.historicalImpact}
                            </p>
                          </div>

                          <div>
                            <span className="font-bold text-gray-900 block text-[11px] uppercase tracking-wide text-blue-900">
                              Faith & Reason Synthesis:
                            </span>
                            <p className="text-gray-700 leading-relaxed mt-0.5">
                              {q.faithAndReasonInsight}
                            </p>
                          </div>

                          {/* Grounding Source Web Links */}
                          {q.groundingSources && q.groundingSources.length > 0 && (
                            <div className="pt-2 border-t border-gray-200">
                              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                                Academic & Primary Sources:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {q.groundingSources.map((s, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={s.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] text-[#1e3a8a] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded font-medium transition"
                                  >
                                    <span className="max-w-[200px] truncate">{s.title}</span>
                                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="bg-[#faf8f5] border-t border-[#ece6dc] px-4 py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      {/* Copy Quote */}
                      <button
                        onClick={() => handleCopyQuote(q)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition cursor-pointer active:scale-95"
                        title="Copy quote and citation to clipboard"
                      >
                        {copiedId === q.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Save to Notes */}
                      <button
                        onClick={() => handleSaveToNotes(q)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition cursor-pointer active:scale-95"
                        title="Save to your personal study notes"
                      >
                        {noteSavedId === q.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Saved!</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-3.5 h-3.5 text-[#1e3a8a]" />
                            <span>To Notes</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Ask AI / Discuss */}
                    {onOpenChat && (
                      <button
                        onClick={() =>
                          onOpenChat(
                            `Can you explain how ${q.author} demonstrated that Catholic faith and scientific inquiry or philosophical reason work together? Specifically regarding their statement: "${q.quote}"`
                          )
                        }
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1e3a8a] font-bold transition cursor-pointer"
                        title="Debate or explore this quote with AI"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Discuss</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Catholic Contribution to Science & University Infographic Banner */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2ddd6] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#1e3a8a]">
            <Atom className="w-5 h-5 text-emerald-600" />
            <h4 className="font-extrabold text-sm sm:text-base">
              Did You Know? The Catholic Church & The Scientific Revolution
            </h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Contrary to modern misconceptions of a conflict between faith and science, the Catholic Church was the single greatest historical patron of science. Catholic priests and devout laymen founded:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3">
              <span className="font-bold text-emerald-900 block mb-0.5">
                The Big Bang Theory
              </span>
              <p className="text-gray-700 text-[11px]">
                Discovered in 1927 by <strong>Fr. Georges Lemaître</strong>, Belgian Catholic priest and theoretical physicist.
              </p>
            </div>
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3">
              <span className="font-bold text-amber-900 block mb-0.5">
                Modern Genetics
              </span>
              <p className="text-gray-700 text-[11px]">
                Founded by <strong>Gregor Mendel</strong>, Augustinian friar and abbot, studying pea plants at his monastery.
              </p>
            </div>
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3">
              <span className="font-bold text-blue-900 block mb-0.5">
                Astrophysics & Geology
              </span>
              <p className="text-gray-700 text-[11px]">
                Astronomical spectroscopy was founded by Jesuit <strong>Fr. Angelo Secchi</strong>, and stratigraphy by <strong>Blessed Nicolas Steno</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
