import React, { useState, useEffect, useMemo } from "react";
import { DailyCatholicQuote } from "../types";
import { fetchDailyQuotes } from "../services/aiService";
import { useApp } from "../context/AppContext";
import {
  Quote,
  Copy,
  Check,
  BookmarkPlus,
  Globe,
  ExternalLink,
  ChevronRight,
  Atom,
  Building2,
  ShieldAlert,
  Calendar,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface DailyQuotesCardProps {
  onOpenQuotesPage?: () => void;
}

export const DailyQuotesCard: React.FC<DailyQuotesCardProps> = ({ onOpenQuotesPage }) => {
  const { addNote } = useApp();
  const [quotes, setQuotes] = useState<DailyCatholicQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liveGrounded, setLiveGrounded] = useState(false);

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

  // Load quotes
  const loadQuotes = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetchDailyQuotes("all", refresh);
      if (res.quotes && res.quotes.length > 0) {
        setQuotes(res.quotes);
        setLiveGrounded(res.liveGrounded);
      }
    } catch (e) {
      console.warn("Failed to load daily quote:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadQuotes(false);
  }, []);

  // Compute strictly 1 deterministic quote for today based on year and day-of-year
  const dailyQuote = useMemo(() => {
    if (!quotes || quotes.length === 0) return null;
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const deterministicSeed = today.getFullYear() * 366 + dayOfYear;
    const index = Math.abs(deterministicSeed) % quotes.length;
    return quotes[index];
  }, [quotes, today]);

  const handleCopy = () => {
    if (!dailyQuote) return;
    const text = `"${dailyQuote.quote}"\n— ${dailyQuote.author} (${dailyQuote.title}), ${dailyQuote.source}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToNotes = () => {
    if (!dailyQuote) return;
    addNote({
      title: `${dailyQuote.author}: ${dailyQuote.title}`,
      content: `"${dailyQuote.quote}"\n\nSource: ${dailyQuote.source}\nEra: ${dailyQuote.era}\n\nHistorical Impact:\n${dailyQuote.historicalImpact}\n\nFaith & Reason Insight:\n${dailyQuote.faithAndReasonInsight}`,
      category: dailyQuote.category === "catholic_scientist" ? "Science & Faith" : "Church History",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "catholic_scientist":
        return <Atom className="w-3.5 h-3.5 text-emerald-600" />;
      case "church_father":
        return <Building2 className="w-3.5 h-3.5 text-amber-600" />;
      case "apologetic_titan":
        return <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <Quote className="w-3.5 h-3.5 text-[#c9a84c]" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "catholic_scientist":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "church_father":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "apologetic_titan":
        return "bg-blue-50 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-[#fcfaf6] to-[#f5efe5] border border-[#e2ddd6] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
      {/* Top Header: Quote of the Day + Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ece6dc] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#c9a84c]/20 text-[#1e3a8a] flex items-center justify-center font-bold shrink-0">
            <Quote className="w-4 h-4 text-[#1e3a8a]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-[#1e3a8a]">
                Catholic Quote of the Day
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                <Calendar className="w-2.5 h-2.5 text-amber-600" />
                <span>{todayFormatted}</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              One daily reflection from Church Fathers, Apologists, and Catholic Scientists
            </p>
          </div>
        </div>

        {/* Header Right Action: Open Dedicated Archive Page */}
        {onOpenQuotesPage && (
          <button
            onClick={onOpenQuotesPage}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#c9a84c] hover:bg-[#b8953f] active:bg-[#a68435] text-[#1e3a8a] text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer shrink-0"
            title="Browse all quotes and search Catholic science pioneers"
          >
            <span>Full Archive</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-7 text-center text-xs text-gray-500 space-y-2">
          <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#1e3a8a]" />
          <p>Loading today's Catholic quote...</p>
        </div>
      ) : dailyQuote ? (
        /* The Single Daily Quote Card */
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#e5dfd5] shadow-xs space-y-3.5">
          {/* Metadata Row: Category & Era */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${getCategoryBadgeClass(
                  dailyQuote.category
                )}`}
              >
                {getCategoryIcon(dailyQuote.category)}
                <span>{dailyQuote.categoryLabel}</span>
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {dailyQuote.era}
              </span>
            </div>

            {liveGrounded ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Globe className="w-2.5 h-2.5" />
                <span>Web Grounded</span>
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-gray-400">
                Curated Daily Pillar
              </span>
            )}
          </div>

          {/* Quote Body */}
          <div className="relative pl-3.5 border-l-3 border-[#c9a84c]">
            <p className="text-gray-900 text-sm sm:text-base font-serif italic leading-relaxed">
              "{dailyQuote.quote}"
            </p>
          </div>

          {/* Author & Citation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-600">
            <div>
              <span className="font-extrabold text-[#1e3a8a] text-sm sm:text-base block">
                {dailyQuote.author}
              </span>
              <span className="text-[11px] text-gray-500">{dailyQuote.title}</span>
            </div>
            <div className="text-[11px] text-gray-500 sm:text-right">
              <span className="font-medium text-gray-700">Source: </span>
              <span className="italic">{dailyQuote.source}</span>
            </div>
          </div>

          {/* Legacy & Faith & Reason Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="bg-[#fcfaf7] border border-[#e8e2d8] rounded-lg p-2.5 space-y-1">
              <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wide block">
                Historical Legacy:
              </span>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                {dailyQuote.historicalImpact}
              </p>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 space-y-1">
              <span className="font-bold text-[#1e3a8a] text-[11px] uppercase tracking-wide block">
                Faith & Reason:
              </span>
              <p className="text-blue-900/80 text-[11px] leading-relaxed">
                {dailyQuote.faithAndReasonInsight}
              </p>
            </div>
          </div>

          {/* Web References if present */}
          {dailyQuote.groundingSources && dailyQuote.groundingSources.length > 0 && (
            <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-2.5 h-2.5 text-emerald-600" /> Source:
              </span>
              {dailyQuote.groundingSources.slice(0, 2).map((src, idx) => (
                <a
                  key={idx}
                  href={src.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-blue-900 border border-gray-200 px-2 py-0.5 rounded-md transition max-w-[220px] truncate"
                >
                  <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                  <span className="truncate">{src.title}</span>
                </a>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy Quote</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSaveToNotes}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Saved to Notes</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5 text-[#c9a84c]" />
                    <span>Save to Notes</span>
                  </>
                )}
              </button>
            </div>

            {onOpenQuotesPage && (
              <button
                onClick={onOpenQuotesPage}
                className="text-xs font-semibold text-[#1e3a8a] hover:text-blue-900 flex items-center gap-1 cursor-pointer transition"
              >
                <span>Browse All Quotes Archive</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#c9a84c]" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
