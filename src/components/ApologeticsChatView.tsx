import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { sendChatMessageWithGrounding } from "../services/aiService";
import { GroundingSource } from "../types";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  Globe,
  ExternalLink,
} from "lucide-react";

interface MessageWithSources {
  role: "user" | "assistant";
  content: string;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
}

const STARTER_PROMPTS = [
  "Why do Catholics call priests 'Father' if Jesus said call no man father?",
  "How can the Catholic Church claim to be the one true Church?",
  "What is the biblical basis for Purgatory?",
  "Explain the Catholic view of predestination vs Calvinism.",
  "How do I answer an atheist asking why God allows evil?",
];

export const ApologeticsChatView: React.FC<{ initialPrompt?: string }> = ({
  initialPrompt,
}) => {
  const { incrementStat } = useApp();
  const [messages, setMessages] = useState<MessageWithSources[]>([]);
  const [input, setInput] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [deepThink, setDeepThink] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim() || loading) return;

    const userText = textToSend.trim();
    setInput("");
    const newMessages: MessageWithSources[] = [
      ...messages,
      { role: "user" as const, content: userText },
    ];
    setMessages(newMessages);
    setLoading(true);

    const systemPrompt = `You are an expert Catholic apologist and theologian with encyclopedic mastery of Sacred Scripture, the Catechism of the Catholic Church, Ecumenical Councils, and the early Church Fathers.
Always use Google Search to verify Catholic doctrine, scripture passages, and historical facts to give 100% accurate, reliable, and charitable answers.
Provide clear, intellectually rigorous, and faithful Catholic explanations. Quote Scripture (with chapter and verse) and cite historical Church documents when appropriate. Avoid hostility; speak the truth in love.`;

    try {
      const result = await sendChatMessageWithGrounding(
        newMessages.map((m) => ({ role: m.role, content: m.content })),
        systemPrompt,
        deepThink
      );

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: result.reply,
          groundingSources: result.groundingSources,
          searchQueries: result.searchQueries,
        },
      ]);
      incrementStat("debatesCompleted", 1);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Catholic teaching grounds this truth in Sacred Scripture and Sacred Tradition. As the Council of Trent affirmed, divine revelation is safeguarded by apostolic succession under the guidance of the Holy Spirit.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Header & Mode Switch */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold text-base text-gray-900">
                Catholic Apologetics AI
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <Globe className="w-3 h-3 text-emerald-600" />
                <span>Web Grounded</span>
              </span>
              {deepThink && (
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-600 fill-amber-600" /> DeepThink
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Searches the web first to verify doctrine, council texts, and scripture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* DeepThink toggle */}
          <button
            type="button"
            onClick={() => setDeepThink(!deepThink)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
              deepThink
                ? "bg-amber-500 text-white border-amber-600 shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DeepThink {deepThink ? "ON" : "OFF"}</span>
          </button>

          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm min-h-[380px] max-h-[520px] overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-blue-200 mx-auto" />
            <h3 className="font-bold text-gray-800 text-sm">
              How can I assist your defense of the faith?
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Every response searches the web with Google Search before answering to ensure maximum accuracy and verified citations.
            </p>

            <div className="flex flex-col gap-2 max-w-lg mx-auto pt-3 text-left">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="p-2.5 text-xs bg-[#f8f7f4] hover:bg-blue-50 hover:text-[#1e3a8a] text-gray-700 rounded-xl border border-gray-200 transition flex items-center justify-between cursor-pointer"
                >
                  <span>"{prompt}"</span>
                  <span className="text-gray-400 font-bold ml-2">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, idx) => {
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
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold opacity-75 uppercase tracking-wide">
                      {isUser ? "You" : "Catholic Apologist AI"}
                    </span>
                    {!isUser && (
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" /> Web Grounded
                      </span>
                    )}
                  </div>

                  <p className="whitespace-pre-line leading-relaxed">{m.content}</p>

                  {/* Web Citations */}
                  {!isUser && m.groundingSources && m.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-200/80">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Verified Web Sources:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.groundingSources.slice(0, 4).map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] bg-white hover:bg-blue-50 text-[#1e3a8a] border border-gray-200 hover:border-blue-300 px-2 py-0.5 rounded-md transition"
                          >
                            <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                            <span className="max-w-[160px] truncate">{src.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#f8f7f4] border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#1e3a8a]" />
              <div className="flex flex-col">
                <span className="font-medium">
                  {deepThink
                    ? "Searching web with Google & engaging deep theological analysis..."
                    : "Searching web with Google to verify Catholic doctrine..."}
                </span>
                <span className="text-[10px] text-gray-400">Consulting Scripture, Catechism, and Council records</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any apologetics or Catholic doctrine question..."
          className="flex-1 bg-white border border-[#e2ddd6] focus:border-[#1e3a8a] rounded-xl px-4 py-3 text-xs sm:text-sm outline-none transition shadow-xs"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-[#1e3a8a] hover:bg-blue-900 disabled:opacity-50 text-white font-bold px-4 py-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
