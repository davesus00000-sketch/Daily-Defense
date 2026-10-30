import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navigation, TabType } from "./components/Navigation";
import { TopicsTab } from "./components/TopicsTab";
import { TopicDetailModal } from "./components/TopicDetailModal";
import { StudyTab } from "./components/StudyTab";
import { BibleStudyView } from "./components/BibleStudyView";
import { CatholicLibraryView } from "./components/CatholicLibraryView";
import { TopicGeneratorView } from "./components/TopicGeneratorView";
import { NotesView } from "./components/NotesView";
import { PracticeTab } from "./components/PracticeTab";
import { OpponentDebateView } from "./components/OpponentDebateView";
import { ApologeticsChatView } from "./components/ApologeticsChatView";
import { FaithCompanionView } from "./components/FaithCompanionView";
import { TacticsWorkshopView } from "./components/TacticsWorkshopView";
import { QuotesView } from "./components/QuotesView";
import { PrayerTab } from "./components/PrayerTab";
import { ProfileTab } from "./components/ProfileTab";
import { AuthModal } from "./components/AuthModal";
import { AuthScreen } from "./components/AuthScreen";
import { TopicContent, SavedTopic } from "./types";

export type SubViewType =
  | "bible"
  | "library"
  | "generator"
  | "notes"
  | "opponent"
  | "apologetics-chat"
  | "faith-companion"
  | "tactics"
  | "quotes"
  | null;

function AuthModalConsumer() {
  const { authModalOpen, closeAuthModal, authModalTab } = useApp();
  return (
    <AuthModal
      isOpen={authModalOpen}
      onClose={closeAuthModal}
      initialTab={authModalTab}
    />
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>("topics");
  const [subView, setSubView] = useState<SubViewType>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicContent | SavedTopic | null>(null);
  const [initialVerse, setInitialVerse] = useState("John 6:53");
  const [initialChatPrompt, setInitialChatPrompt] = useState("");

  const handleOpenBible = (verse?: string) => {
    if (verse) setInitialVerse(verse);
    setSubView("bible");
  };

  const handleStartDebateFromTopic = (topicTitle: string) => {
    setInitialChatPrompt(
      `I want to debate the Catholic position on "${topicTitle}". Please present the strongest objection against it.`
    );
    setSubView("apologetics-chat");
  };

  const getSubViewTitle = () => {
    switch (subView) {
      case "bible":
        return "Bible Study";
      case "library":
        return "Catholic Library";
      case "generator":
        return "Topic Generator";
      case "notes":
        return "Note Storage";
      case "opponent":
        return "Opponent Arena";
      case "apologetics-chat":
        return "Apologetics AI";
      case "faith-companion":
        return "Faith Companion";
      case "tactics":
        return "Tactics Workshop";
      case "quotes":
        return "Catholic Pillars & Science";
      default:
        return null;
    }
  };

  const handleOpenQuotes = () => {
    setSubView("quotes");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1a1a2e] flex flex-col font-sans selection:bg-[#f0d080] selection:text-[#1e3a8a]">
      {/* Navigation & Header */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSubView(null);
        }}
        subviewTitle={getSubViewTitle()}
        onBack={subView ? () => setSubView(null) : undefined}
        onOpenQuotes={handleOpenQuotes}
        onOpenNotes={() => setSubView("notes")}
      />

      {/* Main Content Area with bottom navigation clearance */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6 pb-24 sm:pb-28">
        {/* Subviews rendered on top of active tab */}
        {subView === "bible" && <BibleStudyView initialVerse={initialVerse} />}
        {subView === "library" && <CatholicLibraryView />}
        {subView === "generator" && <TopicGeneratorView />}
        {subView === "notes" && <NotesView />}
        {subView === "opponent" && <OpponentDebateView />}
        {subView === "apologetics-chat" && (
          <ApologeticsChatView initialPrompt={initialChatPrompt} />
        )}
        {subView === "faith-companion" && <FaithCompanionView />}
        {subView === "tactics" && <TacticsWorkshopView />}
        {subView === "quotes" && (
          <QuotesView
            onOpenNotes={() => setSubView("notes")}
            onOpenChat={(prompt) => {
              setInitialChatPrompt(prompt);
              setSubView("apologetics-chat");
            }}
          />
        )}

        {/* Primary Tabs */}
        {!subView && (
          <>
            {activeTab === "topics" && (
              <TopicsTab
                onSelectTopic={(t) => setSelectedTopic(t)}
                onOpenGenerator={() => setSubView("generator")}
                onOpenQuotes={handleOpenQuotes}
              />
            )}

            {activeTab === "study" && (
              <StudyTab
                onOpenBible={handleOpenBible}
                onOpenLibrary={() => setSubView("library")}
                onOpenGenerator={() => setSubView("generator")}
                onOpenNotes={() => setSubView("notes")}
                onOpenQuotes={handleOpenQuotes}
              />
            )}

            {activeTab === "practice" && (
              <PracticeTab
                onOpenApologeticsChat={() => {
                  setInitialChatPrompt("");
                  setSubView("apologetics-chat");
                }}
                onOpenFaithCompanion={() => setSubView("faith-companion")}
                onOpenTactics={() => setSubView("tactics")}
                onOpenOpponent={() => setSubView("opponent")}
              />
            )}

            {activeTab === "prayer" && <PrayerTab />}

            {activeTab === "profile" && (
              <ProfileTab onOpenNotes={() => setSubView("notes")} />
            )}
          </>
        )}
      </main>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          onStartDebate={handleStartDebateFromTopic}
        />
      )}

      {/* Authentication Modal */}
      <AuthModalConsumer />
    </div>
  );
}

function AppContent() {
  const { currentUser, isAuthLoading, isGuest, continueAsGuest } = useApp();

  // Loading state while verifying Firebase Auth
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-[#c9a84c] flex items-center justify-center text-[#1e3a8a] font-black text-3xl shadow-lg border-2 border-amber-300 animate-pulse select-none">
          ✝
        </div>
        <p className="mt-4 font-bold text-[#1e3a8a] text-sm tracking-wide">
          Daily Defense
        </p>
        <p className="text-xs text-gray-500 mt-1">Starting Catholic Apologetics...</p>
      </div>
    );
  }

  // When starting the app: Sign In comes first!
  if (!currentUser && !isGuest) {
    return (
      <AuthScreen
        initialMode="login"
        onContinueAsGuest={continueAsGuest}
      />
    );
  }

  return <MainApp />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
