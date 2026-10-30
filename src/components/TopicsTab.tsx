import React, { useState } from "react";
import { TOPIC_CONTENT } from "../data/topicContent";
import { useApp } from "../context/AppContext";
import { Search, X, Sparkles, ChevronRight, Book, Star, Heart, Droplets, Shield, Clock, LayoutGrid } from "lucide-react";
import { SavedTopic, TopicContent } from "../types";
import { DailyQuotesCard } from "./DailyQuotesCard";

const CATEGORIES = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "Scripture & Tradition", label: "Scripture", icon: Book },
  { id: "Papacy & Authority", label: "Papacy", icon: Star },
  { id: "Mary & Saints", label: "Mary & Saints", icon: Heart },
  { id: "Sacraments", label: "Sacraments", icon: Droplets },
  { id: "Salvation & Works", label: "Salvation", icon: Shield },
  { id: "Church History", label: "History", icon: Clock },
];

export const OBJECTIONS = [
  {
    id: "s1",
    title: "Sola Scriptura",
    subtitle: "Is the Bible the sole and sufficient rule of faith?",
    category: "Scripture & Tradition",
    difficulty: "Intermediate",
    difficultyBadge: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "s2",
    title: "Catholic Books Added to the Bible",
    subtitle: "The 7 Deuterocanonical books controversy explained",
    category: "Scripture & Tradition",
    difficulty: "Intermediate",
    difficultyBadge: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "s3",
    title: "Catholics Worship Idols",
    subtitle: "Statues, sacred art, and the biblical command",
    category: "Scripture & Tradition",
    difficulty: "Beginner",
    difficultyBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "p1",
    title: "Papal Infallibility",
    subtitle: "Can the Pope sin or err? When does infallibility apply?",
    category: "Papacy & Authority",
    difficulty: "Advanced",
    difficultyBadge: "bg-rose-100 text-rose-800 border-rose-300",
  },
  {
    id: "m1",
    title: "Catholics Worship Mary",
    subtitle: "Adoration (latria) vs. veneration (hyperdulia)",
    category: "Mary & Saints",
    difficulty: "Beginner",
    difficultyBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "sa1",
    title: "Confession to a Priest",
    subtitle: "Why confess sins to a mortal man instead of directly to God?",
    category: "Sacraments",
    difficulty: "Beginner",
    difficultyBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "sa2",
    title: "Real Presence in the Eucharist",
    subtitle: "Is Holy Communion truly the Body and Blood of Christ?",
    category: "Sacraments",
    difficulty: "Intermediate",
    difficultyBadge: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "sv1",
    title: "Works vs. Faith for Salvation",
    subtitle: "Do Catholics believe they can earn or buy their way to heaven?",
    category: "Salvation & Works",
    difficulty: "Intermediate",
    difficultyBadge: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "h1",
    title: "The Early Church Was Protestant",
    subtitle: "What did the first Christian martyrs and Fathers actually believe?",
    category: "Church History",
    difficulty: "Advanced",
    difficultyBadge: "bg-rose-100 text-rose-800 border-rose-300",
  },
];

interface TopicsTabProps {
  onSelectTopic: (topic: TopicContent | SavedTopic) => void;
  onOpenGenerator: () => void;
  onOpenQuotes?: () => void;
}

export const TopicsTab: React.FC<TopicsTabProps> = ({
  onSelectTopic,
  onOpenGenerator,
  onOpenQuotes,
}) => {
  const { savedTopics } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = OBJECTIONS.filter((obj) => {
    const matchSearch =
      search.trim() === "" ||
      obj.title.toLowerCase().includes(search.toLowerCase()) ||
      obj.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "all" || obj.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const filteredCustom = savedTopics.filter((t) => {
    const matchSearch =
      search.trim() === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.objection.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Search Header */}
      <div className="bg-[#1e3a8a] text-white -mx-3 sm:-mx-6 -mt-3 sm:-mt-6 px-4 pt-3.5 pb-5 sm:pt-4 sm:pb-6 shadow-md rounded-b-2xl">
        <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Defend the Faith
              </h2>
              <p className="text-[11px] sm:text-xs text-blue-200">
                Biblical, historical, and logical answers to common objections
              </p>
            </div>
            <button
              onClick={onOpenGenerator}
              className="self-start sm:self-auto flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8953f] active:bg-[#a68435] text-[#1e3a8a] font-bold px-3 py-1.5 rounded-xl text-xs transition shadow cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Topic Generator</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search objections (e.g. Eucharist, Mary, Bible alone)..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white focus:text-[#1a1a2e] text-white placeholder-blue-300/70 pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm outline-none transition duration-200 border border-white/15 focus:border-white shadow-inner"
            />
            {search.length > 0 && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#c9a84c] text-[#1e3a8a] font-bold shadow"
                      : "bg-white/10 text-blue-100 hover:bg-white/20"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5 px-1">
        {/* Daily Catholic Wisdom & Science Fathers Quotes */}
        <DailyQuotesCard onOpenQuotesPage={onOpenQuotes} />

        {/* Built-in Objections Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-gray-900 text-sm tracking-wide uppercase flex items-center gap-2">
              <span>Apostolic Defense Guide</span>
              <span className="bg-[#1e3a8a] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {filtered.length}
              </span>
            </h3>
            <span className="text-xs text-gray-500">Tap to study in depth</span>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
              <Book className="w-10 h-10 text-gray-400 mx-auto mb-2 opacity-60" />
              <p className="text-gray-700 font-medium text-sm">
                No matching objections found.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Try searching a different phrase or generate a custom topic with AI!
              </p>
              <button
                onClick={onOpenGenerator}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition shadow"
              >
                <Sparkles className="w-4 h-4 text-[#f0d080]" />
                Generate Topic for "{search}"
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filtered.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => {
                    const full = TOPIC_CONTENT[obj.id];
                    if (full) onSelectTopic(full);
                  }}
                  className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-[#c9a84c] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-[#1e3a8a] text-base group-hover:text-blue-900">
                        {obj.title}
                      </h4>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${obj.difficultyBadge} whitespace-nowrap`}
                      >
                        {obj.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3">
                      {obj.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <span className="bg-[#f0ebe3] text-[#1e3a8a] font-medium px-2 py-0.5 rounded-md text-[11px]">
                      {obj.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#1e3a8a] font-semibold group-hover:translate-x-0.5 transition-transform">
                      Study topic <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom AI Saved Topics Section */}
        {filteredCustom.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 text-sm tracking-wide uppercase mb-3 px-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c9a84c]" />
              <span>Your Custom AI Generated Topics</span>
              <span className="bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {filteredCustom.length}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredCustom.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTopic(item)}
                  className="bg-amber-50/50 hover:bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {item.title}
                      </h4>
                      <span className="bg-amber-200/80 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                        Custom AI
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-amber-900 font-medium pt-2 border-t border-amber-200/60">
                    <span>Saved on {item.savedAt}</span>
                    <span className="flex items-center gap-0.5 font-bold">
                      View <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action card */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2d4db8] text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base text-amber-200 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4" /> Got a specific objection in mind?
            </h4>
            <p className="text-xs text-blue-100 max-w-lg leading-relaxed">
              Use our Catholic AI engine to generate full structured answers with Scripture verses, Church Fathers, and apologetic arguments for any question.
            </p>
          </div>
          <button
            onClick={onOpenGenerator}
            className="whitespace-nowrap px-4 py-2.5 bg-[#c9a84c] hover:bg-[#b8953f] text-[#1e3a8a] font-bold text-xs rounded-xl shadow transition"
          >
            Create Custom Guide
          </button>
        </div>
      </div>
    </div>
  );
};
