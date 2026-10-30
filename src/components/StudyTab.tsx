import React from "react";
import { FEATURED_VERSES } from "../data/versesData";
import { Book, Landmark, Sparkles, FileText, ChevronRight, Scroll, Quote, Atom, NotebookPen } from "lucide-react";
import { useApp } from "../context/AppContext";

interface StudyTabProps {
  onOpenBible: (initialVerse?: string) => void;
  onOpenLibrary: () => void;
  onOpenGenerator: () => void;
  onOpenNotes: () => void;
  onOpenQuotes?: () => void;
}

export const StudyTab: React.FC<StudyTabProps> = ({
  onOpenBible,
  onOpenLibrary,
  onOpenGenerator,
  onOpenNotes,
  onOpenQuotes,
}) => {
  const { notes, savedTopics } = useApp();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Hero Banner */}
      <div className="bg-[#1e3a8a] text-white -mx-3 sm:-mx-6 -mt-3 sm:-mt-6 px-4 pt-3.5 pb-5 sm:pt-5 sm:pb-6 rounded-b-2xl shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#c9a84c] text-[#1e3a8a] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 sm:mb-2">
            Apologetics Study Hub
          </span>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            Form Your Mind in Catholic Truth
          </h2>
          <p className="text-[11px] sm:text-sm text-blue-200 mt-1 max-w-xl leading-relaxed">
            "Faith and reason are like two wings on which the human spirit rises to the contemplation of truth." — St. John Paul II
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 px-1">
        {/* 4 Study Hub Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Bible Study */}
          <div
            onClick={() => onOpenBible()}
            className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-[#1e3a8a] rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Book className="w-5 h-5 text-[#1e3a8a]" />
              </div>
              <h3 className="font-bold text-base text-[#1e3a8a] mb-1">
                Bible Study & Context
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Look up any Scripture verse in the King James / Douay-Rheims tradition with Catholic theological and patristic commentary.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold text-[#1e3a8a]">
              <span>Search any verse</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Catholic Library */}
          <div
            onClick={onOpenLibrary}
            className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-[#1e3a8a] rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Landmark className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Catholic Library
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Direct access to the Catechism (CCC), Vatican II Constitutions, Papal Encyclicals, and early Church Father writings.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold text-purple-700">
              <span>Explore documents</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Topic Generator */}
          <div
            onClick={onOpenGenerator}
            className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-amber-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                AI Topic Generator
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Input any anti-Catholic objection to generate a complete custom study guide with Scripture, arguments, and patristics.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold text-amber-700">
              <span>{savedTopics.length} saved custom topics</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Personal Notes */}
          <div
            onClick={onOpenNotes}
            className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-emerald-600 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <NotebookPen className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Note Storage & Scribe
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Review your saved debate notes, prayer notes, and customized apologetics research organized by category.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold text-emerald-700">
              <span>{notes.length} notes saved</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 5: Catholic Pillars & Science Quotes Dedicated Hub */}
          {onOpenQuotes && (
            <div
              onClick={onOpenQuotes}
              className="group bg-gradient-to-br from-[#fcfaf7] via-white to-amber-50/40 hover:bg-[#fbf9f4] border border-[#e2ddd6] hover:border-[#c9a84c] rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between sm:col-span-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#1e3a8a] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    <Quote className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#1e3a8a]">
                        Catholic Pillars & Science Fathers Quotes
                      </h3>
                      <span className="bg-[#c9a84c]/20 text-[#1e3a8a] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Dedicated Page
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      Explore verified quotes, academic citations, and faith-and-reason insights from Church Fathers, Apologetics Giants, and Catholic Priest-Scientists (Georges Lemaître, Gregor Mendel, Louis Pasteur, Angelo Secchi).
                    </p>
                  </div>
                </div>
                <div className="self-end sm:self-center flex items-center gap-1 text-xs font-bold text-[#1e3a8a] shrink-0 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs group-hover:border-[#c9a84c]">
                  <span>Browse Full Page</span>
                  <ChevronRight className="w-4 h-4 text-[#c9a84c] group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Apologetics Verses */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2ddd6] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-[#1e3a8a] flex items-center gap-2">
                <Scroll className="w-4 h-4 text-[#c9a84c]" />
                <span>Featured Apologetics Verses</span>
              </h3>
              <p className="text-xs text-gray-500">
                Essential passages for defending Catholic doctrine
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gray-400">
              Tap to study
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURED_VERSES.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenBible(item.ref)}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-[#1e3a8a] hover:bg-blue-50/30 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#1e3a8a]">
                    {item.ref}
                  </span>
                  <span className="text-[10px] font-semibold bg-[#f0ebe3] text-[#1e3a8a] px-2 py-0.5 rounded">
                    {item.theme}
                  </span>
                </div>
                <p className="text-xs text-gray-700 italic line-clamp-2">
                  "{item.preview}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
