import React, { useState } from "react";
import { TopicContent, SavedTopic } from "../types";
import { useApp } from "../context/AppContext";
import {
  X,
  BookOpen,
  Scroll,
  ShieldCheck,
  Users,
  Lightbulb,
  BookmarkPlus,
  Swords,
  Check,
  AlertTriangle,
} from "lucide-react";

interface TopicDetailModalProps {
  topic: TopicContent | SavedTopic | null;
  onClose: () => void;
  onStartDebate?: (topicTitle: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onStartDebate,
}) => {
  const { addNote, incrementStat } = useApp();
  const [activeTab, setActiveTab] = useState<
    "summary" | "scripture" | "arguments" | "fathers" | "tips"
  >("summary");
  const [savedToNotes, setSavedToNotes] = useState(false);

  if (!topic) return null;

  const handleSaveToNotes = () => {
    addNote({
      title: `Notes on: ${topic.title}`,
      content: `${topic.summary}\n\nKey Scripture:\n${topic.scripturePassages
        .map((s) => `• ${s.reference}: "${s.text}" - ${s.explanation}`)
        .join("\n")}`,
      category: "Apologetics",
    });
    setSavedToNotes(true);
    incrementStat("topicsStudied", 1);
    setTimeout(() => setSavedToNotes(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e3a8a] text-white p-5 flex items-start justify-between border-b border-blue-900">
          <div>
            {"category" in topic && topic.category && (
              <span className="inline-block bg-[#c9a84c] text-[#1e3a8a] text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1.5">
                {topic.category}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {topic.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Sub-tabs Navigation */}
        <div className="flex bg-[#f8f7f4] border-b border-gray-200 px-3 overflow-x-auto scrollbar-none text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab("summary")}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === "summary"
                ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#c9a84c]" />
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
            <Scroll className="w-4 h-4 text-[#c9a84c]" />
            <span>Scripture ({topic.scripturePassages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("arguments")}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === "arguments"
                ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
            <span>Arguments ({topic.mainArguments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("fathers")}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === "fathers"
                ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="w-4 h-4 text-[#c9a84c]" />
            <span>Church Fathers ({topic.churchFathersQuotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tips")}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === "tips"
                ? "border-[#1e3a8a] text-[#1e3a8a] font-bold"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#c9a84c]" />
            <span>Tips & Mistakes</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-gray-800 text-sm leading-relaxed">
          {/* TAB 1: SUMMARY */}
          {activeTab === "summary" && (
            <div className="space-y-4">
              <div className="bg-[#f8f7f4] border border-[#e2ddd6] rounded-xl p-4">
                <h4 className="font-bold text-[#1e3a8a] text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#c9a84c]" />
                  <span>Theological Overview</span>
                </h4>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {topic.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/50">
                  <h5 className="font-bold text-[#1e3a8a] text-xs uppercase mb-1">
                    Biblical Support
                  </h5>
                  <p className="text-xs text-gray-600">
                    Includes {topic.scripturePassages.length} explicit biblical verses refuting the objection.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/50">
                  <h5 className="font-bold text-[#1e3a8a] text-xs uppercase mb-1">
                    Patristic Witness
                  </h5>
                  <p className="text-xs text-gray-600">
                    Validated by early Church Fathers dating back to apostolic antiquity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCRIPTURE */}
          {activeTab === "scripture" && (
            <div className="space-y-4">
              {topic.scripturePassages.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-[#fcfaf7] border border-[#e2ddd6] rounded-xl p-4 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1e3a8a] text-sm tracking-wide">
                      📜 {sec.reference}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      Biblical Witness
                    </span>
                  </div>
                  <blockquote className="italic border-l-3 border-[#c9a84c] pl-3 py-1 text-gray-800 text-sm bg-white/60 rounded-r">
                    "{sec.text}"
                  </blockquote>
                  <div className="pt-1 text-xs sm:text-sm text-gray-600">
                    <strong className="text-[#1e3a8a]">Catholic Explanation: </strong>
                    {sec.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ARGUMENTS */}
          {activeTab === "arguments" && (
            <div className="space-y-3.5">
              {topic.mainArguments.map((arg, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs hover:border-[#1e3a8a] transition"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-[#1e3a8a] text-sm sm:text-base">
                      {arg.title}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed pl-7">
                    {arg.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CHURCH FATHERS */}
          {activeTab === "fathers" && (
            <div className="space-y-4">
              {topic.churchFathersQuotes.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8f7f4] border border-[#e2ddd6] rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between border-b border-[#e2ddd6] pb-2">
                    <h5 className="font-bold text-[#1e3a8a] text-sm">
                      🏛️ {q.father}
                    </h5>
                    <span className="text-[11px] text-gray-500 italic">
                      {q.work}
                    </span>
                  </div>
                  <p className="text-gray-800 text-xs sm:text-sm italic leading-relaxed pt-1">
                    "{q.quote}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: TIPS & MISTAKES */}
          {activeTab === "tips" && (
            <div className="space-y-5">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                <h5 className="font-bold text-emerald-900 text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>Effective Apologetics Tips</span>
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
                  {topic.practicalTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 space-y-2">
                <h5 className="font-bold text-rose-900 text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Common Mistakes to Avoid</span>
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm text-rose-950">
                  {topic.commonMistakes.map((mis, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{mis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 p-3 sm:p-4 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5">
          <button
            onClick={handleSaveToNotes}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              savedToNotes
                ? "bg-emerald-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
            }`}
          >
            {savedToNotes ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Notes!</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4 text-[#c9a84c]" />
                <span>Save to Notes</span>
              </>
            )}
          </button>

          {onStartDebate && (
            <button
              onClick={() => {
                onClose();
                onStartDebate(topic.title);
              }}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer"
            >
              <Swords className="w-4 h-4 text-[#f0d080]" />
              <span>Practice Debate on This</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
