import React, { useState } from "react";
import { TACTICS, Tactic } from "../data/tacticsData";
import { sendChatMessage } from "../services/aiService";
import { useApp } from "../context/AppContext";
import {
  Target,
  Send,
  Loader2,
  ChevronRight,
  Lightbulb,
  Sparkles,
  RotateCcw,
} from "lucide-react";

export const TacticsWorkshopView: React.FC = () => {
  const { incrementStat } = useApp();
  const [selectedTactic, setSelectedTactic] = useState<Tactic | null>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectTactic = async (tactic: Tactic) => {
    setSelectedTactic(tactic);
    setLoading(true);
    setMessages([]);

    const systemPrompt = `You are an expert Catholic apologetics coach teaching the student "${tactic.name}".
Explain how to effectively use this strategy in Catholic conversations. Give 2 concise, practical dialogues showing the tactic in action against common objections. Then invite the user to practice with a sample scenario.`;

    try {
      const coaching = await sendChatMessage(
        [{ role: "user", content: tactic.prompt }],
        systemPrompt,
        false
      );
      setMessages([{ role: "assistant", content: coaching }]);
      incrementStat("topicsStudied", 1);
    } catch {
      setMessages([
        {
          role: "assistant",
          content: `Welcome to the **${tactic.name}** workshop!\n\n**The Golden Rule:** ${tactic.keyRule}\n\n**Example Application:**\n${tactic.examples.map((ex) => `• ${ex}`).join("\n")}\n\nTry responding to a critic using this approach right now in the box below!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !selectedTactic) return;

    const userText = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: userText }];
    setMessages(newMessages);
    setLoading(true);

    const systemPrompt = `You are a Catholic apologetics tactics coach evaluating how well the student applied "${selectedTactic.name}".
Critique their response constructively: did they apply the rule "${selectedTactic.keyRule}"? Point out what worked well and how to refine their phrasing to be even more disarming and charitable.`;

    try {
      const feedback = await sendChatMessage(newMessages, systemPrompt, false);
      setMessages([...newMessages, { role: "assistant", content: feedback }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Well done applying that question! Notice how it gently turns the focus back onto their assumptions without putting them on the defensive.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Overview Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e2ddd6] shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
          <Target className="w-5 h-5 text-[#c9a84c] shrink-0" />
          <span>Apologetics Tactics Workshop</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Having good arguments is not enough; we must also know how to converse with grace, clarity, and precision. Master these 5 proven conversation strategies.
        </p>
      </div>

      {/* 5 Tactics Carousel / List */}
      {!selectedTactic ? (
        <div className="space-y-3">
          {TACTICS.map((tactic) => (
            <div
              key={tactic.id}
              onClick={() => handleSelectTactic(tactic)}
              className="group bg-white hover:bg-[#fcfaf7] border border-[#e2ddd6] hover:border-amber-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#1e3a8a] transition">
                    {tactic.name}
                  </h3>
                </div>
                <p className="text-xs font-medium text-amber-800">
                  {tactic.subtitle}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {tactic.desc}
                </p>
              </div>

              <button className="w-full sm:w-auto flex items-center justify-center gap-1 bg-[#1e3a8a] text-white text-xs font-bold px-4 py-2.5 rounded-xl group-hover:bg-blue-900 shadow transition whitespace-nowrap cursor-pointer">
                <span>Practice Tactic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {/* Active Tactic Header */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-300 shadow-sm flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Active Workshop
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#1e3a8a] mt-1 truncate">
                {selectedTactic.name}
              </h3>
              <p className="text-xs text-amber-900 font-medium">
                {selectedTactic.subtitle}
              </p>
              <div className="mt-2 bg-[#fcfaf7] border-l-3 border-[#c9a84c] p-2.5 rounded-r text-xs text-gray-700">
                <strong>Golden Rule:</strong> {selectedTactic.keyRule}
              </div>
            </div>

            <button
              onClick={() => setSelectedTactic(null)}
              className="self-start xs:self-auto px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change</span>
            </button>
          </div>

          {/* Coaching Messages */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm min-h-[380px] max-h-[500px] overflow-y-auto space-y-3.5">
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#1e3a8a] text-white rounded-tr-none shadow-xs"
                        : "bg-[#f8f7f4] text-gray-800 border border-gray-200 rounded-tl-none font-sans"
                    }`}
                  >
                    <div className="text-[10px] font-bold opacity-75 mb-1 uppercase tracking-wide">
                      {isUser ? "Your Practice Line" : "Tactics Coach"}
                    </div>
                    <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#f8f7f4] border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-500 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Tactics Coach is analyzing your technique...</span>
                </div>
              </div>
            )}
          </div>

          {/* Practice Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Try applying ${selectedTactic.name}...`}
              disabled={loading}
              className="flex-1 bg-white border border-gray-300 focus:border-[#1e3a8a] px-4 py-3 rounded-xl text-sm outline-none transition shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#f0d080]" />
              <span className="hidden sm:inline">Submit</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
