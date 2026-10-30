import React from "react";
import { LIBRARY_CATEGORIES } from "../data/libraryData";
import { ExternalLink, Landmark, BookOpen, Scroll, Shield } from "lucide-react";

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Landmark":
      return Landmark;
    case "Scroll":
      return Scroll;
    case "Shield":
      return Shield;
    default:
      return BookOpen;
  }
};

export const CatholicLibraryView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
          <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a84c] shrink-0" />
          <span>Catholic Document Library</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Explore primary source texts of the Magisterium: Vatican II Constitutions, official Catechism, encyclicals, and early Church Father collections.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-4 sm:space-y-6">
        {LIBRARY_CATEGORIES.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon);
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-3.5"
            >
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                <div className={`p-2 rounded-xl ${cat.badgeBg} ${cat.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm sm:text-base ${cat.color}`}>
                    {cat.category}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-gray-500">
                    {cat.documents.length} essential documents
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {cat.documents.map((doc, dIdx) => (
                  <a
                    key={dIdx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3.5 sm:p-4 rounded-xl border border-gray-200 hover:border-[#1e3a8a] hover:bg-[#fcfaf7] transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#1e3a8a] transition leading-snug">
                          {doc.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a8a] shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        {doc.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500 flex-wrap gap-1">
                      <span>Source: {doc.source}</span>
                      <span className="text-[#1e3a8a] group-hover:underline">
                        Open document →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
