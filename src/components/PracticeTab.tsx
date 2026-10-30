import React from "react";
import { Swords, Bot, Sparkles, Target, Users, ChevronRight, Award } from "lucide-react";
import { useApp } from "../context/AppContext";

interface PracticeTabProps {
  onOpenApologeticsChat: () => void;
  onOpenFaithCompanion: () => void;
  onOpenTactics: () => void;
  onOpenOpponent: () => void;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  onOpenApologeticsChat,
  onOpenFaithCompanion,
  onOpenTactics,
  onOpenOpponent,
}) => {
  const { stats } = useApp();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-[#1e3a8a] text-white -mx-3 sm:-mx-6 -mt-3 sm:-mt-6 px-4 pt-3.5 pb-5 sm:pt-5 sm:pb-6 rounded-b-2xl shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#c9a84c] text-[#1e3a8a] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 sm:mb-2">
            Practice & Sparring Arena
          </span>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            Hone Your Defense in Charity
          </h2>
          <p className="text-[11px] sm:text-sm text-blue-200 mt-1 max-w-xl leading-relaxed">
            "Always be prepared to make a defense to anyone who calls you to account for the hope that is in you, yet do it with gentleness and reverence." — 1 Peter 3:15
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 px-1">
        {/* Practice Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-[#1e3a8a] rounded-lg">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Debates Done</div>
              <div className="text-lg font-bold text-[#1e3a8a]">
                {stats.debatesCompleted}
              </div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Opponent Matches</div>
              <div className="text-lg font-bold text-gray-900">
                {stats.sessionsFinished}
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Topics Studied</div>
              <div className="text-lg font-bold text-emerald-800">
                {stats.topicsStudied}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Practice Arenas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Opponent Debate Simulator */}
          <div
            onClick={onOpenOpponent}
            className="group bg-gradient-to-br from-rose-50/50 via-white to-rose-50/30 hover:to-rose-100/50 border border-rose-200 hover:border-rose-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition">
                  <Users className="w-5 h-5" />
                </div>
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Interactive Debate
                </span>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Practice Opponents & AI Review
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Debate simulated Muslim, Atheist, or Protestant personas across Beginner, Intermediate, and Advanced levels. Finish and receive an AI coach scorecard with strengths and misses!
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-rose-100 text-xs font-bold text-rose-700">
              <span>Enter arena</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 2. Apologetics AI Chat */}
          <div
            onClick={onOpenApologeticsChat}
            className="group bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 hover:to-blue-100/50 border border-blue-200 hover:border-[#1e3a8a] rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center group-hover:scale-105 transition">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="bg-[#1e3a8a] text-[#f0d080] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  DeepThink Mode
                </span>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Apologetics AI Sparring
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Ask tough Catholic questions, test arguments, or ask the AI to play the devil's advocate. Toggle DeepThink mode for high-powered philosophical analysis.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-blue-100 text-xs font-bold text-[#1e3a8a]">
              <span>Start sparring</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 3. Tactics Workshop */}
          <div
            onClick={onOpenTactics}
            className="group bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 hover:to-amber-100/50 border border-amber-200 hover:border-amber-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition">
                  <Target className="w-5 h-5" />
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  5 Key Tactics
                </span>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Tactics Workshop
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Learn how to steer conversations using the Columbo Tactic, Burden of Proof, Stealing the Bait, Common Ground, and the Tu Quoque defense with interactive AI coaching.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-amber-100 text-xs font-bold text-amber-800">
              <span>Practice tactics</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 4. Faith Companion */}
          <div
            onClick={onOpenFaithCompanion}
            className="group bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/30 hover:to-indigo-100/50 border border-indigo-200 hover:border-indigo-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Spiritual Counsel
                </span>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Faith Companion
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                A warm, prayerful Catholic companion for personal spiritual questions, examining doubts with charity, and seeking peace in Christ.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-indigo-100 text-xs font-bold text-indigo-700">
              <span>Open companion</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
