import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Shield,
  BookOpen,
  Swords,
  Heart,
  User,
  ChevronLeft,
  LogIn,
  LogOut,
  Quote,
  FileText,
  Notebook,
  NotebookPen,
} from "lucide-react";

export type TabType = "topics" | "study" | "practice" | "prayer" | "profile";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  subviewTitle?: string | null;
  onBack?: () => void;
  onOpenQuotes?: () => void;
  onOpenNotes?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  subviewTitle,
  onBack,
  onOpenQuotes,
  onOpenNotes,
}) => {
  const { profile, currentUser, notes, openAuthModal, logout } = useApp();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const xpTowardsNext = profile.xp % 100;

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#1e3a8a] text-white shadow-md border-b border-blue-900/60">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Left: Back or Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium text-xs sm:text-sm transition cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0d080]" />
                <span>Back</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center text-[#1e3a8a] font-black text-lg shadow-inner select-none">
                  ✝
                </div>
                <div>
                  <h1 className="font-bold text-base sm:text-lg leading-tight tracking-wide text-white truncate">
                    Daily Defense
                  </h1>
                  <p className="text-[10px] sm:text-xs text-blue-200/80 leading-none mt-0.5">
                    Catholic Apologetics
                  </p>
                </div>
              </div>
            )}

            {subviewTitle && (
              <div className="border-l border-white/20 pl-2 sm:pl-3 truncate">
                <span className="text-xs sm:text-sm font-semibold text-amber-200 truncate block max-w-[130px] sm:max-w-xs">
                  {subviewTitle}
                </span>
              </div>
            )}
          </div>

          {/* Right: Level & Auth / Account Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenNotes && (
              <button
                onClick={onOpenNotes}
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/15 text-xs font-semibold transition cursor-pointer"
                title="Open Note Storage"
              >
                <Notebook className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden xs:inline">Notes</span>
                {notes.length > 0 && (
                  <span className="bg-[#c9a84c] text-[#1e3a8a] text-[10px] font-black px-1.5 py-0.2 rounded-full leading-none">
                    {notes.length}
                  </span>
                )}
              </button>
            )}

            {onOpenQuotes && (
              <button
                onClick={onOpenQuotes}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#c9a84c]/20 hover:bg-[#c9a84c]/30 text-[#f0d080] border border-[#c9a84c]/30 text-xs font-bold transition cursor-pointer"
                title="Open Catholic Pillars & Science Quotes Archive"
              >
                <Quote className="w-3.5 h-3.5 text-[#f0d080]" />
                <span>Pillars & Science</span>
              </button>
            )}

            {/* Level & XP badge */}
            <div className="flex bg-white/10 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-white/10 items-center gap-1.5 sm:gap-2 text-xs">
              <span className="font-bold text-[#f0d080] text-[11px] sm:text-xs tracking-wide">
                LVL {profile.level}
              </span>
              <div className="w-10 sm:w-14 bg-blue-950/80 rounded-full h-1.5 sm:h-2 overflow-hidden border border-blue-800">
                <div
                  className="bg-gradient-to-r from-[#c9a84c] to-[#f0d080] h-full transition-all duration-300"
                  style={{ width: `${xpTowardsNext}%` }}
                />
              </div>
              <span className="hidden xs:inline text-blue-200 text-[10px] font-mono">
                {xpTowardsNext} XP
              </span>
            </div>

            {/* User Account / Auth Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/15 transition cursor-pointer"
                  title={currentUser.displayName || currentUser.email || "Account"}
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || "Avatar"}
                      className="w-7 h-7 rounded-lg object-cover border border-[#c9a84c]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-[#c9a84c] text-[#1e3a8a] font-black text-xs flex items-center justify-center">
                      {(currentUser.displayName || currentUser.email || "D")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:inline text-xs font-semibold text-white max-w-[90px] truncate">
                    {currentUser.displayName || currentUser.email?.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {currentUser.displayName || "Defender"}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {currentUser.email || "Signed In"}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onBack) onBack();
                          setActiveTab("profile");
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100 transition mt-1 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#1e3a8a]" />
                        <span>View Profile & Badges</span>
                      </button>

                      {onOpenNotes && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenNotes();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <NotebookPen className="w-4 h-4 text-emerald-600" />
                          <span>Note Storage ({notes.length})</span>
                        </button>
                      )}

                      {onOpenQuotes && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenQuotes();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <Quote className="w-4 h-4 text-[#c9a84c]" />
                          <span>Pillars & Science Quotes</span>
                        </button>
                      )}

                      <button
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b556] active:bg-[#b8953f] text-[#1e3a8a] font-bold text-xs shadow-xs transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Android Mobile Bottom Navigation Bar (Topics, Study, Practice, Prayer, Profile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1e3a8a] text-white border-t border-blue-900/80 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto grid grid-cols-5 px-1 py-1">
          {/* Tab 1: Topics */}
          <button
            onClick={() => {
              if (onBack) onBack();
              setActiveTab("topics");
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer min-h-[50px] relative ${
              activeTab === "topics" && !subviewTitle
                ? "text-[#f0d080]"
                : "text-blue-200/75 hover:text-white"
            }`}
          >
            {activeTab === "topics" && !subviewTitle && (
              <span className="absolute top-0.5 w-6 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
            <Shield className={`w-5 h-5 transition-transform ${activeTab === "topics" && !subviewTitle ? "scale-110" : ""}`} />
            <span className={`text-[10px] mt-1 tracking-tight leading-none ${activeTab === "topics" && !subviewTitle ? "font-bold" : "font-medium"}`}>
              Topics
            </span>
          </button>

          {/* Tab 2: Study */}
          <button
            onClick={() => {
              if (onBack) onBack();
              setActiveTab("study");
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer min-h-[50px] relative ${
              activeTab === "study" && !subviewTitle
                ? "text-[#f0d080]"
                : "text-blue-200/75 hover:text-white"
            }`}
          >
            {activeTab === "study" && !subviewTitle && (
              <span className="absolute top-0.5 w-6 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
            <BookOpen className={`w-5 h-5 transition-transform ${activeTab === "study" && !subviewTitle ? "scale-110" : ""}`} />
            <span className={`text-[10px] mt-1 tracking-tight leading-none ${activeTab === "study" && !subviewTitle ? "font-bold" : "font-medium"}`}>
              Study
            </span>
          </button>

          {/* Tab 3: Practice */}
          <button
            onClick={() => {
              if (onBack) onBack();
              setActiveTab("practice");
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer min-h-[50px] relative ${
              activeTab === "practice" && !subviewTitle
                ? "text-[#f0d080]"
                : "text-blue-200/75 hover:text-white"
            }`}
          >
            {activeTab === "practice" && !subviewTitle && (
              <span className="absolute top-0.5 w-6 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
            <Swords className={`w-5 h-5 transition-transform ${activeTab === "practice" && !subviewTitle ? "scale-110" : ""}`} />
            <span className={`text-[10px] mt-1 tracking-tight leading-none ${activeTab === "practice" && !subviewTitle ? "font-bold" : "font-medium"}`}>
              Practice
            </span>
          </button>

          {/* Tab 4: Prayer */}
          <button
            onClick={() => {
              if (onBack) onBack();
              setActiveTab("prayer");
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer min-h-[50px] relative ${
              activeTab === "prayer" && !subviewTitle
                ? "text-[#f0d080]"
                : "text-blue-200/75 hover:text-white"
            }`}
          >
            {activeTab === "prayer" && !subviewTitle && (
              <span className="absolute top-0.5 w-6 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
            <Heart className={`w-5 h-5 transition-transform ${activeTab === "prayer" && !subviewTitle ? "scale-110" : ""}`} />
            <span className={`text-[10px] mt-1 tracking-tight leading-none ${activeTab === "prayer" && !subviewTitle ? "font-bold" : "font-medium"}`}>
              Prayer
            </span>
          </button>

          {/* Tab 5: Profile */}
          <button
            onClick={() => {
              if (onBack) onBack();
              setActiveTab("profile");
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer min-h-[50px] relative ${
              activeTab === "profile" && !subviewTitle
                ? "text-[#f0d080]"
                : "text-blue-200/75 hover:text-white"
            }`}
          >
            {activeTab === "profile" && !subviewTitle && (
              <span className="absolute top-0.5 w-6 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
            <User className={`w-5 h-5 transition-transform ${activeTab === "profile" && !subviewTitle ? "scale-110" : ""}`} />
            <span className={`text-[10px] mt-1 tracking-tight leading-none ${activeTab === "profile" && !subviewTitle ? "font-bold" : "font-medium"}`}>
              Profile
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
