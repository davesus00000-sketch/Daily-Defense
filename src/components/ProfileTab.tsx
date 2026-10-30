import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Achievement } from "../types";
import {
  User,
  Award,
  Shield,
  ShieldAlert,
  Users,
  Swords,
  BookOpen,
  GraduationCap,
  Heart,
  Flame,
  Scroll,
  BookMarked,
  FileEdit,
  Files,
  Zap,
  Sparkles,
  Edit2,
  Check,
  X,
  RotateCcw,
  BarChart2,
  LogIn,
  LogOut,
  UserPlus,
  ShieldCheck,
  Cloud,
  FileText,
  ChevronRight,
  Database,
  FolderArchive,
  Notebook,
  NotebookPen,
} from "lucide-react";

interface ProfileTabProps {
  onOpenNotes?: () => void;
}

const getAchievementIcon = (iconName: string) => {
  switch (iconName) {
    case "Shield":
      return Shield;
    case "ShieldAlert":
      return ShieldAlert;
    case "Award":
      return Award;
    case "Users":
      return Users;
    case "Swords":
      return Swords;
    case "BookOpen":
      return BookOpen;
    case "GraduationCap":
      return GraduationCap;
    case "Heart":
      return Heart;
    case "Flame":
      return Flame;
    case "Scroll":
      return Scroll;
    case "BookMarked":
      return BookMarked;
    case "FileEdit":
      return FileEdit;
    case "Files":
      return Files;
    case "Zap":
      return Zap;
    case "Sparkles":
      return Sparkles;
    default:
      return Award;
  }
};

export const ProfileTab: React.FC<ProfileTabProps> = ({ onOpenNotes }) => {
  const {
    profile,
    stats,
    notes,
    achievements,
    currentUser,
    openAuthModal,
    logout,
    updateProfile,
    resetAllData,
  } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(
    null
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const xpTowardsNext = profile.xp % 100;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, bio });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
      {/* Account Authentication Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-sm">
        {currentUser ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "Avatar"}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-[#c9a84c] shadow-xs shrink-0"
                />
              ) : (
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#1e3a8a] to-[#2546a8] text-[#f0d080] font-black text-lg sm:text-xl flex items-center justify-center border-2 border-[#c9a84c] shadow-xs shrink-0">
                  {(currentUser.displayName || currentUser.email || "D")[0].toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                    {currentUser.displayName || "Catholic Defender"}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Synced
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-500 font-mono mt-0.5 truncate">
                  {currentUser.email || "Authenticated User"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] sm:text-[11px] text-gray-500">
                  <span className="font-medium text-gray-600">Method:</span>
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded font-medium text-gray-700 capitalize truncate">
                    {currentUser.providerId?.includes("google")
                      ? "Google"
                      : "Email & Password"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="self-start sm:self-center px-3.5 py-2 border border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-700 hover:text-rose-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Account & Cloud Sync
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                    You are exploring in Guest mode. Sign in to save your defense progress across devices!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => openAuthModal("login")}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 active:bg-blue-950 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#f0d080]" />
                <span>Sign In (Google or Email)</span>
              </button>

              <button
                onClick={() => openAuthModal("register")}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#f8f7f4] hover:bg-[#edeae4] border border-gray-300 text-[#1e3a8a] rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#c9a84c]" />
                <span>Create Account</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-sm space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1e3a8a] to-[#2d4db8] text-[#f0d080] flex items-center justify-center font-bold text-3xl shadow-md border-2 border-[#c9a84c]">
            {profile.name[0] || "C"}
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <span className="bg-[#c9a84c] text-[#1e3a8a] text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Level {profile.level} Defender
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
              {onOpenNotes && (
                <button
                  onClick={onOpenNotes}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1e3a8a] hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  title="Open Note Storage"
                >
                  <NotebookPen className="w-3.5 h-3.5 text-[#f0d080]" />
                  <span>Note Storage</span>
                  <span className="bg-[#c9a84c] text-[#1e3a8a] text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
                    {notes.length}
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  setName(profile.name);
                  setBio(profile.bio);
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="bg-[#f8f7f4] border border-[#e2ddd6] p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#1e3a8a]">
            <span>Level {profile.level}</span>
            <span>{xpTowardsNext} / 100 XP to Level {profile.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#1e3a8a] via-[#2d4db8] to-[#c9a84c] h-full transition-all duration-500 rounded-full"
              style={{ width: `${xpTowardsNext}%` }}
            />
          </div>
          <div className="text-[11px] text-gray-500 text-right">
            Total XP: {profile.xp}
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2ddd6] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#1e3a8a] flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#c9a84c]" />
          <span>Apologetics Statistics</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Debates Completed</span>
            <div className="text-xl font-bold text-[#1e3a8a] mt-0.5">
              {stats.debatesCompleted}
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Topics Studied</span>
            <div className="text-xl font-bold text-[#1e3a8a] mt-0.5">
              {stats.topicsStudied}
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Opponent Matches</span>
            <div className="text-xl font-bold text-[#1e3a8a] mt-0.5">
              {stats.sessionsFinished}
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Prayers Generated</span>
            <div className="text-xl font-bold text-[#1e3a8a] mt-0.5">
              {stats.prayersGenerated}
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Verses Studied</span>
            <div className="text-xl font-bold text-[#1e3a8a] mt-0.5">
              {stats.versesStudied}
            </div>
          </div>

          <div
            onClick={onOpenNotes}
            className={`p-3.5 bg-gray-50 rounded-xl border border-gray-100 transition ${
              onOpenNotes
                ? "hover:border-[#c9a84c] hover:bg-amber-50/40 cursor-pointer group"
                : ""
            }`}
            title={onOpenNotes ? "Click to open Note Storage" : undefined}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Notes Saved</span>
              {onOpenNotes && (
                <Notebook className="w-3.5 h-3.5 text-[#c9a84c] opacity-60 group-hover:opacity-100 transition" />
              )}
            </div>
            <div className="text-xl font-bold text-[#1e3a8a] mt-0.5 flex items-baseline justify-between">
              <span>{stats.notesCreated}</span>
              {onOpenNotes && (
                <span className="text-[10px] text-[#1e3a8a] font-bold opacity-70 group-hover:opacity-100 transition">
                  Open Storage &rarr;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Note Storage Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 text-[#c9a84c] flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Notebook className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-[#1e3a8a]">
                  Note Storage
                </h4>
                <span className="bg-[#1e3a8a] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {notes.length} note{notes.length === 1 ? "" : "s"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Storage: Persistent Local Storage {currentUser ? "+ Cloud Firestore Sync" : "(Sign in for cloud backup)"}
              </p>
            </div>
          </div>

          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition cursor-pointer shrink-0"
              title="Open Note Storage"
            >
              <NotebookPen className="w-4 h-4 text-[#f0d080]" />
              <span>Note Storage</span>
              <ChevronRight className="w-4 h-4 text-[#f0d080]" />
            </button>
          )}
        </div>

        {/* Note Storage Details / Recent Notes */}
        {notes.length > 0 ? (
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-gray-600">Recent Saved Notes</span>
              {onOpenNotes && (
                <button
                  onClick={onOpenNotes}
                  className="text-xs font-bold text-[#1e3a8a] hover:underline cursor-pointer"
                >
                  View all ({notes.length}) &rarr;
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {notes.slice(0, 2).map((note) => (
                <div
                  key={note.id}
                  onClick={onOpenNotes}
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-amber-50/40 border border-gray-200/80 hover:border-amber-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-gray-800 truncate">
                      {note.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f0ebe3] text-[#1e3a8a] px-1.5 py-0.5 rounded shrink-0">
                      {note.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-1">
                    {note.content || "Empty note"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>No notes stored yet. Capture study insights, Scripture verses, and debate arguments!</span>
            {onOpenNotes && (
              <button
                onClick={onOpenNotes}
                className="font-bold text-[#1e3a8a] hover:underline shrink-0 ml-2 cursor-pointer"
              >
                + Create Note
              </button>
            )}
          </div>
        )}
      </div>

      {/* 15 Achievements */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2ddd6] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#1e3a8a] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c9a84c]" />
              <span>Achievements</span>
            </h3>
            <p className="text-xs text-gray-500">
              Unlocked {unlockedCount} of {achievements.length} badges
            </p>
          </div>
          <div className="text-xs font-bold bg-[#f0ebe3] text-[#1e3a8a] px-3 py-1 rounded-full">
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((ach) => {
            const Icon = getAchievementIcon(ach.icon);
            return (
              <div
                key={ach.id}
                onClick={() => setSelectedAchievement(ach)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  ach.unlocked
                    ? "bg-[#fcfaf7] border-[#c9a84c] shadow-xs"
                    : "bg-gray-50/70 border-gray-200 opacity-60 hover:opacity-80"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    ach.unlocked
                      ? "bg-[#1e3a8a] text-[#f0d080]"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-gray-900 truncate">
                      {ach.title}
                    </h4>
                    {ach.unlocked && (
                      <span className="text-[10px] text-[#c9a84c] font-black">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {ach.description}
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${
                        ach.unlocked ? "bg-[#c9a84c]" : "bg-gray-400"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (ach.progress / ach.threshold) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Factory Reset Danger Zone */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-xs text-gray-800">Local Data Storage</h4>
          <p className="text-xs text-gray-500">
            All notes, stats, and achievements are securely stored in your browser and synced with your account.
          </p>
        </div>
        {confirmReset ? (
          <div className="flex items-center gap-2">
            <button
              onClick={resetAllData}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="px-3 py-1.5 border border-gray-300 hover:bg-rose-50 hover:text-rose-600 text-gray-600 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl border border-gray-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Defender Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-2.5 rounded-xl text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Bio / Motto
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-2.5 rounded-xl text-sm outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#f0d080]" />
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-gray-200 text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
                selectedAchievement.unlocked
                  ? "bg-[#1e3a8a] text-[#f0d080] border-2 border-[#c9a84c]"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {selectedAchievement.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                {selectedAchievement.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {selectedAchievement.description}
              </p>
            </div>

            <div className="bg-[#f8f7f4] p-3 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>Progress</span>
                <span>
                  {selectedAchievement.progress} / {selectedAchievement.threshold}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#c9a84c] h-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (selectedAchievement.progress /
                        selectedAchievement.threshold) *
                        100
                    )}%`,
                  }}
                />
              </div>
              {selectedAchievement.unlocked && (
                <div className="text-[11px] text-emerald-700 font-bold">
                  Unlocked on {selectedAchievement.unlockedAt || "Today"}!
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedAchievement(null)}
              className="w-full py-2 bg-[#1e3a8a] text-white font-bold text-xs rounded-xl hover:bg-blue-900 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
