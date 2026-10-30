import React, { useState, useRef, useEffect } from "react";
import {
  OPPONENTS,
  OPPONENT_SYSTEMS,
  OpponentType,
  Difficulty,
} from "../data/opponentsData";
import { useApp } from "../context/AppContext";
import { reviewDebate, sendChatMessage } from "../services/aiService";
import {
  Users,
  Send,
  Loader2,
  Award,
  RotateCcw,
  Swords,
  ChevronRight,
  Flame,
  CheckCircle,
  FileCheck,
} from "lucide-react";

export const OpponentDebateView: React.FC = () => {
  const { incrementStat } = useApp();
  const [selectedOpponent, setSelectedOpponent] = useState<OpponentType | null>(
    null
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    "Beginner"
  );
  const [inDebate, setInDebate] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartDebate = async (opp: OpponentType, diff: Difficulty) => {
    setSelectedOpponent(opp);
    setSelectedDifficulty(diff);
    setInDebate(true);
    setReviewResult(null);

    // Initial message from opponent
    setLoading(true);
    const systemPrompt = OPPONENT_SYSTEMS[opp][diff];
    const initialPrompt = `Hello, let's discuss faith. Please state your opening objection or question to the Catholic.`;

    try {
      const firstMsg = await sendChatMessage(
        [{ role: "user", content: initialPrompt }],
        systemPrompt,
        diff === "Advanced"
      );
      setMessages([{ role: "assistant", content: firstMsg }]);
    } catch {
      setMessages([
        {
          role: "assistant",
          content: OPPONENTS[opp].sampleObjections[0],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading || !selectedOpponent) return;

    const userText = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: userText }];
    setMessages(newMessages);
    setLoading(true);

    const systemPrompt = OPPONENT_SYSTEMS[selectedOpponent][selectedDifficulty];

    try {
      const response = await sendChatMessage(
        newMessages,
        systemPrompt,
        selectedDifficulty === "Advanced"
      );
      setMessages([...newMessages, { role: "assistant", content: response }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I hear what you are saying, but how does that address the foundational critique we discussed? What historical or biblical evidence supports that view?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishDebate = async () => {
    if (messages.length === 0 || !selectedOpponent) return;
    setReviewing(true);

    const transcript = messages
      .map((m) => `${m.role === "user" ? "Catholic Defender" : selectedOpponent}: ${m.content}`)
      .join("\n\n");

    try {
      const review = await reviewDebate(
        transcript,
        selectedOpponent,
        selectedDifficulty
      );
      setReviewResult(review);
      incrementStat("debatesCompleted", 1);
      incrementStat("sessionsFinished", 1);
    } catch (e) {
      console.error(e);
    } finally {
      setReviewing(false);
    }
  };

  const resetDebate = () => {
    setInDebate(false);
    setMessages([]);
    setReviewResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. SELECTION SCREEN */}
      {!inDebate && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#c9a84c] shrink-0" />
              <span>Choose Your Practice Opponent</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              Select a perspective and difficulty level. You will engage in a realistic simulated conversation, testing your knowledge of Scripture, history, and theology.
            </p>
          </div>

          {/* Difficulty selector */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-3">
            <h3 className="font-bold text-xs sm:text-sm text-gray-900 uppercase tracking-wide">
              Select Difficulty Level
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map(
                (lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`py-2 px-1.5 sm:py-2.5 sm:px-3 rounded-xl border text-xs sm:text-sm font-bold transition flex flex-col items-center justify-center gap-0.5 sm:gap-1 text-center cursor-pointer ${
                      selectedDifficulty === lvl
                        ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    <span>{lvl}</span>
                    <span className="text-[9px] sm:text-[10px] font-normal opacity-85 leading-tight line-clamp-1">
                      {lvl === "Beginner"
                        ? "Curious"
                        : lvl === "Intermediate"
                        ? "Knowledgeable"
                        : "Scholar"}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Opponent Cards */}
          <div className="space-y-3">
            {(Object.keys(OPPONENTS) as OpponentType[]).map((type) => {
              const opp = OPPONENTS[type];
              return (
                <div
                  key={type}
                  onClick={() => handleStartDebate(type, selectedDifficulty)}
                  className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-[#1e3a8a] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${opp.badgeColor}`}
                      >
                        {opp.type}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#1e3a8a] transition">
                        {opp.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {opp.description}
                    </p>
                    <div className="text-[11px] text-gray-400 italic line-clamp-2">
                      Common objections: "{opp.sampleObjections[0]}"
                    </div>
                  </div>

                  <button className="w-full sm:w-auto flex items-center justify-center gap-1 bg-[#1e3a8a] text-white text-xs font-bold px-4 py-2.5 rounded-xl group-hover:bg-blue-900 shadow transition whitespace-nowrap cursor-pointer">
                    <span>Debate ({selectedDifficulty})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. LIVE DEBATE ARENA */}
      {inDebate && (
        <div className="space-y-3 sm:space-y-4">
          {/* Match Status Header */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#e2ddd6] shadow-sm flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                  selectedOpponent ? OPPONENTS[selectedOpponent].badgeColor : "bg-gray-700"
                }`}
              >
                {selectedOpponent?.[0]}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                  Debate with {selectedOpponent}
                </h3>
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block truncate">
                  Level: {selectedDifficulty} • {messages.length} exchanges
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full xs:w-auto justify-end shrink-0">
              <button
                onClick={resetDebate}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleFinishDebate}
                disabled={reviewing || messages.length < 2}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow disabled:opacity-50 cursor-pointer"
              >
                {reviewing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileCheck className="w-3.5 h-3.5" />
                )}
                <span>Finish & Review</span>
              </button>
            </div>
          </div>

          {/* AI Scorecard Review Modal / Banner if finished */}
          {reviewResult && (
            <div className="bg-[#fcfaf7] border-2 border-[#c9a84c] rounded-2xl p-6 shadow-md space-y-4 animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between border-b border-[#e2ddd6] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#c9a84c]" />
                  <h3 className="font-bold text-base text-[#1e3a8a]">
                    AI Apologetics Coach Assessment
                  </h3>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500" /> +30 XP Earned
                </span>
              </div>

              <div className="text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                {reviewResult}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={resetDebate}
                  className="px-4 py-2 bg-[#1e3a8a] text-white text-xs font-bold rounded-xl shadow hover:bg-blue-900 transition flex items-center gap-1.5"
                >
                  <Swords className="w-3.5 h-3.5 text-[#f0d080]" />
                  <span>Start New Debate</span>
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm min-h-[380px] max-h-[500px] overflow-y-auto space-y-3.5">
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#1e3a8a] text-white rounded-tr-none"
                        : "bg-[#f8f7f4] text-gray-800 border border-gray-200 rounded-tl-none font-sans"
                    }`}
                  >
                    <div className="text-[10px] font-bold opacity-75 mb-1 uppercase tracking-wide">
                      {isUser ? "You (Catholic Defender)" : selectedOpponent}
                    </div>
                    <p className="whitespace-pre-line">{m.content}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#f8f7f4] border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-500 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1e3a8a]" />
                  <span>{selectedOpponent} is formulating response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Present your defense, cite scripture, or ask a question..."
              disabled={loading || reviewing}
              className="flex-1 bg-white border border-gray-300 focus:border-[#1e3a8a] px-4 py-3 rounded-xl text-sm outline-none transition shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || reviewing}
              className="px-5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#f0d080]" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
